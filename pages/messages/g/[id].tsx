import styles from '../../../styles/messages/messages.module.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Router, { useRouter } from 'next/router';
import FriendsZone from '../../../components/Messages/friendsZone';
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import UserInfo from '../../../components/Messages/UserInfo';
// const socket = io("10.12.11.5:3000",{transports:['websocket']});
import GroupChatZone from '../../../components/Messages/g/chatZone';
import FakeData from '../../../data.json'
import axios from 'axios';
const Messages = (props:any) => {
    const [Status ,setStatus] = useState<boolean>(false);
    const router = useRouter();
    const [userInfo ,setUserInfo] = useState<any>();
    const [roomOwner, setRoomOwner] = useState<string>("")
    const [update, setUpdate] = useState<boolean>(false);
    
    useEffect(() => {
        console.log("update =", update);
        const _roomId : number = typeof window != "undefined" ? +window.location.href.split("/")[5].substr(0, window.location.href.split("/")[5].indexOf("?")) : 0;
        axios.post("http://localhost:3001/chatRoom/getOwner", {roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
        .then ((res) => {
            setRoomOwner(res.data);
            console.log("RoomOwner =",res.data);
        })
    },[roomOwner])
    var test:boolean = true;

    const [filterData] = FakeData.filter((value: any) => {
        return (value.userName === router.query.id);
    });
    return (
        <div className={styles.globaleContainer}>
            <div className={styles.bcontainer}>
                <GroupChatZone data={filterData} status={Status} socket={props.socket} user={props.user} roomOwner={roomOwner} setRoomOwner={setRoomOwner}
                update={update} setUpdate={setUpdate}/>
            </div>
        </div>
    );
}



export default Messages;