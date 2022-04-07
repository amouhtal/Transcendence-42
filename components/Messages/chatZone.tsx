import styles from '../../styles/messages/ChatZone.module.css'
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import {BsThreeDots} from "react-icons/bs";
import {GrSend} from "react-icons/gr";
import {MdUploadFile} from "react-icons/md";
import img from '../../public/images/send.png'
import clip from '../../public/images/paperclip.png'
import send from '../../public/images/send-message.png'
import { useState } from 'react';
import UserInfo from './UserInfo';
import Friends from '../../dataFriend.json'
import FriendsZone from '../../components/Messages/friendsZone';
import back from '../../public/images/left.png'
const ChatZone = (props:any) => {
    const [messageValue, setMessage] = useState<string>("Hello how are you?");
    const [userInfo, setuserInfo] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(true);
    const handelSubmit = (e:any) => {
        e.preventDefault();
        if (e.target.message.value !== '')
            setMessage(e.target.message.value);
        e.target.message.value = '';
    }
    return (
        <>
        <FriendsZone data={Friends} status={props.status} show={showFriends} setShow={setShowFriends}/>
        <div className={userInfo? styles.chatZone : styles.fullChatZone}>
            <div className={styles.chatHeader}>
            <img src={back.src}className={styles.showFriendsZone} onClick={(e:any) => {e.preventDefault(); setShowFriends(!showFriends)}}/>
                <div className={styles.imgHeaderContainer}>
                    <Image src={image.src} width={80} height={80} className={styles.img}/>
                    <div className={props.status? styles.HeaderStatusOnline : styles.HeaderStatusOffline}></div>
                </div>
                <p className={styles.fullName}>{props.data?.first_name} {props.data?.last_name}</p>
                <p className={styles.status}>{props.status? "Online" : "Offline . Last seen 3h ago"}</p>
                <p className={styles.settings} onClick={(e:any) => {setuserInfo(!userInfo)}}><BsThreeDots className={styles.settingsIcon}/></p>
            </div>
            <div className={styles.chatMain}>
                <div className={styles.messageContainer}>
                    <p className={styles.messageChatMain}>{messageValue}</p>
                        <div className={styles.messageStyle}></div>
                </div>
            </div>
            <div className={styles.messagesZone}>
                <form className={styles.formMessage} onSubmit={handelSubmit}>
                    <input type="text" name="" id="message" placeholder="Type a message here..." className={styles.message} />
                    <button type="submit" className={styles.btn} onSubmit={(e:any) => {e.preventDefault();e.target.value = ""}}><img src={send.src} className={styles.btnIcon}/></button>
                    <div className={styles.fileupload}>
                        <img src={clip.src} alt="" />
                        <input type="file" name="" id="" />
                    </div>
                </form>
             </div>
         </div>
         <UserInfo data={props.data} status={props.status} display={userInfo}/>
         {console.log(showFriends)}
        </>
    );
}

export default ChatZone;