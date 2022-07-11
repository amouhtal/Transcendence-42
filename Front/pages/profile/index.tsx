import Style from "../../styles/profile/Profile.module.css";
import CartProfile from "../../components/profile/cartProfile";
import MatchHestory from "../../components/profile/matchHestory";
import Achevment from "../../components/profile/Achevment";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type } from "os";
import UserInfoPopup from "../../components/UserInfoPopup/UserInfoPopup";
import CinFormation2  from "../../components/UserInfoPopup/UserInfoPopup2";
import { Loading, Grid } from "@nextui-org/react";


function Profile(props: any) {
  const [userInfo, setUserInfo] = useState<any>({});
  const [MatchHistory, setMatchHistory] = useState<any>([]);
  const router = useRouter();
  const [showContent, setShowContent] = useState<boolean>(false);
  const [Popup ,setPopup] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          setMatchHistory(res.data.gameHistory);
          setIsLoading(false);
        })
        .catch(function (error){
          if (error.response){
              router.push({pathname :`/errorPage/${error.response.status}`})
          }
      })
  }, []);
  return (
    <>
    {
      isLoading ?
      <div className={Style.LoadingContainer}>
          <Grid><Loading type="points" /></Grid>
      </div>
      :
      <div className={Style.container}>
        <div className={Style.header}>
          <CartProfile data={userInfo} Myprofile={true} setPopup={setPopup} Popup={Popup}/>
          <Achevment Myprofile={true} data={userInfo}/>
        </div>
        <MatchHestory userData={userInfo} gameHistory={MatchHistory} />
      </div>
      }
      {Popup && <CinFormation2 setPopup={setPopup} Popup={Popup} socket = {props.socket}/>}
    </>
  );
}

export default Profile;
