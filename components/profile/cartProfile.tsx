import style from "../../styles/profile/cartProfile.module.css"
import image from "../../public/images/profile.jpg"
import ajout from "../../public/images/ajouter.png"
import blocked from "../../public/images/blockUser.png"
import play from "../../public/images/tennis1.png"
import chatIcon from "../../public/images/chat1.png"
import axios from 'axios'


function CartProfile (props:any){
    let isConected = false;
    return (
        <div className={style.cartPf}>
            <img className={style.img} src={props.userdata?.picture} />
            <div className={style.formationCart}>
                <div className={style.child1}>
                    <p className={isConected ? style.online : style.offline}> {isConected ? "Online" : "Offline"}</p>
                </div>
                <div className={style.child2}>
                    <p className={style.Ptext}>UserName:</p>
                    <p className={style.Ptext2}>{props.userdata?.userName}</p>
                </div>
                <div className={style.child3}>
                    <p className={style.Ptext}>Country:</p>
                    <p className={style.Ptext2}>{props.userdata?.country}</p>
                </div>
                <div className={style.child4}>
                    <div className={style.childwin}><p className={style.Ptext}>WinMatch: </p><p className={style.allWinLuse}>{props.userdata?.winMatch}</p></div>
                    <div className={style.childwin}><p className={style.Ptext}>LuserMatch: </p><p className={style.allWinLuse}>{props.userdata?.loserMatch}</p></div>  
                </div>
            </div>
            <div className={style.addPlock}>
                <img src={ajout.src} className={props.Myprofile ? style.none : style.ajoute}></img>
                <img src={blocked.src} className={props.Myprofile ? style.none :style.block} onClick={(e:any) => {
                    console.log("im here");
                    const data = {userName:`${props.userdata?.userName}`}
                    axios.post('http://10.12.11.3:3000/friends/block',data,{headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})}}></img>
                <img src={play.src} className={props.Myprofile ? style.none : style.play}></img>
                <img src={chatIcon.src} className={props.Myprofile ? style.none : style.play}></img>
            </div>
        </div>
    )
}

export default CartProfile