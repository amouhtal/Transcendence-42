import styles from '../../styles/messages/messages.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatZone from '../../components/Messages/chatZone';
import axios from 'axios';
import { Loading, Grid } from "@nextui-org/react";

const Messages = (props:any) => {
    const [Status ,setStatus] = useState<boolean>(false);
    const router = useRouter();
    const [userInfo ,setUserInfo] = useState<any>();
    const [blockedUsers, setBlockedUsers] = useState<any>([]);
    const [isBlocked, setisBlocked] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const userNameFromUrl: string = typeof window != "undefined" ? window.location.href.split("/")[4] : "";
    
    useEffect(() => {
        const response: any = axios
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

        axios
          .get(
            `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/block`,
            {
              headers: {
                Authorization: `Bearer ${
                  localStorage.getItem("accessToken") as string
                }`,
              },
            }
          )
          .then((res) => {
            setBlockedUsers(res.data.users_T_blocked);
		    	  res.data.users_T_blocked.map((e:any) => {
				    if (e.userName === userNameFromUrl)
					    setisBlocked(true);
					})
					setIsLoading(false);
				})
				.catch(function (error){
					if (error.response){
						router.push({pathname :`/errorPage/${error.response.status}`})
					}
				});
				
      }, []);
    var test:boolean = true;

    useEffect(() => {

    }, [])
    return (
		<>
			<div className={styles.globaleContainer}>
		{
			isLoading ?
				<div className={styles.LoadingContainer}>
					<Grid><Loading type="gradient" /></Grid>
				</div>
				:
            	<div className={styles.bcontainer}>
                	<ChatZone status={Status} socket={props.socket} user={userInfo} blockedusers={blockedUsers} isBlocked={isBlocked}/>
            	</div>
		}
        	</div>
		</>
    );
}

export default Messages;
