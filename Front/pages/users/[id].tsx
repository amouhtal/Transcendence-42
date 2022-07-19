import Style from "../../styles/profile/Profile.module.css";
import { useRouter } from "next/router";
import CartProfile from "../../components/profile/cartProfile";
import Achevment from "../../components/profile/Achevment";
import MatchHestory from "../../components/profile/matchHestory";
import axios from "axios";
import { useEffect, useState } from "react";
import blocked from "../../public/images/banned-sign.png"
import ad from "../../public/images/ad.png"
function Profile(props:any) {
  const [userData, setUserData] = useState<any>([]);
  const [usersData, setUsersData] = useState<any>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [gameHistory, seetGameHistory] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>({});
  const [blockedUsers, setBlockedUsers] = useState<any>([]);
  const [blockInUsers, setBlockInUsers] = useState<any>([]);
  const [blockedUpdate, setBlockedUpdate] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
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
        setBlockInUsers(res.data.users_I_blocked);
      }).catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
  }, [blockedUpdate]);

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
  }, []);


  useEffect(() => {
    const data = { userName: router.query.id};
    axios
      .post(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,},})
      .then((res) => {
        setUserData(res.data);
        seetGameHistory(res.data.gameHistory);
      }).catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
    axios.get("http://localhost:3001/friends/all", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,},})
    .then((res) => {
      setUsersData(res.data);
    }).catch(function (error){
      if (error.response){
          router.push({pathname :`/errorPage/${error.response.status}`})
      }
  });
    // }
  }, [update, router.query.id, refresh]);
  let filtredData = usersData?.all_users?.filter((value: any) => {
    return value?.userName === router?.query?.id;
  })[0];
  const isBlocked = (userName: any) => {
    let isBlocked: boolean = false;
    blockedUsers?.map((e:any) => {
      if (e.userName === userName)
        isBlocked = true;
    })
    return isBlocked;
  }
  const isBlockedMe = (userName: any) => {
    let isBlocked: boolean = false;
    blockInUsers?.map((e:any) => {
      if (e.userName === userName)
        isBlocked = true;
    })
    return isBlocked;
  }
  props.socket?.off("Refresh").on("Refresh", (data:any) => {setRefresh(!refresh)})
  return (
    <>
      <div className={!isBlocked(router.query?.id) ? Style.container : Style.containerBlured}>
        <div className={!isBlocked(router.query?.id) ? Style.displaynone : Style.isBlocked}></div>
        <div className={isBlockedMe(router.query?.id) ? Style.isBlockedMe : Style.displaynone}>
			<img src={ad.src} alt="" />
			<p>You are not autorised to see this informtaions</p>
			{/* <button>Go back</button> */}
		</div>
    	<div className={!isBlockedMe(router.query?.id)? Style.container2 : Style.displaynone}>
    		<CartProfile
        	data={userData?.userInfo}
        	usersdata={usersData?.all_users}
        	status={false}
        	usersSinvite={usersData?.user_sinvite}
        	usersRinvite={usersData?.user_rinvite}
        	friends={usersData?.user_friends}
        	setUpdate={setUpdate}
        	update={update}
        	Myprofile={false}
        	socket={props.socket}
        	user={userInfo}
        	blocked={blockedUsers}
        	blockedUpdate={blockedUpdate}
        	setBlockedUpdate={setBlockedUpdate}/>
          	<Achevment data={userData?.userInfo} socket={props.socket}/>
          </div>
          <div className={!isBlockedMe(router.query?.id) ? Style.matchH : Style.displaynone}>
          	<MatchHestory gameHistory={gameHistory} friends={false} />
          </div>
          </div>
          <div className={isBlocked(router.query?.id) ? Style.BlockedUserProfile : Style.displaynone}>
        	<img src={blocked.src} alt="" className={Style.blockedImg} />
            <div className={Style.textContainer}>
              <p className={Style.blockedUser}>You've blocked this user</p>
              <p className={Style.blockedUser2}>You won't see any information from this user on Disques of discussions, notifications, and more.</p>
            </div>
            <button className={Style.blockedBtn} onClick={(e:any) => {router.push("/users/blocked")}} >Manage blocked users</button>
          </div>
          </>
    );
}
        
export default Profile;
        