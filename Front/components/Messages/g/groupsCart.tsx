import styles from '../../../styles/messages/friends.module.css'
import Link from 'next/link'
import { useState } from 'react';
import axios from 'axios';
import networking from '../../../public/images/teamwork.png'

const FriendsCart = (props:any) => {
    const isInRoomMembers = (userName:string) => {
        let on: boolean = false;
        props.roomMembers?.map((e:any) => {
            if (e.userName === userName)
                on = true;
        })
        return on;
    }
    return (
        <>
        {
        props.data?.map((e: any) => {
            return  (
                <Link href={`/messages/g/${e.id}?name=${e.name}`} key={Math.random()}>
                    <div className={styles.userCard} onClick={(e:any) => {props.setShow(false)}} key={Math.random()}>
                        <div className={styles.imgFriendsContainer}>
                            <img src={networking.src} width={60} height={60} className={styles.profileImage}/>
                        </div>
                        <div className={styles.userName}>
                            <p>{e.name}</p>
                        </div>
                    </div>
                </Link>
            );
        })
    }
    {
    props.PrivateData?.map((e: any, index:number) => {
        if (isInRoomMembers(props.user?.userName))
        {
            return  (
                <Link href={`/messages/g/${e.id}?name=${e.name}`} key={index}>
                <div className={styles.userCard} onClick={(e:any) => {props.setShow(false)}} key={Math.random()}>
                    <div className={styles.imgFriendsContainer}>
                        <img src={networking.src} width={60} height={60} className={styles.profileImage}/>
                    </div>
                    <div className={styles.userName}>
                        <p>{e.name}</p>
                    </div>
                </div>
            </Link>
            );
        }
        })
    }
    </>
    );
}

export default FriendsCart;