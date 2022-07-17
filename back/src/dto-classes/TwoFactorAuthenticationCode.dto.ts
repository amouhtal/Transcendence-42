import { IsAlpha, IsNotEmpty } from "class-validator";

export class TwoFactorAuthenticationCodeDto {

    twoFactorAuthenticationCode: string;
    Email : string
}