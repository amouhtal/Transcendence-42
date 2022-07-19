import styles from '../../../styles/messages/messages.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GroupChatZone from '../../../components/Messages/g/chatZone';
import axios from 'axios';
import { Loading, Grid } from "@nextui-org/react";

const Messages = (props:any) => {
    const [Status ,setStatus] = useState<boolean>(false);
    const router = useRouter();
    const [userInfo ,setUserInfo] = useState<any>();
    const [roomOwner, setRoomOwner] = useState<string>("")
    const [update, setUpdate] = useState<boolean>(false);
    const [groupMembers, setGroupMembers] = useState<any>([]);
    const [usersData, setUsersData] = useState<any>([]);
    const [administrators, setAdministrators] = useState<any>([]);
    const [blockedUsers, setBlockedUsers] = useState<any>([]);
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);
    // const [refresh, setRefresh] = useState<boolean></boolean>÷
    const _roomId : number = typeof window != "undefined" ? +window.location.href.split("/")[5].substr(0, window.location.href.split("/")[5].indexOf("?")) : 0;
    useEffect(() => {
        axios.post("http://localhost:3001/chatRoom/getOwner", {roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
        .then ((res) => {
            setRoomOwner(res.data);
        })
        .catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });

    },[roomOwner, _roomId])
    useEffect(() => {
        axios.post("http://localhost:3001/chatRoom/getRoomAdministrators", {roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
        .then ((res) => {
            setAdministrators(res.data);
        })
        .catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });
    },[])
    useEffect(() => {
        axios.post("http://localhost:3001/chatRoom/getRoomMemebers",{roomId: _roomId},
        {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            setGroupMembers(res.data);
        }).catch(function (error){
          if (error.response){
              router.push({pathname :`/errorPage/${error.response.status}`})
          }
      });
        axios.get(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            setUsersData(res.data.all_users);
          })
          .catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });
    },[_roomId])
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
        axios.post("http://localhost:3001/chatRoom/getRoomById", {roomId: _roomId}, {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
        .then((res) => {
            if (res.data == "")
              router.push("/messages/g");
            else
              setIsloading(false);
        }).catch(function (error){
          if (error.response){
              router.push({pathname :`/errorPage/${error.response.status}`})
          }
      });;
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
      }).catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
    }, [refresh]);
    props.socket?.off("Refresh").on("Refresh", (data:any) => {setRefresh(!refresh)});
    const checkIfMemver = (e:string) => {
        let isGroupMember = false;
        groupMembers.map((curr:any) => {
            if (curr.userName === e)
            {
                isGroupMember = true;
            }
        })
        return isGroupMember;
    }
    return (
        <div className={styles.globaleContainer}>
                {
                  isLoading ?
                  <div className={styles.LoadingContainer}>
                    <Grid><Loading type="gradient" /></Grid>
                  </div>
                  :
                  <div className={styles.bcontainer}>
                    <GroupChatZone  status={Status} socket={props.socket} user={userInfo} roomOwner={roomOwner} administrators={administrators} setRoomOwner={setRoomOwner}
                    update={update} setUpdate={setUpdate} ShowJoin={false} usersData={usersData} blockedusers={blockedUsers} />
                </div>
                  }
        </div>
    );
}



export default Messages;