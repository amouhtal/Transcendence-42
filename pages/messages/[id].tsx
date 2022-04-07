import styles from '../../styles/messages/messages.module.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Friends from '../../dataFriend.json'
import Router, { useRouter } from 'next/router';
import FriendsZone from '../../components/Messages/friendsZone';
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import UserInfo from '../../components/Messages/UserInfo';
// const socket = io("10.12.11.5:3000",{transports:['websocket']});
import ChatZone from '../../components/Messages/chatZone';
const Messages = () => {
    const [Status ,setStatus] = useState<boolean>(false);
    const router = useRouter();
    const [filterData] = Friends.filter((value: any) => {
        return (value.first_name === router.query.id);
    });
    const handleClick = (e:any) => {
            e.preventDefault();
            let data = { message: e.target.first.value, senderId: 1, reciver: 2 }
            const toSend: string = `message: ${e.target.first.value}, senderId: 1, reciverId: 2`;
            // socket.emit("message",e.target.first.value,1,2)
            e.target.first.value = "";
        }
    // socket.on("message", (data) => {
    //     console.log("data = " ,data);
    // })
    return (
        <div className={styles.globaleContainer}>
            <button className={styles.tmp} onClick={(e:any) => {e.preventDefault();setStatus(!Status)}}>Status</button>
            <div className={styles.container}>
                <ChatZone data={filterData} status={Status}/>
            </div>
        </div>
    );
}

export default Messages     ;