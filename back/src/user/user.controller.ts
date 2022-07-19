import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/dto-classes/user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import {
  isNotEmpty,
  IsNotEmpty,
  IsString,
  Length,
  NotContains,
} from "class-validator";
import { JwtAuthGuard } from "src/guards/jwt-auth.gguard";

export class ExampleDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @NotContains("/")
  userName: string;

  imageName: string;
}

export class User_profile {
  userName: User;
}

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  @Get("users")
  @UseGuards(JwtAuthGuard)
  findAllUsers(@Req() request1: Request) {
    return this.userService.findAll();
  }

  @Post("profile")
  @UseGuards(JwtAuthGuard)
  async userProfile(
    @Req() request1: Request,
    @Body() user_profile: User_profile
  ) {
    const jwt = request1.headers.authorization.replace("Bearer ", "");
    const tokenInfo: any = this.jwtService.decode(jwt);

    if (user_profile.userName != null || user_profile.userName != undefined)
      tokenInfo.userId = user_profile.userName;
    let user = await this.usersRepository
      .createQueryBuilder("Users")
      .select(["Users.userName", "Users.picture", "Users.isActive"])
      .where("Users.email = :email", { email: tokenInfo.userId })
      .orWhere("Users.userName = :userName", { userName: tokenInfo.userId })
      .getOne();

    if (user) {
      let winMatch = await this.usersRepository.query(
        `SELECT COUNT(winner_user) FROM public."Games" WHERE "winner_user"= '${user.userName}'`
      );

      let loserMatch = await this.usersRepository.query(
        `SELECT COUNT(loser_user) FROM public."Games" WHERE "loser_user"= '${user.userName}'`
      );

      let userInfo = {
        userName: user?.userName,
        picture: user?.picture,
        country: "Morocco",
        winMatch: winMatch[0].count as string,
        loserMatch: loserMatch[0].count as string,
        isActive: user?.isActive,
      };
      const gameHistory = await this.usersRepository.query(
        `select *  from public."Games" WHERE public."Games".winner_user = '${user.userName}' OR public."Games".loser_user = '${user.userName}'`
      );

      if (gameHistory[0] !== undefined) delete gameHistory[0].id;

      var result = [];
      for (const element of gameHistory) {
        const win_pic = await this.usersRepository.query(
          `select picture  from public."Users" WHERE public."Users"."userName" = '${element.winner_user}'`
        );
        const lose_pic = await this.usersRepository.query(
          `select picture  from public."Users" WHERE public."Users"."userName" = '${element.loser_user}'`
        );
        result.push({
          winner: {
            userName: element.winner_user,
            score: element.Score.split("-")[0],
            picture: win_pic[0]?.picture,
          },
          loser: {
            userName: element.loser_user,
            score: element.Score.split("-")[1],
            picture: lose_pic[0]?.picture,
          },
          played_at: gameHistory[0]?.played_at,
        });
      }
      const profileInfo = {
        userInfo: userInfo,
        gameHistory: result,
      };
      return profileInfo;
    }
    return {};
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  userUser(@Body() userData: UserDto) {
    this.userService.InsertUser(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Post("getPicture")
  @UseGuards(JwtAuthGuard)
  async getPicByuserName(@Req() request1: Request, @Body() body) {
    let user1 = await this.usersRepository.findOneBy({
      userName: body.userName1,
    });
    let user2 = await this.usersRepository.findOneBy({
      userName: body.userName2,
    });

    if (user1 && user2) {
      let usersPic = {
        user1: user1.picture,
        user2: user2.picture,
      };
      return usersPic;
    }
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get("CheckUserName")
  async getUsername(@Req() request1: Request) {
    let re: Boolean;
    const jwt = request1.headers.authorization.replace("Bearer ", "");

    let user: User = await this.userService.getUserJwt(jwt);

    if (user?.ifUserName) 
      return { exist: true };
    return { exist: false };
  }

}