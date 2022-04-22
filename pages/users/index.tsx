import Users from '../../components/users/Users'
import React, { Component } from "react";
import usersData from '../../data.json'
import styles from '../../styles/users/users.module.css'
const users = () => {
    return (
        <div>
            <Users placeholder="Search..." usersData={usersData}/>
        </div>
    );
}

export default users;