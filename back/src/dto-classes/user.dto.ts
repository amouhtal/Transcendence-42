import { IsAlpha, isBoolean, IsEmail, IsNotEmpty, isString, Length, Max, Min } from "class-validator";
import { User } from "../entities/user.entity";

export class UserDto extends User{

    @IsAlpha()
    @IsNotEmpty()
    firstName: string;

    @IsAlpha()
    @IsNotEmpty()
    lastName: string;
    
    @Length(4, 10)
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    picture : string
    
    isActive: boolean;
  }
