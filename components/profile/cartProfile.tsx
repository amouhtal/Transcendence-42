import style from "../../styles/profile/cartProfile.module.css"
import image from "../../public/images/profile.jpg"
import ajout from "../../public/images/ajouter.png"
import blocked from "../../public/images/blockUser.png"
import play from "../../public/images/tennis1.png"
import chatIcon from "../../public/images/chat1.png"

function CartProfile (){
    let isConected = false;
    return (
        <div className={style.cartPf}>
            <img className={style.img} src={image.src} />
            <div className={style.formationCart}>
                <div className={style.child1}>
                    <p className={isConected ? style.online : style.offline}> {isConected ? "Online" : "Offline"}</p>
                </div>
                <div className={style.child2}>
                    <p className={style.Ptext}>UserName:</p>
                    <p className={style.Ptext2}>Zakdim</p>
                </div>
                <div className={style.child3}>
                    <p className={style.Ptext}>Country:</p>
                    <p className={style.Ptext2}>Morroco</p>
                </div>
                <div className={style.child4}>
                    <div className={style.childwin}><p className={style.Ptext}>WinMatch: </p><p className={style.allWinLuse}>20</p></div>
                    <div className={style.childwin}><p className={style.Ptext}>LuserMatch: </p><p className={style.allWinLuse}>20</p></div>  
                </div>
            </div>
            <div className={style.addPlock}>
                <img src={ajout.src} className={style.ajoute}></img>
                <img src={blocked.src} className={style.block}></img>
                <img src={play.src} className={style.play}></img>
                <img src={chatIcon.src} className={style.play}></img>
            </div>
        </div>
    )
}

export default CartProfile