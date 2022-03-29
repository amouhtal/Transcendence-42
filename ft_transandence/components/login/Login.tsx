import type { NextPage } from 'next'
import styles from '../../styles/login/login.module.css'
import {FcGoogle} from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { firebaseApp } from '../../firebase-config'
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from "react";

const Login = () => {
    // const firebaseAuth: firebaseApp | undefined = getAuth(firebaseApp);
    // const provider : GoogleAuthProvider = new GoogleAuthProvider();
    // const router: NextRouter = useRouter();
    // const signIn = async () => {
    //     const {user} = await signInWithPopup(firebaseAuth, provider);
    //     const {refreshToken, providerData} = user;

    //     localStorage.setItem('user', JSON.stringify(providerData));
    //     localStorage.setItem('accessToken', JSON.stringify(refreshToken));
    //     router.push("/home");
    // };
    return (
        <div className={styles.login}>
            <div className={styles.layer}></div>
                <div className={styles.google}>
                    <FcGoogle fontSize={30} />
                    <p>Sign in with Google</p>
                </div>
        </div>
    );
}


export default Login;