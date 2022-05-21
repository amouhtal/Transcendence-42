import Blocked from '../../components/users/Blocked'
import React, { Component } from "react";
import FakeFriendsData from '../../dataFriend.json'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from '../../styles/users/users.module.css'
const blocked = (props:any) => {
    const [usersData, setUsersData] = useState<any>([]);
    const [usersDatas, setUsersDatas] = useState<any>([]);
    const [update, setUpdate] = useState<boolean>(false);
    useEffect(() => {
        axios.get('http://10.12.10.1:3000/friends/block', {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("accessToken") as string}`
            }
        }).then((res) =>{
            console.log("responsee = ", res.data);
            setUsersData(res.data);
            // console.log("usersData=",usersData)
        })
    },[update])
    return (
        <div>
            <Blocked placeholder="Search..."
            usersData={usersData}
            blocked={usersData}
            setUpdate={setUpdate}
            inBlock={true}
            update={update}/>
        </div>
    );
}

export default blocked;