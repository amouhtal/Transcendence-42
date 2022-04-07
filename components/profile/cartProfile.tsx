import style from "../../styles/profile/cartProfile.module.css"
import image from "../../public/images/profile.jpg"
import ajout from "../../public/images/ajouter.png"
import blocked from "../../public/images/blockUser.png"
import play from "../../public/images/tennis1.png"

function CartProfile (props: any){
    let isConected = false;
    return (
        <div className={style.cartPf}>
            <img className={style.img} src={image.src}></img>
            <div className={style.contentCart}>
                <div className={style.formationCart}>
                    <div className={style.child1}>
                        <p className={isConected ? style.online : style.offline}> {isConected ? "Online" : "Offline"}</p>
                    </div>
                    <div className={style.child2}>
                        <p className={style.Ptext}>UserName:</p>
                        <p className={style.Ptext2}>{props.userData?.first_name}</p>
                    </div>
                    <div className={style.child3}>
                        <p className={style.Ptext}>Country:</p>
                        <p className={style.Ptext2}>Morroco</p>
                    </div>
                    <div className={style.child4}>
                        <p className={style.Ptext}>WinMatch: <span className={style.allWinLuse}>20</span></p>
                        <p className={style.Ptext}>LuserMatch: <span className={style.allWinLuse}>20</span></p>
                    </div>
                </div>
                <div className={style.addPlock}>
                    <img src={ajout.src} className={style.ajoute}></img>
                    <img src={blocked.src} className={style.block}></img>
                    <img src={play.src} className={style.play}></img>
                </div>
            </div>
        </div>
    )
}

export default CartProfile