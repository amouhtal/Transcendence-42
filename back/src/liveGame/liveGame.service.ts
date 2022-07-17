import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LiveGameDto } from "src/dto-classes/liveGame.dto";
import { FriendLsit } from "src/entities/friendList.entity";
import { FriendShip } from "src/entities/friendShip.entity";
import { liveGame } from "src/entities/liveGame.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { Socket } from "socket.io";
import { UserService } from "src/user/user.service";

@Injectable()
export class liveGameService
{
    constructor(
		@InjectRepository(liveGame) private liveGameRepository: Repository<liveGame>,
        @InjectRepository(User) private userRepo: Repository<User>
	){}

    async saveGame(game : LiveGameDto)
    {
        this.liveGameRepository.save(game)
    }

    async getGame(player : string)
    {
        let liveGame : any = await this.liveGameRepository.query(`SELECT * FROM public."liveGame" WHERE player1 = '${player}' or player2 = '${player}'`)
        return liveGame
    }

   
    async getGameByPlayer(player : string)
    {
        let userName : any = await this.liveGameRepository.query(`SELECT  player1, player2 FROM public."liveGame" WHERE player1 = '${player}' or player2 = '${player}'`)
        var player2 : string
        if(Object.keys(userName).length !== 0)
        {
            player2 = userName[0].player1 === player ? userName[0].player2 : userName[0].player1
        }
        return player2
    }
    
    async deleteGame(player : string)
    {
        await this.liveGameRepository.query(`DELETE FROM public."liveGame" WHERE public."liveGame"."player1" = '${player}' or public."liveGame"."player2" = '${player}'` )
    }

     async getgames()
    {
        const games = await this.liveGameRepository.query('SELECT "player1", "player2", "time" FROM public."liveGame"');
        return games;
    }
    async getLiveGame(player : string)
    {

        if (player !== undefined)
        {
            let game : liveGame = await this.liveGameRepository.
            findOne(
                { where: [{ player1: player } , { player2: player }]},
                );
                if(game !== null)
                {
                    let player1 : User = await this.userRepo.findOneBy({userName : game.player1})
                    let player2 : User = await this.userRepo.findOneBy({userName : game.player2})
                    
                    return { playerpic1 : player1.picture , playerpic2 : player2.picture , player1 : player1.userName , player2 : player2.userName}
                }
                else
                return null
        }
    }
}