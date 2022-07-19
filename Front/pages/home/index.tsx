import styles from "../../styles/home/home.module.css";
import CinFormation from "../../components/UserInfoPopup/UserInfoPopup";
import { useState } from "react";
import Watch from "../../components/LiveMatch/Watch";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Loading, Grid } from "@nextui-org/react";

const home = (props:any) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [userName, setUsername] = useState<boolean>(false);
  const [Popup ,setPopup] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && router.query.token) {
      if (router.query.token && router.query.refreshToken) {
        localStorage.setItem("accessToken", router.query.token as string);
        localStorage.setItem(
          "refreshToken",
          router.query.refreshToken as string
        );
        props.setIsConnected(!props.isConnected);
      }
      router.push("/home");
    }

        const resp: any = axios
        .get(
          `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/CheckUserName`,
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("accessToken") as string
              }`,
            },
          }
        )
        .then((res) => {
          setUsername(res.data.exist);
		  setIsLoading(false)
        })
        .catch(function (error){
          if (error.response){
              router.push({pathname :`/errorPage/${error.response.status}`})
          }
      });
  }, [router.query.token]);
  return (
    <>
    	{
		isLoading ?
        <div className={styles.LoadingContainer}>
            <Grid><Loading type="gradient" /></Grid>
        </div>
        :
		<>
      <div className={styles.globaleHomeContainer}>
        <Watch socket={props.socket}/>
      </div>
        <div className={!Popup ? styles.none : userName ? styles.none : update ? styles.none : styles.userInfoContainerBlure}></div>
        <div className={!Popup ? styles.none : userName ? styles.none : update ? styles.none : styles.userInfoContainer}>
          <CinFormation setUpdate={setUpdate} update={update} isUsername={setUsername} socket = {props.socket} setPopup={setPopup} Popup={Popup}/>
        </div>
		</>
        }
    </>
  );
};

export default home;
