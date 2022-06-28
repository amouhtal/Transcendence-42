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
import networking from '../../../public/images/teamwork.png'
import authorizedIMG from '../../../public/images/banned-sign.png'
import { StyledProgress } from '@nextui-org/react';
import { defaultConfig } from 'next/dist/server/config-shared';
import { time } from 'console';
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
    const [bannedUserUpdate, setBannedUserUpdate] = useState<boolean>(false);
    const [bannedUsers, setBannedUsers] = useState<any>([]);
    const [timeLeftForBan, setTimeLeftForBan] = useState<any>({});

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
        setuserInfo(false);
    },[router.query.id, updateRoomMembers])
    useEffect (() => {
        console.log("realTime=",new Date())

        setInterval(() => {
            axios.post("http://localhost:3001/roomBannedUsers/getBannedUserByRoomId",{roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
            .then((res) => {
                console.log("bannedusers=",res.data);
                res.data.map((e:any) => {
                    let newtest : any = new Date(res.data[0].unBanTime);
                    console.log("date=",newtest.getTime(),"banTime=",new Date().getTime());

                    let difference: any = newtest.getMinutes() - +new Date().getMinutes();
                    let timeLeft  = {};
                    if (difference > 0) {
                        timeLeft = {
                            minutes: newtest.getMinutes() - +new Date().getMinutes(),
                            seconds: +new Date().getSeconds() - newtest.getSeconds()
                        }
                        setTimeLeftForBan(timeLeft);
                    }
                    console.log("difference=", difference, "   timeLeft=",timeLeft);
                    if (newtest.getTime() - new Date().getTime() <= 0)
                        axios.post("http://localhost:3001/roomBannedUsers/unbanUser",{userName: e.bannedUserName, roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
                    setBannedUsers(res.data);
                })
            })
        }, 60000);
    },[bannedUserUpdate])
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
    props.socket?.on("messageRoom", (data:any) => {setMessages(data)});
    const getUserInfo = (e:any) => {
        // console.log("element =", e)
        const userInfo :any = props.usersData.filter((curr:any) => {
            return (e === curr.userName);
        });
        return userInfo
    }
    const inGroupMembers = (e:string) => {
        let on = false;
        // console.log("roomOwner=",props.roomOwner)
        // console.log(props.usersData, e);
        groupMembers?.map((curr:any) => {
            if (curr.userName === e)
                on = true;
        })
        return on;
    }
    const isBanned = (e:string) => {
        let on = false;
        bannedUsers.map((curr:any) => {
            if (curr.bannedUserName === e)
                on = true;
        })
        return on;
    }
        return (
        <>
        <GroupsZone data={friends} status={props.status} show={showFriends} setShow={setShowFriends} socket={props.socket} setRoomOwnerUsername={setRoomOwnerUsername}/>
            <div className={userInfo? styles.chatZone : styles.fullChatZone}>
            <div className={styles.chatHeader}>
                <img src={back.src} className={styles.showFriendsZone} onClick={(e:any) => {e.preventDefault(); setShowFriends(!showFriends)}}/>
                <div className={styles.imgHeaderContainer}>
                    <img src={networking.src} className={styles.img}/>
                        <div className={reciverId?.isActive ? styles.HeaderStatusOnline : styles.HeaderStatusOffline}></div>
                </div>
                <p className={styles.fullName}>{router.query.name}</p>
                {/* <p className={styles.status}>{reciverId?.isActive? "Online" : "Offline . Last seen 3h ago"}</p> */}
                <p className={inGroupMembers(props.user?.userName) ? !isBanned(props.user?.userName) ? styles.settings : styles.displaynone : styles.displaynone} onClick={(e:any) => {setuserInfo(!userInfo)}}><BsThreeDots className={styles.settingsIcon}/></p>
                <button className={inGroupMembers(props.user?.userName) ? styles.displaynone : styles.joinBtn} onClick={(e:any) => {
						props.socket?.emit("addUserToChannel",{users: [{userName: props.user?.userName}], roomId: _roomId});
                        setUpdateRoomMambets(!updateRoomMembers);
                }}>Join {router.query.name}</button>
            </div>  
                <div className={inGroupMembers(props.user?.userName) ? styles.chatMain : styles.chatMainBlured}>
                    <div className={inGroupMembers(props.user?.userName) ?  styles.displaynone : styles.blackLayer}></div>
                {messages?.map((e:any) => {
                    e.time = e.time.replace('T', " ");e.time = e.time.replace ('Z', "");e.time = e.time.split('.')[0];
                    console.log("messages=",e)
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
                    <form className={inGroupMembers(props.user?.userName) ? !isBanned(props.user?.userName) ? styles.formMessage : styles.displaynone : styles.displaynone} onSubmit={handelSubmit}>
                        <input type="text" name="" id="message" placeholder="Type a message here..." className={styles.message} onChange={handleChange} />
                        <button type="submit" className={styles.btn} onSubmit={(e:any) => {e.preventDefault();e.target.value = ""}}><img src={send.src} className={styles.btnIcon}/></button>
                        <div className={styles.fileupload}>
                            <img src={clip.src} alt="" />
                            <input type="file" name="" id="" />
                        </div>
                    </form>
                    <img src={authorizedIMG.src} className={inGroupMembers(props.user?.userName) ? !isBanned(props.user?.userName)? styles.displaynone : styles.NotAuthorizedimg : styles.NotAuthorizedimg} />
                    <p className={isBanned(props.user?.userName) ? styles.TimeLeftP : styles.displaynone} >muted For <b>{timeLeftForBan.minutes} min</b></p>
                </div>
         </div>
         <GroupsInfo data={reciverId} status={reciverId?.isActive} allMessages={AllMessages} setMessages={setMessages} messages={messages} display={userInfo} setDisplay={setuserInfo} color={setColor} update={update} setUpdate={setUpdate} socket={props.socket}
         setUpdateRoomMambets={setUpdateRoomMambets} updateRoomMembers={updateRoomMembers} user={props.user} roomOwner={props.roomOwner} setRoomOwner={props.setRoomOwner}
         setRoomOwnerUpdate={props.setUpdate} RoomOwnerupdate={props.update} roomMembers={groupMembers} setBannedUserUpdate={setBannedUserUpdate} bannedUserUpdate={bannedUserUpdate}/>
        </>
    );
}

export default GroupChatZone;