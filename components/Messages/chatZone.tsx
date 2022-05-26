import styles from '../../styles/messages/ChatZone.module.css'
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import {BsThreeDots} from "react-icons/bs";
import {GrSend} from "react-icons/gr";
import {MdUploadFile} from "react-icons/md";
import img from '../../public/images/send.png'
import clip from '../../public/images/paperclip.png'
import send from '../../public/images/send-message.png'
import { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import io from 'socket.io-client';
import Friends from '../../dataFriend.json'
import FriendsZone from '../../components/Messages/friendsZone';
import back from '../../public/images/left.png'
// const socket = io("10.12.10.4:3300",{transports:['websocket']});
const ChatZone = (props:any) => {
    console.log(props);
    const checkout:string = process.browser ? localStorage.getItem('color') as string : 'default';
    const [messageValue, setMessage] = useState<string>("Hello how are you?");
    const [messages, setMessages] = useState<any>([])
    const [userInfo, setuserInfo] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(true);
    const [color, setColor] = useState<string>(checkout);
    const [allMessages, setAllMessages] = useState<any>()
    const handelSubmit = (e:any) => {
        e.preventDefault();
        console.log(e.target.message.value)
        e.target.message.value !== '' ? setMessage(e.target.message.value) : messageValue;
        props.socket?.emit("message",e.target.message.value,"zakdim");
        e.target.message.value = '';
    }
    if (process.browser)
        localStorage.setItem("color", color as string);
    // console.log(color);
    props.socket?.on("message", (data:any) => { console.log("im here"); console.log("mel-hamr:data = " ,data);setMessages(data)})
    console.log("user = ",props.user)
    return (
        <>
        <FriendsZone data={Friends} status={props.status} show={showFriends} setShow={setShowFriends}/>
        <div className={userInfo? styles.chatZone : styles.fullChatZone}>
            <div className={styles.chatHeader}>
            <img src={back.src} className={styles.showFriendsZone} onClick={(e:any) => {e.preventDefault(); setShowFriends(!showFriends)}}/>
                <div className={styles.imgHeaderContainer}>
                    <img src={image.src} className={styles.img}/>
                    <div className={props.status? styles.HeaderStatusOnline : styles.HeaderStatusOffline}></div>
                </div>
                <p className={styles.fullName}>{props.data?.first_name} {props.data?.last_name}</p>
                <p className={styles.status}>{props.status? "Online" : "Offline . Last seen 3h ago"}</p>
                <p className={styles.settings} onClick={(e:any) => {setuserInfo(!userInfo)}}><BsThreeDots className={styles.settingsIcon}/></p>
            </div>
            <div className={styles.chatMain}>
                {messages?.map((e:any) => {
                {console.log("e == ",e.senderId)}
                let messageWith = e.message.length * 3;
                console.log(messageWith);
                    return (
                        <div id="container" className={`${styles.messageSenderContainer} ${e.senderId === props.user.userName ? styles.right : styles.left} ${color === 'black' ? styles.messageContainerBlack : 
                        color === 'pink' ? styles.messageContainerPink : color === 'blue' ? styles.messageContainerBlue : styles.none}`}>
                            <p className={`${styles.messageChatMain}`}>{e.message}</p>
                        </div>
                    )})}
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
         <UserInfo data={props.data} status={props.status} display={userInfo} color={setColor} setDisplay={setuserInfo}/>
        </>
    );
}
/*
    messages : {
        [
            {id:45, senderId:"", senderReciver:"", Time="",messages"}
        ]
    }
    Array(18)
0: {id: 13, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T13:53:49.027Z', message: 'test'}
1: {id: 14, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T15:52:56.724Z', message: 'hello'}
2: {id: 15, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T15:58:03.774Z', message: 'hello'}
3: {id: 16, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T16:00:30.349Z', message: 'test'}
4: {id: 17, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T16:05:30.835Z', message: 'lol'}
5: {id: 20, senderId: 'zakdim', reciverId: 'abettach', time: '2022-05-26T16:18:22.376Z', message: 'aeferfw4g545ef4w34t4q'}
6: {id: 21, senderId: 'zakdim', reciverId: 'abettach', time: '2022-05-26T16:18:30.341Z', message: 'hhhhhhh'}
7: {id: 22, senderId: 'zakdim', reciverId: 'abettach', time: '2022-05-26T16:18:51.064Z', message: 'dfvgbtry'}
8: {id: 24, senderId: 'zakdim', reciverId: 'abettach', time: '2022-05-26T16:19:24.142Z', message: 'sdgerthtyhythythyhthythtyhj'}
9: {id: 26, senderId: 'zakdim', reciverId: 'abettach', time: '2022-05-26T16:19:56.296Z', message: 'fuck uuuuuuuuuuuuuuuuuuuu'}
10: {id: 27, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T16:20:04.230Z', message: 'jsjsjs'}
11: {id: 28, senderId: 'zakdim', reciverId: 'abettach', time: '2022-05-26T16:20:12.030Z', message: 'fghnyjuyjry'}
12: {id: 34, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T16:43:35.411Z', message: 'tt'}
13: {id: 35, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T16:43:50.204Z', message: 'lol'}
14: {id: 36, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T16:45:50.509Z', message: 'pop'}
15: {id: 37, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T16:46:07.424Z', message: 'lol'}
16: {id: 38, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T16:47:28.667Z', message: 'dddddddddddddddddddddddddddddddddddddddddddddddddd…ddddddddddddddddddddddddddddddddddddddddddddddddd'}
17: {id: 39, senderId: 'abettach', reciverId: 'zakdim', time: '2022-05-26T17:57:47.272Z', message: 'jiji'}
*/
export default ChatZone;