// import { UserDto } from "src/dto-classes/user.dto";
import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto-classes/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';

config();
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private tokenRepository: Repository<RefreshToken>,
  ) {}

  private async retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
      if (typeof decoded === 'string') {
        return undefined;
      }
      let emaile: string = decoded.email;

      return Promise.resolve(
        await this.tokenRepository.findOneBy({ email: decoded.email }),
      );
    } catch (e) {
      return undefined;
    }
  }

  async newRefreshAndAccessToken(
    email: string,
    isSecondFacotrAuthenticated = false,
    values: { ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken();
    refreshObject.email = email;
    refreshObject.ipAddress = values.ipAddress;
    refreshObject.userAgent = 'testtest';
    this.tokenRepository.save(refreshObject);

    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: email,
          isSecondFacotrAuthenticated: isSecondFacotrAuthenticated,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '12d',
        },
      ),
    };
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return undefined;
    }
    const user = await this.usersRepository.findOneBy({
      email: refreshToken.email,
    });
    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.email,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '12d' });
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) return;

    await this.tokenRepository.query(
      `DELETE FROM public.refresh_token WHERE "email" = '${refreshToken.email}'`,
    );
  }

  async cheskUser(req) {
    let exist = await this.usersRepository.findOne({
      where: {
        email: req.user.email,
      },
    });

    if (exist && exist.isTwoFactorAuthenticationEnabled === true) return 1;
    else if (exist)
    {
      if (!exist.ifUserName)
      {
        // for picture
        return 3;
      }
      return 2;
    } 
    return 0;
  }

  async Login(req, res, values: { ipAddress: string }) {
    if (!req.user) return 'No user from intra';

    let userDto = new UserDto();
    userDto.email = req.user.email;
    userDto.firstName = req.user.firstName;
    userDto.lastName = req.user.lastName;
    userDto.picture = req.user.picture;
    userDto.isActive = true;
    let exist;
    if ((exist = await this.cheskUser(req)) == 0) {
      userDto.userName = req.user.email.split('@')[0];

      await this.usersRepository.save(userDto);
    }

    return {
      refAcc: await this.newRefreshAndAccessToken(userDto.email, false, values),
      UserEmail: userDto.email,
    };
  }
}
