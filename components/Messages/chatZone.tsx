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
import FriendsZone from '../../components/Messages/friendsZone';
import back from '../../public/images/left.png'
import axios from 'axios';
import { Router, useRouter } from 'next/router';

// const socket = io("10.12.10.4:3300",{transports:['websocket']});
const ChatZone = (props:any) => {
    // console.log(props);
    const router = useRouter();
    const checkout:string = process.browser ? localStorage.getItem('color') as string : 'default';
    const [messageValue, setMessage] = useState<string>("Hello how are you?");
    const [messages, setMessages] = useState<any>([]); useEffect(() => {
        axios.post("http://10.12.10.4:3300/message/getConnversation",{userName: router.query.id},
        {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            // console.log("myRefdsfsp =",res);
            setMessages(res.data)
        })
    },[router.query.id])
    const [userInfo, setuserInfo] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(true);
    const [friends, setFriends] = useState<any>();
    const [color, setColor] = useState<string>(checkout);
    const [reciverId, setReciverId] = useState<any>();
    const [allMessages, setAllMessages] = useState<any>()
    let FriendsInformation: any = [];
    const [ContactInformation, setContatInformation] = useState<any>([]);
    // props.socket?.emit("message","","zakdim");
    useEffect (() => {
        if (messages !== [])
        {
            const userName = messages[0]?.senderId === props.user?.useName ? "" : messages[0]?.reciverId;
            // console.log(userName)
            axios.post("http://10.12.11.3:3000/users/profile",{userName: router.query.id},
            {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
            ).then((res) => {
                setReciverId(res.data?.userInfo);
                // console.log("myRefdsfsp =",res.data?.userInfo);
            })
        }
        
    },[messages])
    const [update, setUpdate] = useState<boolean>(false);
    useEffect(() => {
        axios.get("http://10.12.10.4:3300/message/getConntacts",
        {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            setFriends(res.data);
            console.log("Infoo =",res.data);
            for (let i = 0; i < friends?.length;i++)
            {
                axios.post("http://10.12.11.3:3000/users/profile",{userName: friends[i].userName},{headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
                .then((res) => {
                    FriendsInformation.push(res.data?.userInfo);
                })
            }
        })
        setContatInformation(FriendsInformation);
    }, [])
    const handelSubmit = (e:any) => {
        e.preventDefault();
        // console.log(e.target.message.value)
        if (e.target.message.value !== '')
        {
            e.target.message.value !== '' ? setMessage(e.target.message.value) : messageValue;
            props.socket?.emit("message",e.target.message.value,router.query?.id);
            e.target.message.value = '';
        }
    }
    if (process.browser)
        localStorage.setItem("color", color as string);
        props.socket?.on("message", (data:any) => { console.log("mel-hamr:data = " ,data);setMessages(data)})
        return (
        <>
        <FriendsZone data={ContactInformation} Info={friends} status={props.status} show={showFriends} setShow={setShowFriends} setUpdate={setUpdate} update={update} socket={props.socket}/>
        <div className={userInfo? styles.chatZone : styles.fullChatZone}>
            <div className={styles.chatHeader}>
            <img src={back.src} className={styles.showFriendsZone} onClick={(e:any) => {e.preventDefault(); setShowFriends(!showFriends)}}/>
                <div className={styles.imgHeaderContainer}>
                    <img src={reciverId?.picture} className={styles.img}/>
                    <div className={reciverId?.isActive ? styles.HeaderStatusOnline : styles.HeaderStatusOffline}></div>
                </div>
                <p className={styles.fullName}>{reciverId?.userName}</p>
                <p className={styles.status}>{reciverId?.isActive? "Online" : "Offline . Last seen 3h ago"}</p>
                <p className={styles.settings} onClick={(e:any) => {setuserInfo(!userInfo)}}><BsThreeDots className={styles.settingsIcon}/></p>
            </div>
            <div className={styles.chatMain}>
                {messages?.map((e:any) => {
                    e.time = e.time.replace('T', " ");e.time = e.time.replace ('Z', "");e.time = e.time.split('.')[0];
                    const userName = e.senderId === props.user?.userName ? e.reciverId : e.senderId;
                    return (
                        <div className={e.senderId === props.user?.userName ? styles.left : styles.right}>
                            <img src={e.senderId === props.user?.userName ? props.user?.picture : reciverId?.picture} className={e?.senderId === props.user?.userName ? styles.imgRight: styles.imgLeft} alt="" />
                        <div id="container" className={`${e.senderId === props.user?.userName ? styles.messageSenderContainer : styles.messageReciverContainer}
                        ${e.senderId === props.user?.userName ? color === 'black' ? styles.messageContainerBlack : 
                        color === 'pink' ? styles.messageContainerPink : color === 'blue' ? styles.messageContainerBlue : styles.none
                        : styles.gray}`}>
                            <p className={`${styles.messageChatMain}`}>{e.message}</p>
                            <p className={e.senderId === props.user?.userName ? styles.TimeRight : styles.TimeLeft}>{e.time}</p>
                        </div>
                    </div>
                    )})}
                    <div id="last"></div>
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