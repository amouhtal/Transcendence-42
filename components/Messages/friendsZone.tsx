import { FiSearch } from "react-icons/fi";
import { MdAddComment } from "react-icons/md"
import FriendsCart from './friendsCart';
import styles from '../../styles/messages/messages.module.css'
import img from '../../public/images/plus.png'
import { BsPlus } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import image from '../../public/images/profile.jpg'
import stylesfriends from '../../styles/messages/friends.module.css'
import axios from "axios";

const FriendsZone = (props:any) => {
    const [ContactInformation, setContatInformation] = useState<any>([]);
    let FriendsInformation: any = [];
    let addToObject =  (obj:any, key:any, value:any, index:any) => {
        // Create a temp object and index variable
        var temp:any = {};
        var i:any = 0;
    
        // Loop through the original object
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
    
                // If the indexes match, add the new item
                if (i === index && key && value) {
                    temp[key] = value;
                }
    
                // Add the current item in the loop to the temp obj
                temp[prop] = obj[prop];
    
                // Increase the count
                i++;
    
            }
        }
    
        // If no index, add to the end
        if (!index && key && value) {
            temp[key] = value;
        }
    
        return temp;
    
    };
    useEffect(() => {
            for (let i = 0; i < props.Info?.length;i++)
            {
                axios.post("http://10.12.11.3:3000/users/profile",{userName: props.Info[i].userName},{headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
                .then((res) => {
                    let lasMessage: any ="";
                    // props.socket?.on("message", (data:any) => { console.log("Messages Data = " ,data);lasMessage = data})
                    let newFriendsInformation = addToObject(res.data?.userInfo, 'LasMessage', 'last',0);
                    FriendsInformation.push(newFriendsInformation);
                })
            }
        console.log("Friends = ",FriendsInformation)
        setContatInformation(FriendsInformation);
        console.log("Friends = ",ContactInformation)
    },[props.Info])
    return (
        <div className={props.show ? styles.friendListshow : styles.friendListDontshow}>
            <div className={styles.searchBar}>
                <form action="">
                    <input type="search" name="" id="" className={styles.search} placeholder="Enter for search..."/>
                    <FiSearch className={styles.searchIcon}/>
                </form>
            </div>
            <div className={styles.creatNewGrp}>
                <p>Creat New Groupe</p>
                <img src={img.src} className={styles.creatIcon}/>
            </div>
            <div className={styles.friendscard}>
                <FriendsCart data={ContactInformation} status={props.status} setShow={props.setShow}/>
            </div>
        </div>
    );
}

export default FriendsZone;