import styles from '../../../styles/messages/ChatZone.module.css'
import {BsThreeDots} from "react-icons/bs";
import clip from '../../../public/images/paperclip.png'
import send from '../../../public/images/send-message.png'
import { useEffect, useRef, useState } from 'react';
import GroupsInfo from './GroupsInfo';
import GroupsZone from './GroupsZone';
import back from '../../../public/images/left.png'
import axios from 'axios';
import { useRouter } from 'next/router';
import networking from '../../../public/images/teamwork.png'
import authorizedIMG from '../../../public/images/banned-sign.png'

import { Loading, Grid } from "@nextui-org/react";


const GroupChatZone = (props:any) => {
    const router = useRouter();
    const dummy:any = useRef<any>();
    const checkout:string = process.browser ? localStorage.getItem('color') as string : 'default';
    const [messageValue, setMessage] = useState<string>("Hello how are you?");
    const [update, setUpdate] = useState<boolean>(true);
    const [AllMessages, setAllMessages] = useState<any>([])
    const [messages, setMessages] = useState<any>([]);
    const [groupMembers, setGroupMembers] = useState<any>([]);
    const [updateRoomMembers, setUpdateRoomMambets] = useState<boolean>(false);
    const [RoomOwnerUsername, setRoomOwnerUsername] = useState<string>("")
    const [bannedUserUpdate, setBannedUserUpdate] = useState<boolean>(false);
    const [bannedUsers, setBannedUsers] = useState<any>([]);
    const [timeLeftForBan, setTimeLeftForBan] = useState<any>({});
    const [thisRoomInfo, setThisRoomInfo] = useState<any>();
    const [showEnterPasswordForProtectedRoom, setshowEnterPasswordForProtectedRoom] = useState<boolean>(false);
    const [showWrongPassword, setshowWrongPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<any>(false);
    const [BannedUsersPermanantly, setBannedUsersPermanantly] = useState<any>([]);

	const _roomId : number = typeof window != "undefined" ? +window.location.href.split("/")[5].substr(0, window.location.href.split("/")[5].indexOf("?")) : 0;
    useEffect(() => {
        let unmout = false
        setIsLoading(false);
        axios.post("http://localhost:3001/roomMessage/getConnversation",{roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            if (!unmout){
            setMessages(res.data)
            setAllMessages(res.data);
            setIsLoading(true);
        }
        }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });
        return () => (unmout = true); // eslint-disable-next-line
    },[router.query.id]);
    useEffect(() => {
        let unmout = false
        axios.post("http://localhost:3001/chatRoom/getRoomMemebers",{roomId: _roomId},
        {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            if (!unmout){
                setGroupMembers(res.data);
                setIsLoading(true);
            }
        }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });
        return () => (unmout = true); // eslint-disable-next-line
    },[updateRoomMembers, refresh])

    useEffect(() => {
        let unmout = false

        axios.post("http://localhost:3001/roomBannedUsers/getMutedUserByRoomId",{roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
        .then((res) => {
            if (!unmout){
                setBannedUsers(res.data);
                res.data.map((e:any) => {
                    let newtest : any = new Date(res.data[0].unBanTime);
                    let difference: any = newtest.getMinutes() - +new Date().getMinutes();
                    let timeLeft  = {};
                    if (difference > 0) {
                        timeLeft = {
                            minutes: newtest.getMinutes() - +new Date().getMinutes(),
                            seconds: +new Date().getSeconds() - newtest.getSeconds()
                        }
                        setTimeLeftForBan(timeLeft);
                    }
                    if (newtest.getTime() - new Date().getTime() <= 0)
                        axios.post("http://localhost:3001/roomBannedUsers/unbanUser",{userName: e.bannedUserName, roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
            });
                }
            }).catch(function (error){
                if (error.response){
                    router.push({pathname :`/errorPage/${error.response.status}`})
                }
            });
            axios.post("http://localhost:3001/roomBannedUsers/getBannedUserByRoomId",{roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
            .then((res) => {
            if (!unmout){
                setBannedUsersPermanantly(res.data);
            }}).catch(function (error){
                if (error.response){
                    router.push({pathname :`/errorPage/${error.response.status}`})
                }
            });;
            return () => (unmout = true); // eslint-disable-next-line
    },[bannedUserUpdate])
    useEffect ( () => {
        let unmout = false

             axios.post("http://localhost:3001/roomBannedUsers/getMutedUserByRoomId",{roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
            .then((res) => {
            if (!unmout){
                setBannedUsers(res.data);
                res.data?.map(async (e:any) => {
                    if (e.bannedUserName === props.user?.userName)
                    {
                        let newtest : any = new Date(res.data[0].unBanTime);
                        let difference: any = newtest.getMinutes() - +new Date().getMinutes();
                        let timeLeft  = {};
                        if (difference > 0) {
                            timeLeft = {
                                minutes: newtest.getMinutes() - +new Date().getMinutes(),
                                seconds: +new Date().getSeconds() - newtest.getSeconds()
                            }
                            setTimeLeftForBan(timeLeft);
                        }
                    }
                })
            }}).catch(function (error){
                if (error.response){
                    router.push({pathname :`/errorPage/${error.response.status}`})
                }
            });
             axios.post("http://localhost:3001/roomBannedUsers/getBannedUserByRoomId",{roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
            .then((res) => {
            if (!unmout){
                setBannedUsersPermanantly(res.data);
            }}).catch(function (error){
                if (error.response){
                    router.push({pathname :`/errorPage/${error.response.status}`})
                }
            });
            return () => (unmout = true); // eslint-disable-next-line
    },[]);
    useEffect(() => {
        let unmout = false;
        axios.post("http://localhost:3001/chatRoom/getRoomById", {roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
        .then((res) => {
            if (!unmout){
            setThisRoomInfo(res.data);
            }
        }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });;
        return () => (unmout = true); // eslint-disable-next-line
    },[refresh])
    useEffect(() => {
    },[messages])
    const [userInfo, setuserInfo] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(false);
    const [color, setColor] = useState<string>(checkout);
    const [reciverId, setReciverId] = useState<any>();
    const getUsersInfo = async (_userName:string) => {
        await axios.post("http:///localhost:3001/users/profile",{userName: _userName},
            {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
            ).then((res) => {
                setReciverId(res.data?.userInfo);
            }).catch(function (error){
                if (error.response){
                    router.push({pathname :`/errorPage/${error.response.status}`})
                }
            });
        }
        const handelSubmit = (e:any) => {
            e.preventDefault();
            if (e.target.message.value !== '') {
                e.target.message.value !== '' ? setMessage(e.target.message.value) : messageValue;
                props.socket?.emit("roomMessage",{message: e.target.message.value,roomId: router.query?.id});
                e.target.message.value = '';
            }
        }
        if (process.browser)
        localStorage.setItem("color", color as string);
        
        props.socket?.on("messageRoom", (data:any) => {setMessages(data)});
        props.socket?.off("mutedUser").once("mutedUser", (res:any) => {
            setBannedUsers([res]);
        })
        props.socket?.off("unMuteUser").on("unMuteUser", (data: any) => {
            setBannedUsers(data)
        })
        props.socket?.off("getBannedUserByRoomId").on("getBannedUserByRoomId", (res:any) => {});
        props.socket?.off("Refresh").on("Refresh",(data:any) => {setRefresh(!refresh);})
    const getUserInfo = (e:any) => {
        let userInfo :any = props.usersData.filter((curr:any) => {
            return (e === curr.userName);
        });
        if (userInfo.length === 0)
            userInfo = props.blockedusers.filter((curr:any) => {
                return (e === curr.userName)
            })
        return userInfo
    }
    const inGroupMembers = (e:string) => {
        let on = false;
        if (groupMembers)
        groupMembers?.map((curr:any) => {
            if (curr.userName === e)
                on = true;
        })
        return on;
    }
    const isBanned = (e:string) => {
        let on = false;
        bannedUsers.map((curr:any) => {
            if (curr?.bannedUserName === e)
            {
                if (curr.roomId === _roomId)
                    on = true;
            }
        })
        return on;
    }
    const isBannedPermanantly = (e:string) => {
        let on = false;
        BannedUsersPermanantly.map((curr:any) => {
            if (curr?.bannedUserName === e)
            {
                if (curr.roomId === _roomId)
                    on = true;
            }
        })
        return on;
    }
    const CheckProtectedRoom = async (e:any) => {
        e.preventDefault();
        await axios.post("http://localhost:3001/chatRoom/checkPassword", {roomId: _roomId, password:e.target.RoomPassword.value}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
        .then((res) => {
            if (res.data && thisRoomInfo.protected)
            {
                props.socket?.emit("addUserToChannel",{users: [{userName: props.user?.userName}], roomId: _roomId});
                setUpdateRoomMambets(!updateRoomMembers);
                setshowEnterPasswordForProtectedRoom(false);
                e.target.RoomPassword.value = '';
                setshowWrongPassword(false);
            }
            else
                setshowWrongPassword(true);
        })

    }
    const isBlocked = (userName: string) => {
            let on = false;
            props.blockedusers.map((e:any) => {
                if (e.userName === userName)
                    on = true;
            })
            return on;
    }
        return (
        <>
        <GroupsZone status={props.status} roomMembers={groupMembers} show={showFriends} thisRoomInfo={thisRoomInfo} setShow={setShowFriends} socket={props.socket} setRoomOwnerUsername={setRoomOwnerUsername} user={props.user}/>
            <div className={thisRoomInfo !== null ? userInfo? styles.chatZone : styles.fullChatZone : styles.displaynone}>
                {
                    isLoading ?
                    <div className={styles.chatHeader}>
                        <img src={back.src} className={styles.showFriendsZone} onClick={(e:any) => {e.preventDefault(); setShowFriends(!showFriends)}}/>
                        <div className={styles.imgHeaderContainer}>
                            <img src={networking.src} className={styles.img}/>
                    </div>
                    <p className={styles.fullName}>{router.query.name}</p>
                    <p className={inGroupMembers(props.user?.userName) ? !isBanned(props.user?.userName) ? styles.settings : styles.displaynone : styles.displaynone} onClick={(e:any) => {setuserInfo(!userInfo)}}><BsThreeDots className={styles.settingsIcon}/></p>
                    <button className={inGroupMembers(props.user?.userName) ? styles.displaynone : styles.joinBtn} onClick={(e:any) => {
                        if (!thisRoomInfo.protected){
                            props.socket?.emit("addUserToChannel",{users: [{userName: props.user?.userName}], roomId: _roomId});
                            props.socket?.emit("Refresh", thisRoomInfo.members);
                            setUpdateRoomMambets(!updateRoomMembers);
                        }
                        else
                            setshowEnterPasswordForProtectedRoom(!showEnterPasswordForProtectedRoom);}}>Join {router.query.name}</button>
                    <form action="" className={showEnterPasswordForProtectedRoom ? styles.ChatRoomPass : styles.displaynone} onSubmit={CheckProtectedRoom}>
                        <input type="password" name="Password" id="RoomPassword" placeholder={"Password..."} className={styles.roomPassword} autoComplete={"true"} />
                        <input type="submit" value={"send"} name="apply" id="apply" className={styles.submitRoomPassword}/>
                    </form>
                    <p className={showEnterPasswordForProtectedRoom ? showWrongPassword ? styles.WrongRoomPassword : styles.displaynone : styles.displaynone}>Wrong Password !!</p>
                    </div>  
                :
                    <div className={styles.chatHeader}>
                        <div className={styles.LoadingContainer}>
                            <Grid><Loading type="gradient" /></Grid>
                        </div>
                    </div>
                }
                {
                    isLoading ?
                        <div className={inGroupMembers(props.user?.userName) && !isBannedPermanantly(props.user?.userName) ? styles.chatMain : styles.chatMainBlured}>
                                {messages?.map((e:any,index:number) => {
                                    e.time = e.time.replace('T', " ");e.time = e.time.replace ('Z', "");e.time = e.time.split('.')[0];
                                    const [userInfo] :any = getUserInfo(e.senderId);
                                    return (
                                        <div className={`${e.senderId === props.user?.userName ? styles.left : styles.right}`} id="lastMessage" key={index}>
                                            <img src={userInfo?.picture} className={`${e?.senderId === props.user?.userName ? styles.imgRight: styles.imgLeft}  ${isBlocked(e.senderId) ? styles.blured : styles.notBlured}`} alt="" />
                                            <div id="container" className={`${e.senderId === props.user?.userName ? styles.messageSenderContainer : styles.messageReciverContainer} ${e.senderId === props.user?.userName ? color === 'black' ? styles.messageContainerBlack : 
                                                color === 'pink' ? styles.messageContainerPink : color === 'blue' ? styles.messageContainerBlue : styles.none : styles.gray}`}>
                                                <p className={`${styles.messageChatMain} ${isBlocked(e.senderId) ? styles.blured : styles.notBlured}`}>{e.message}</p>
                                                <p className={e.senderId === props.user?.userName ? styles.TimeRight : styles.TimeLeft}>{e.time}</p>
                                                <p className={`${isBlocked(e.senderId) ? styles.showIsBlockedTXT : styles.displayNone}`}>Blocked</p>
                                            </div>
                                        </div>);
                                        })
                                }
                            <div ref={dummy}></div>
                        </div>
                    :
                    <div className={styles.chatMain}>
                        <div className={styles.LoadingContainer}>
                            <Grid><Loading type="gradient" /></Grid>
                        </div>
                    </div>
                }
                    <div className={styles.messagesZone}>
                    <form className={inGroupMembers(props.user?.userName) ? !isBanned(props.user?.userName) && !isBannedPermanantly(props.user?.userName) ? styles.formMessage : styles.displaynone : styles.displaynone} onSubmit={handelSubmit}>
                        <input type="text" name="" id="message" placeholder="Type a message here..." className={styles.message} />
                        <button type="submit" className={styles.btn} onSubmit={(e:any) => {e.preventDefault();e.target.value = ""}}><img src={send.src} className={styles.btnIcon}/></button>
                        <div className={styles.fileupload}>
                            <img src={clip.src} alt="" />
                            <input type="file" name="" id="" />
                        </div>
                    </form>
                    <img src={authorizedIMG.src} className={inGroupMembers(props.user?.userName) ? !isBanned(props.user?.userName) && !isBannedPermanantly(props.user?.userName) ? styles.displaynone : styles.NotAuthorizedimg : styles.NotAuthorizedimg} />
                    <p className={isBanned(props.user?.userName) ? styles.TimeLeftP : styles.displaynone} ><b>muted</b></p>
                    <p className={isBannedPermanantly(props.user?.userName) ? styles.TimeLeftP : styles.displaynone} ><b>Banned Permanently</b></p>
                </div>
         </div>
          <GroupsInfo data={reciverId} status={reciverId?.isActive} allMessages={AllMessages} setMessages={setMessages} messages={messages} display={userInfo} setDisplay={setuserInfo} color={setColor} update={update} setUpdate={setUpdate} socket={props.socket}
         setUpdateRoomMambets={setUpdateRoomMambets} updateRoomMembers={updateRoomMembers} user={props.user} roomOwner={props.roomOwner} setRoomOwner={props.setRoomOwner}
         setRoomOwnerUpdate={props.setUpdate} RoomOwnerupdate={props.update} roomMembers={groupMembers} setBannedUserUpdate={setBannedUserUpdate} bannedUserUpdate={bannedUserUpdate}
         administrators={props.administrators} thisRoomInfo={thisRoomInfo} />
        </>
    );
}

export default GroupChatZone;