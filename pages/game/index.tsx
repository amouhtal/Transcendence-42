import CartPlayer from "../../components/game/cartPlayer";
import style from "../../styles/game/HomeGame.module.css";
import Game from "../../components/game";
import UserInfoPopup from '../../components/UserInfoPopup/UserInfoPopup'
import { useState } from "react";
import {useSelector} from "react-redux"
import leagend from '../../public/images/3amii9.png'


const HomeGame = () => {
    const [score, changeScore]=useState<any>({
        player1:0,
        player2:0
    })
    const test:any = useSelector<any>(state=>state);
  return (
      <>
        <div className={style.Container}>
            <img className={style.imgImoji} src={leagend.src}/>
            <div className={style.cartPlayer}>
                <CartPlayer score={score.player1}/>
            </div>
            <div className={style.Game}>
                {/* <Game changeScore={changeScore}/> */}
            </div>
            <div className={style.cartPlayer}>
                <CartPlayer  score={score.player2}/>
            </div>
        </div>

        {test.sizes_.zak_test && <UserInfoPopup />}
        
    </>
  );
};

export default HomeGame;

