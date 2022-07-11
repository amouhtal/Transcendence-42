import { Progress } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CartNotification from '../../components/notification/Cart';
import style from '../../styles/notification/notification.module.css'


const Notification = (props:any) => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<any>({});
    const [allnotification, setNotification] = useState([])
    const [alluser, setAlluser] = useState([])


    useEffect(() => {
            axios.get(
                `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
                }
            ).then((res) =>{
                setAlluser(res.data?.all_users);
            })
            .catch(function (error){
                if (error.response){
                    router.push({pathname :`/errorPage/${error.response.status}`})
                }
            })
    }, [])

    useEffect(() => {
        axios
          .post(
            `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`,
            null,
            {
              headers: {
                Authorization: `Bearer ${
                  localStorage.getItem("accessToken") as string
                }`,
              },
            }
          )
          .then((res) => {
            setUserInfo(res.data.userInfo);
        })
        .catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        })

    }, []);

    useEffect(() =>{
        axios.post(
            `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/notifications/getUserNotifications`,
            {userName :  userInfo?.userName},{
                headers: {
                    Authorization: `Bearer ${
                      localStorage.getItem("accessToken") as string
                    }`,
                }  
            }
        ).then((res) =>{
            setNotification(res.data);
            // console.log("response=", res.data)
        }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        })
    },[userInfo])
    const getSenderInformation = (userName:string) => {
        const filterData: any = alluser.filter((e:any) => {
            return (e.userName === userName);
        })
        return filterData;
    }
    return (
        <div className={style.Container}>
            <div className={style.Content}>
            {
                allnotification.map((Data, index) =>{
                    const [senderInformation]: any = getSenderInformation(Data.senderName);
                    return (
                        <>
                            <CartNotification socket={props.socket} MyP={false} key={index} data={Data} PicSender={senderInformation}/>
                        </>
                        )
                }
                )
            }
            </div>
        </div>
    )
}

export default Notification;