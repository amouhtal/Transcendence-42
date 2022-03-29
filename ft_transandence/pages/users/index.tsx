import Users from '../../components/users/Users'
import React, { Component } from "react";
import usersData from '../../users-Data.json'
import styles from '../../styles/users/users.module.css'
const users = () => {
    return (
        <div className={styles.globalContainer}>
            <Users placeholder="Search..." usersData={usersData}/>
        </div>
    );
}

export default users;