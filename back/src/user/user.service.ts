import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { info } from 'console';
import { UserDto } from 'src/dto-classes/user.dto';
// import { User } from "src/entities/user.entity";
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ExampleDto } from './user.controller';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async setTwoFactorAuthenticationSecret(secret: string, email: string) {
    let id: number = await this.usersRepository.query(
      `select id from public."Users" WHERE public."Users"."email" = '${email}'`,
    );
    return this.usersRepository.update(id, {
      twoFactorAuthenticationSecret: secret,
    });
  }

  async turnOnTwoFactorAuthentication(email: string) {
    let id;
    try {
      id = await this.usersRepository.findOneBy({ email: email });
    } catch (e) {
    }
    await this.usersRepository.update(id.id, {
      isTwoFactorAuthenticationEnabled: true,
    });
  }

  public async InsertUser(userDto: UserDto) {

    try {
      const userData = await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into('Users')
        .values(userDto)
        .onConflict('("id") DO NOTHING')
        .execute();
    } catch {
      return 'Message Receiver!';
    }
  }

  public async findAll() {
    return await this.usersRepository.query(`select * from Users`);
  }

  async findUser(oldUserName: string, newUserName: string, email): Promise<boolean> {
    const user = await this.usersRepository
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.userName = :name', { name: newUserName })
    .getOne();
      
      await this.updateUsername(newUserName,oldUserName);

      await this.usersRepository.query(`UPDATE public."Users" SET "userName"= '${newUserName}', "ifUserName"= 'true' WHERE  "userName"= '${oldUserName}'`)
      
        return true;

    
  }

  async updateActive(stats : Boolean,userName : string)
  {
      var get = await this.usersRepository.query(`UPDATE public."Users" SET "isActive"= '${stats}' WHERE  "userName"= '${userName}'`)
  }

  async findByemail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email: email });
  }

  public async getUserJwt(token: string) : Promise<User>{
    const tokenInfo: any = this.jwtService.decode(token);

    let user = await this.usersRepository.findOneBy({email : tokenInfo.userId});

    if (user) return user;
  }
  async findByUserName(userName: string): Promise<User> {
    return await this.usersRepository.findOneBy({ userName: userName });
  }


  public async updateUsername(newName: string, oldName: string)
  {
    await this.usersRepository.query(`UPDATE public."FriendBlocked" SET "Blocker"='${newName}' WHERE "Blocker"='${oldName}'`);
    await this.usersRepository.query(`UPDATE public."FriendBlocked" SET "Blocked"='${newName}' WHERE "Blocked"='${oldName}'`);

    await this.usersRepository.query(`UPDATE public."FriendLsit" SET "userName"='${newName}' WHERE "userName"='${oldName}'`);
    // invitations
    await this.usersRepository.query(`UPDATE public."FriendShip" SET "sender_id"='${newName}' WHERE "sender_id"='${oldName}'`);
    await this.usersRepository.query(`UPDATE public."FriendShip" SET "recipent_id"='${newName}' WHERE "recipent_id"='${oldName}'`);
    // games
    await this.usersRepository.query(`UPDATE public."Games" SET "winner_user"='${newName}' WHERE "winner_user"='${oldName}'`);
    await this.usersRepository.query(`UPDATE public."Games" SET "loser_user"='${newName}' WHERE "loser_user"='${oldName}'`);
    
  }
}