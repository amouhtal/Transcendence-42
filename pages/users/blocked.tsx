import Blocked from '../../components/users/Blocked'
import React, { Component } from "react";
import FakeFriendsData from '../../dataFriend.json'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from '../../styles/users/users.module.css'
const friends = () => {
    const [usersData, setUsersData] = useState<any>([]);
    useEffect(() => {
        axios.get('http://10.12.11.3:3000/friends/all', {
            headers:{
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmV0dGFjaEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTA4MjA5OTMsImV4cCI6MTY1MTg1Nzc5M30.2hjp2cBut1fSxh_mhNmnBIi7w2cj3teS8CW63AcuDYo`
            }
        }).then((res) =>{
            console.log("response = ", res.data);
            setUsersData(res.data);
            // console.log("usersData=",usersData)
        })
    },[])
    return (
        <div>
            <Blocked placeholder="Search..." usersData={usersData.user_blocked}/>
        </div>
    );
}

export default friends;