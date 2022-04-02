import type { NextPage } from 'next'
import styles from '../../styles/login/login.module.css'
import {FcGoogle} from 'react-icons/fc'
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from "react";
import Server from 'next/dist/server/base-server';

const Login = () => {
    const router = useRouter();
    console.log(process.env.NEXT_PUBLIC_APP_UID)
    return (
        <div className={styles.login}>
                <div className={styles.intra}>
                    <p onClick={() => {router.push(`/auth/42/callback`)}}>Sign in with 42Intra</p>
                </div>
        </div>
    );
}

export default Login;