import type { NextPage } from 'next'
import styles from '../../styles/login/login.module.css'
import {FcGoogle} from 'react-icons/fc'
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from "react";
import Server from 'next/dist/server/base-server';



const Login = () => {
    const router = useRouter();
    const url:string = "http://10.12.11.3:3000/auth/42"
    // fetchData(url);
    return (
        <div className={styles.login}>
                <div className={styles.intra}>
                    <p><a href='http://10.12.11.3:3000/auth/42'>Sign in with 42Intra</a></p>
                    {/* {console.log(router.pathname)} */}
                </div>
        </div>
    );
}

export default Login;