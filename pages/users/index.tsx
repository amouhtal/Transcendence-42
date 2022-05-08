import Users from '../../components/users/Users'
import React, { Component } from "react";
import FakeData from '../../data.json'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from '../../styles/users/users.module.css'
function users() {
    const [usersData, setUsersData] = useState<any>();
    let x:number = 0;
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get('http://10.12.4.2:3000/friends/all', {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmV0dGFjaEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTA4MjA5OTMsImV4cCI6MTY1MTg1Nzc5M30.2hjp2cBut1fSxh_mhNmnBIi7w2cj3teS8CW63AcuDYo`
            }
        }).then((res) => {
            // console.log("response = ", res.data);
            setUsersData(res.data);
        });
    },[]);
    return (
        <div>
            {x = 1}
            {/* {console.log("usersData=", usersData)} */}
            <Users placeholder="Search..." usersData={usersData?.all_users} usersSinvite={usersData?.user_sinvite} usersRinvite={usersData?.user_rinvite} friends={usersData?.user_friends}/>
        </div>
    );
}

export default users;