import { FiSearch } from "react-icons/fi";
import FriendsCart from './friendsCart';
import styles from '../../styles/messages/messages.module.css'
import React, {  useState } from "react";

const FriendsZone = (props:any) => {
    return (
        <div className={props.show ? styles.friendListshow : styles.friendListDontshow}>
            <div className={styles.searchBar}>
                <form action="">
                    <input type="search" name="" id="" className={styles.search} placeholder="Enter for search..."/>
                    <FiSearch className={styles.searchIcon}/>
                </form>
            </div>
            <div className={styles.friendscard}>
                <FriendsCart data={props.data} blockedusers={props.blockedusers} status={props.status} setShow={props.setShow}/>
            </div>
        </div>
    );
}

export default FriendsZone;