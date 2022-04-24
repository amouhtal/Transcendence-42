import styles from '../../styles/users/usersCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../public/images/profile.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'

const UsersCart = (props:any) => {
    const [friends, setFriends] = useState<any>([])
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
                        <div className={styles.imgContainer}>
                            <div className={props.status?styles.userStatusOn : styles.userStatusOff}></div>
                            <img src={e.picture} width={80} height={80} className={styles.profileImage}/>
                        </div>
                        <div className={styles.userName}>
                            <p>{e.userName}</p>
                        </div>
                    </div>
                </Link>
            );
        })}
        </>
    );
}

export default UsersCart;