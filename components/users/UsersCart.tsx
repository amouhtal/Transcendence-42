import styles from '../../styles/users/usersCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../public/images/profile.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import addUser from '../../public/images/usersImages/add-user.png'
import chatting from '../../public/images/usersImages/chatting.png'
import { useRouter } from 'next/router'
import profileIcon from '../../public/images/profile.jpg'

const UsersCart = (props:any) => {
    const [friends, setFriends] = useState<any>([])
    const router = useRouter();
    // useEffect(() => {
    //     axios.get('http://10.12.11.3:3000/friends/all',{
    //       headers:{
    //         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbW91aHRhbEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTA2Mzk0MjAsImV4cCI6MTY1MTY3NjIyMH0.BXv9s17uEzNUXsBekwm42fCNnIV1dTLDW63bM-DkKwQ`
    //       }
    //     }).then((res) =>{
    //       console.log(res.data);
    //       setFriends(res.data);
    //     })
    // },[])
    return (
        <>
        {props.data.map((e: any | any[]) => {
            return  (
                <Link href={`/users/${e.userName}`} key={Math.random()}>
                    <div className={styles.userCard} key={Math.random()}>
                        <div className={`${styles.imgContainer} ${props.status?styles.userStatusOn : styles.userStatusOff}`}>
                            {/* <div className={props.status?styles.userStatusOn : styles.userStatusOff}></div> */}
                            <Image src={profileIcon.src} width={80} height={80} className={`${styles.profileImage} ${props.status?styles.userStatusOn : styles.userStatusOff}`}/>
                        </div>
                        <div className={styles.userName}>
                            <p>{e.userName}</p>
                        </div>
                        <div className={styles.icons}>
                            <img src={addUser.src} alt="add" className={styles.addUserIcon} />
                            <Link href={`/messages/${e.userName}`}>
                                <img src={chatting.src} alt="chat" className={styles.chattingIcon}/>
                            </Link>
                        </div>
                    </div>
                </Link>
            );
        })}
        </>
    );
}

export default UsersCart;