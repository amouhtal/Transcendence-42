import { IsNotEmpty, IsString } from "class-validator";
import { FriendShip } from "src/entities/friendShip.entity";


export class FriendsInviteDto extends FriendShip {

    winner_user: string;
  
    loser_user: string;
  
    Score: string;
  
    played_at: Date;
  }