import style from "../../styles/notification/notification.module.css";
import style2 from '../../styles/notification/NotificationP.module.css'

import Link from "next/link";
import accept from '../../public/images/usersImages/accept.png'
import reject from '../../public/images/usersImages/reject.png'

const CartNotification = (props: any) => {
  return (
    <div className={props.MyP ? style2.CartContainer : style.CartContainer}>
      <Link href={`/users/${props.data?.senderName}`}>
        <div className={props.MyP ? style2.userInfo : style.userInfo}>
          <img src={props.PicSender?.picture} className={props.MyP ? style2.userimageOff : style.userimageOff}></img>
          <p className={props.MyP ? style2.userName: style.userName}>{props.data?.senderName}</p>
        </div>
      </Link>
      <span className={props.MyP ? style2.sparet : style.sparet}></span>
      <div className={props.MyP ? style2.textContent : style.textContent}>
        {props.data?.type == 'playe' ? <p> Invite You To Play a Game</p> : props.data?.type == 'message' ?
        <p> Send You New Message </p> :
        props.data?.type == 'joinGroub' ? <p> Add You to His Room</p> :  props.data?.type == 'invit' &&
        <p> Send you a Friend Request </p>}
      </div>
      {
        !props.MyP ? <div className={style.allButton}>
        { props.data?.type == 'playe' && <button className={style.btn} id={props.data?.senderName} onClick={(e) => props.socket.emit("acceptInvite",e.target.id)} >Accept</button>}
        { props.data?.type == 'playe' && <button className={style.btn} id={props.data?.senderName} onClick={(e) => props.socket.emit("declineInvite",e.target.id)} >Reject</button>}
        {(props.data?.type == 'message' || props.data?.type == 'invit') && <Link href={`/users/${props.data.senderName}`}><button className={style.btn}>View</button></Link>}
        </div>
        : <div className={style2.allButton}>
          {props.data?.type == 'playe' && <img src={accept.src} className={style2.icon} id={props.data?.senderName} onClick={(e) => props.socket.emit("acceptInvite",e.target.id)}></img>}
          {props.data?.type == 'playe' && <img src={reject.src} className={style2.icon} id={props.data?.senderName} onClick={(e) => props.socket.emit("declineInvite",e.target.id)}></img>}
          {props.data?.type == 'message' && <Link href={"/messages"}><button className={style2.btn}>View</button></Link>}
          {props.data?.type == 'invit' && <Link href={`/users/${props.data.senderName}`}><button className={style2.btn}>View</button></Link>}
         </div>
      }
    </div>
  );
};

export default CartNotification;