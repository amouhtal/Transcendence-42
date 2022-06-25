import styles from '../../../styles/messages/ChatZone.module.css'
import Image from 'next/image';
import image from '../../../public/images/profile.jpg'
import {BsThreeDots} from "react-icons/bs";
import {GrSend} from "react-icons/gr";
import {MdUploadFile} from "react-icons/md";
import img from '../../../public/images/send.png'
import clip from '../../../public/images/paperclip.png'
import send from '../../../public/images/send-message.png'
import { useEffect, useRef, useState } from 'react';
import GroupsInfo from './GroupsInfo';
import io from 'socket.io-client';
import GroupsZone from './GroupsZone';
import back from '../../../public/images/left.png'
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import typing from '../../../public/images/typing.gif'
import group from '../../../public/images/group.png'

const GroupChatZone = (props:any) => {
    const router = useRouter();
    const dummy:any = useRef<any>();
    const checkout:string = process.browser ? localStorage.getItem('color') as string : 'default';
    const [messageValue, setMessage] = useState<string>("Hello how are you?");
    const [update, setUpdate] = useState<boolean>(true);
    const [AllMessages, setAllMessages] = useState<any>([])
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [messages, setMessages] = useState<any>([]);
    const [groupMembers, setGroupMembers] = useState<any>([]);
    const [updateRoomMembers, setUpdateRoomMambets] = useState<boolean>(false);
    const [RoomOwnerUsername, setRoomOwnerUsername] = useState<string>("")


	const _roomId : number = typeof window != "undefined" ? +window.location.href.split("/")[5].substr(0, window.location.href.split("/")[5].indexOf("?")) : 0;
    // console.log("totot=",typeof window != "undefined" ? window.location.href.split("/")[5] : "")
    useEffect(() => {
        axios.post("http://localhost:3001/roomMessage/getConnversation",{roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            setMessages(res.data)
            setAllMessages(res.data);
            // console.log("messages=",res.data);
        })
        axios.post("http://localhost:3001/chatRoom/getRoomMemebers",{roomId: _roomId},
        {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            setGroupMembers(res.data);
            // console.log("RoomMembers=",res.data);
        })
        // dummy.current.scrollIntoView();
    },[router.query.id, updateRoomMembers])
    const [userInfo, setuserInfo] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(true);
    const [friends, setFriends] = useState<any>();
    const [color, setColor] = useState<string>(checkout);
    const [reciverId, setReciverId] = useState<any>();
    // useEffect (() => {
    //     // dummy.current.scrollIntoView();
    //     if (messages !== []){
    //         const userName = messages[0]?.senderId === props.user?.useName ? "" : messages[0]?.reciverId;
    //         axios.post("http:///localhost:3001/users/profile",{userName: window.location.href.split("/")[5] },
    //         {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
    //         ).then((res) => {
    //             setReciverId(res.data?.userInfo);
    //         })
    //     }
    //     // dummy.current.scrollIntoView({behavior: 'smooth'});
    // },[messages,isTyping])
    const getUsersInfo = (_userName:string) => {
        axios.post("http:///localhost:3001/users/profile",{userName: _userName},
            {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
            ).then((res) => {
                setReciverId(res.data?.userInfo);
            })
    }
    // useEffect(() => {
    //     axios.get("http://10.12.10.4:3300/message/getConntacts",
    //     {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
    //     ).then((res) => {
    //         setFriends(res.data);
    //     })
    // }, [])
    const handelSubmit = (e:any) => {
        e.preventDefault();
        if (e.target.message.value !== '') {
            e.target.message.value !== '' ? setMessage(e.target.message.value) : messageValue;
            // console.log("message:",e.target.message.value, "roomId:", typeof window != "undefined" ? window.location.href.split("/")[5] : null);
            props.socket?.emit("roomMessage",{message: e.target.message.value,roomId: router.query?.id});
            e.target.message.value = '';
        }
    }
    const handleChange = (e:any) => {
        e.preventDefault();
        // console.log(e.target.value)
        // props.socket?.emit("typing",reciverId.userName,e.target?.value);
        // props.socket?.on("typing", (data:any) => {console.log("Mydata =",data);data !== true ? setIsTyping(false) : setIsTyping(true)})
    }
    if (process.browser)
        localStorage.setItem("color", color as string);
    props.socket?.on("messageRoom", (data:any) => {setMessages(data);console.log("mel-hamrRoom:",data)});
    const getUserInfo = (e:any) => {
        // console.log("element =", e)
        const userInfo :any = groupMembers.filter((curr:any) => {
            return (e === curr.userName);
        });
        return userInfo
    }
        return (
        <>
        <GroupsZone data={friends} status={props.status} show={showFriends} setShow={setShowFriends} socket={props.socket} setRoomOwnerUsername={setRoomOwnerUsername}/>
        <div className={userInfo? styles.chatZone : styles.fullChatZone}>
            <div className={styles.chatHeader}>
            <img src={back.src} className={styles.showFriendsZone} onClick={(e:any) => {e.preventDefault(); setShowFriends(!showFriends)}}/>
                <div className={styles.imgHeaderContainer}>
                    <img src={props.user?.picture} className={styles.img}/>
                    <div className={reciverId?.isActive ? styles.HeaderStatusOnline : styles.HeaderStatusOffline}></div>
                </div>
                <p className={styles.fullName}>{router.query.name}</p>
                {/* <p className={styles.status}>{reciverId?.isActive? "Online" : "Offline . Last seen 3h ago"}</p> */}
                <p className={styles.settings} onClick={(e:any) => {setuserInfo(!userInfo)}}><BsThreeDots className={styles.settingsIcon}/></p>
            </div>
            <div className={styles.chatMain}>
                {messages?.map((e:any) => {
                    e.time = e.time.replace('T', " ");e.time = e.time.replace ('Z', "");e.time = e.time.split('.')[0];
                    const [userInfo] :any = getUserInfo(e.senderId);
                    // console.log("userInfo =", userInfo);
                    // getUsersInfo(e.senderId);
                    return (
                        <div className={e.senderId === props.user?.userName ? styles.left : styles.right} id="lastMessage">
                            <img src={userInfo?.picture} className={e?.senderId === props.user?.userName ? styles.imgRight: styles.imgLeft} alt="" />
                        <div id="container" className={`${e.senderId === props.user?.userName ? styles.messageSenderContainer : styles.messageReciverContainer}
                        ${e.senderId === props.user?.userName ? color === 'black' ? styles.messageContainerBlack : 
                        color === 'pink' ? styles.messageContainerPink : color === 'blue' ? styles.messageContainerBlue : styles.none
                        : styles.gray}`}>
                            <p className={`${styles.messageChatMain}`}>{e.message}</p>
                            <p className={e.senderId === props.user?.userName ? styles.TimeRight : styles.TimeLeft}>{e.time}</p>
                        </div>
                    </div>
                    )})}                    
                    {/* <img src={typing.src} alt="Typing..." className ={isTyping ? styles.isTyping: styles.displaynone}/> */}
                    <div ref={dummy}></div>
            </div>
            <div className={styles.messagesZone}>
                <form className={styles.formMessage} onSubmit={handelSubmit}>
                    <input type="text" name="" id="message" placeholder="Type a message here..." className={styles.message} onChange={handleChange} />
                    <button type="submit" className={styles.btn} onSubmit={(e:any) => {e.preventDefault();e.target.value = ""}}><img src={send.src} className={styles.btnIcon}/></button>
                    <div className={styles.fileupload}>
                        <img src={clip.src} alt="" />
                        <input type="file" name="" id="" />
                    </div>
                </form>
             </div>
         </div>
         <GroupsInfo data={reciverId} status={reciverId?.isActive} allMessages={AllMessages} setMessages={setMessages} messages={messages} display={userInfo} color={setColor} setDisplay={setuserInfo} update={update} setUpdate={setUpdate} socket={props.socket}
         setUpdateRoomMambets={setUpdateRoomMambets} updateRoomMembers={updateRoomMembers} user={props.user} roomOwner={props.roomOwner} setRoomOwner={props.setRoomOwner}
         setRoomOwnerUpdate={props.setUpdate} RoomOwnerupdate={props.update}/>
        </>
    );
}

export default GroupChatZone;