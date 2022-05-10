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
    const [update, setUpdateVar] = useState<boolean>(false);
    useEffect(() => {
        axios.get('http://10.12.11.3:3000/friends/all', {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmV0dGFjaEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTIwMTM0NDQsImV4cCI6MTY1MzA1MDI0NH0.hv6DAluhbY8MoWS7cbmtOLkdZxp4NDDHck9Kdn53P-o`
            }
        }).then((res) => {
            console.log("data = ", res.data);
                setUsersData(res.data);
        });
        console.log("im here");
    },[update]);
    return (
        <div>
            <Users placeholder="Search..."
            usersData={usersData?.all_users}
            usersSinvite={usersData?.user_sinvite}
            usersRinvite={usersData?.user_rinvite}
            friends={usersData?.user_friends}
            setUpdate={setUpdateVar}
            inBlock={false}
            update={update}/>
        </div>
    );
}

export default users;