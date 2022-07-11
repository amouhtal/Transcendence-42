import styles from "../../styles/home/home.module.css";
import UserInfoPopup from "../../components/UserInfoPopup/UserInfoPopup";
import UserInfoPopup2 from "../../components/UserInfoPopup/UserInfoPopup2";
import SidePar from "../../components/sideBar";
import { useState } from "react";
import Watch from "../../components/LiveMatch/Watch";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";

const home = (props:any) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [userName, setUsername] = useState<boolean>(false);
  const router = useRouter();

    
  useEffect(() => {
    if (typeof window !== "undefined" && router.query.token) {
      if (router.query.token && router.query.refreshToken) {
        localStorage.setItem("accessToken", router.query.token as string);
        localStorage.setItem(
          "refreshToken",
          router.query.refreshToken as string
        );
      }
      router.push("/home");
    }
    if (
      localStorage.getItem("accessToken") !== "undefined" &&
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("accessToken") !== ""
    ) {
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
        })
        .catch(function (error){
          // console.log("im here");
          if (error.response){
              router.push({pathname :`/errorPage/${error.response.status}`})
          }
      });
    }
  }, [router.query.token]);
  return (
    <>
      <div className={styles.globaleHomeContainer}>
        <Watch socket={props.socket}/>
      </div>
        {/* <div className={userName ? styles.none : update ? styles.none : styles.userInfoContainerBlure}></div>
        <div className={userName ? styles.none : update ? styles.none : styles.userInfoContainer}>
        <UserInfoPopup setUpdate={setUpdate} update={update} isUsername={setUsername}/>
      </div> */}
    </>
  );
};

export default home;
