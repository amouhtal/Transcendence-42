
import style from "../../styles/notification/notification.module.css";
import img from "../../public/images/profile.jpg";
const AlertNotification = (props:any) =>{
    return (
        <div className={style.AlertNotifcation}>
            <div className={style.AlertN}>
                <img src={img.src} className={style.imgAlert}/>
                <p className={style.UserNameAlert}>mel-hamr</p>
                <p className={style.textAlert}>Invitation Invitation Invitation
                Invitation</p>
            </div>
        </div>
    )
}

export default AlertNotification;