import CartPlayer from "../../components/game/cartPlayer";
import style from "../../styles/game/HomeGame.module.css";
import Game from "../../components/game";
import { useState } from "react";
const HomeGame = () => {
    const [score, changeScore]=useState<any>({
        player1:0,
        player2:0
    })
  return (
    <div className={style.Container}>
        <div className={style.cartPlayer}>
            <CartPlayer score={score.player1}/>
        </div>
        {/* <div className={style.Game}> */}
            <Game changeScore={changeScore}/>
        {/* </div> */}
        <div className={style.cartPlayer}>
            <CartPlayer  score={score.player2}/>
        </div>
    </div>
  );
};

export default HomeGame;
