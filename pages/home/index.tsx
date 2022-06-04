import styles from '../../styles/home/home.module.css'
import UserInfoPopup from '../../components/UserInfoPopup/UserInfoPopup'
import UserInfoPopup2 from '../../components/UserInfoPopup/UserInfoPopup2'
import SidePar from '../../components/sideBar'
import { useState } from 'react'
import Watch from '../../components/livematch'
import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import axios from "axios"
import {useSelector} from 'react-redux'

const home = () => {
    const [update, setUpdate] = useState<boolean>(false);
    const [userName, setUsername] = useState<boolean>(false);
    const route = useRouter();
    const test:any = useSelector<any>(state=>state);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (route.query.token && route.query.refreshToken)
            {
                localStorage.setItem("accessToken",route.query.token as string);
                localStorage.setItem("refreshToken",route.query.refreshToken as string);
            }
            // route.push("/home");
        }
        if (localStorage.getItem("accessToken") !== "undefined" && localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== '')
        {
                const resp :any = axios.get('http://10.12.10.2:3000/users/CheckUserName',{
                    headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken") as string}`}
                }
                ) .then((res) => {
                    setUsername(res.data.exist);
                }).catch((error:any) =>
                {
                    console.log("err =",error.response.status)
                    if (error.response.status === 401 && localStorage.getItem("accessToken") !== '' && localStorage.getItem("accessToken") !== "undefined" && localStorage.getItem("accessToken") !== null)
                    {
                        console.log("hererere=",localStorage.getItem("refreshToken") as string);
                        axios.get('http://10.12.10.2:3000/auth/42/refresh',{
                        data:{
                            "refreshToken":localStorage.getItem("refreshToken")
                        }
                        }).then((res:any) => {
                                console.log("resp =", res)
                        })
                    }
                })
        }
    },[route.query.token])
    return (
        <>
            <div className={styles.globaleHomeContainer}>
                < Watch/>
            </div>
            {/* <div className={userName ? styles.none : update ? styles.none : styles.userInfoContainerBlure}></div> */}
            {/* <div className={userName ? styles.none : update ? styles.none : styles.userInfoContainer}> */}
            {/* <UserInfoPopup setUpdate={setUpdate} update={update} isUsername={setUsername}/> */}
            {/* </div> */}
            {test.sizes_.zak_test && <UserInfoPopup2/>}
        </>
    );
}

export default home;