import styles from '../../../styles/users/usersCard.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ban from '../../../public/images/ban.png'
import kick from '../../../public/images/kick.png'
const UsersCart = (props:any) => {
    const [myData, setData] = useState<any>(props.data);
    const [showBanPannel, setShowBanPannel] = useState<boolean>(false);
    const [userBanned, setUserBanned] = useState<string>("");
    const [BanChoice, setBanChoice] = useState<boolean>(false);
    const [MuteChoice, setMuteChoice] = useState<boolean>(false);
    const [BanMuteTime, setBanMuteTime] = useState<string>("");
	const _roomId : number = typeof window != "undefined" ? window.location.href.indexOf("?") !== -1 ? +window.location.href.split("/")[5]?.substr(0, window.location.href.split("/")[5]?.indexOf("?")) : 0 : 0;
    const router = useRouter();
    useEffect(() => {
        setData(props.data)
    })
    let friends:any= [];
    const CheckIfUserExist =  (e:any):any => {
        let isExist:boolean = false;
        props.usersChoosen.map((el:any) => {
            if (el.userName === e)
                isExist = true;
        })
        return isExist;
    }
    const handelClick = (e:any) => {
        const isHere: boolean = CheckIfUserExist(e.target.id.split('%')[0]);
        if (isHere === false)
        {
            friends = props.usersChoosen;
            friends.push({userName:e.target.id.split('%')[0],picture:e.target.id.split('%')[1]});
            props.setChoosenUsers(friends);
            props.setUpdate(!props.update);
        }
        else
        {
            friends = [];
            friends = props.usersChoosen.filter((el:any) => {
                return (el.userName !== e.target.id.split("%")[0])
            })
            props.setChoosenUsers(friends);
            props.setUpdate(!props.update)
        }
        if (props.changeRoomOwner)
            props.setChoosenUsers([props.usersChoosen[props.usersChoosen.length - 1]]);
    }
    const isAdministrator = (userName: string) => {
        let isAdmin: boolean = false;
        props.administrators?.map((e:any) => {
                if (e.userName === userName)
                    isAdmin = true;
        })
        return isAdmin;
    }
    if (typeof props.data !== "object")
        router.push("/messages/g")
    return (
        <>
        {typeof props.data === "object" && props.data?.map((e: any, index:number) => {
                return  (
                    <div className={styles.userCard} id={`${e.userName}%${e.picture}`} key={index} onClick={(e:any) => handelClick(e)}>
                        <div className={`${styles.imgContainer}`}>
                            <Link href={`/users/${e.userName}`} >
                                <img src={e?.picture} width={80} height={80} className={`${styles.profileImage} ${e.isActive ? styles.userStatusOn : styles.userStatusOff}`}/>
                            </Link>
                        </div>
                        <div className={styles.userName}>
                            <p>{e.userName}</p>
                        </div>
                        <div className={props.roomOwner === e.userName ? styles.admin : styles.none}>
                            <p>Owner</p>
                        </div>
                        <div id={e.userName} className={isAdministrator(e.userName) ? props.roomOwner !== e.userName ? styles.admin : styles.none : styles.none}>
                            <p>Admin</p>
                        </div>


                        <div className={props.showBanBtn ? props.user.userName !== props.roomOwner && !isAdministrator(props.user.userName) ? styles.none : props.user.userName === props.roomOwner && e.userName !== props.roomOwner ? styles.ban : isAdministrator(props.user.userName) ? e.userName === props.roomOwner || isAdministrator(e.userName) ? styles.none : styles.ban : styles.none : styles.none} id={e.userName}
                        onClick={(e:any) => {}}>
                            <img src={ban.src} alt="ban" id={e.userName} onClick={(curr:any) => {setShowBanPannel(!showBanPannel);setUserBanned(curr.target.id); setMuteChoice(true)}}/>
                        </div>
                        <div className={props.showBanBtn ? props.user.userName !== props.roomOwner && !isAdministrator(props.user.userName) ? styles.none : props.user.userName === props.roomOwner && e.userName !== props.roomOwner ? styles.kick : isAdministrator(props.user.userName) ? e.userName === props.roomOwner || isAdministrator(e.userName) ? styles.none : styles.kick : styles.none : styles.none} id={e.userName}
                        onClick={(e:any) => {}}>
                            <img src={kick.src} alt="kick" id={e.userName} onClick={(e:any) => {
                                props.socket.emit("kickUser", {roomId: _roomId, userName: e.target.id});
                                props.socket.emit("Refresh", props.thisRoomInfo.members);
                                props.setUpdateRoomMambets(!props.updateRoomMembers)}}/>
                        </div>
                        <div className={showBanPannel && userBanned === e.userName ? styles.BanPopup : styles.none}>
                            <p className={`${styles.BanZone} ${!MuteChoice && BanChoice ? styles.chose: styles.none}`} onClick={(e:any) => {setBanChoice(true);setMuteChoice(false)}}>Ban</p>
                            <p className={`${styles.MuteZone}  ${MuteChoice && !BanChoice ? styles.chose : styles.none}`} onClick={(e:any) => {setBanChoice(false);setMuteChoice(true)}}>Mute</p>
                            <div className={MuteChoice ? styles.Time : styles.none}>
                                <p className={`${BanMuteTime === "1" ? styles.CheckClaas : styles.lol}`} onClick={(e:any) => {setBanMuteTime("1")}}>1min</p>
                                <p className={`${BanMuteTime === "5" ? styles.CheckClaas : styles.lol}`} onClick={(e:any) => {setBanMuteTime("5")}}>5min</p>
                                <p className={`${BanMuteTime === "15" ? styles.CheckClaas : styles.lol}`} onClick={(e:any) => {setBanMuteTime("15")}}>15min</p>
                                <p className={`${BanMuteTime === "60" ? styles.CheckClaas : styles.lol}`} onClick={(e:any) => {setBanMuteTime("60")}}>60min</p>
                            </div>
                            <div className={BanChoice ? styles.permanently : styles.none}>
                                <p>The Ban is Permenantly</p>
                            </div>
                            <button className={styles.cancel_btn} onClick={(e:any) => {setBanChoice(false); setMuteChoice(true);setBanMuteTime(""); setShowBanPannel(!showBanPannel)}}>cancel</button>
                            <button id={e.userName} className={styles.apply_btn} onClick={(e:any) => {
                                if (MuteChoice && !BanChoice)
                                    props.socket?.emit("muteUser", {userName:e.target.id, roomId:_roomId, periode: +BanMuteTime});
                                else if (!MuteChoice && BanChoice)
                                    props.socket?.emit("banUser", {userName:e.target.id, roomId:_roomId, periode: +BanMuteTime});
						        props.setBannedUserUpdate(!props.bannedUserUpdate);
                            }}>apply</button>
                        </div>
                    </div>
            );
        })}
        </>
    );
}

export default UsersCart;