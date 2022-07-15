import Users from "../../components/users/Users";
import React, { Component } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/users/users.module.css";
import {useRouter} from 'next/router';
import { Loading, Grid } from "@nextui-org/react";

function users(props:any) {
  const [usersData, setUsersData] = useState<any>();
  let x: number = 0;
  const router = useRouter()
  const [count, setCount] = useState(0);
  const [update, setUpdateVar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
	const [userInfo, setUserInfo] = useState<any>({});
//   console.log(process.env.NEXT_PUBLIC_IP_ADRESSE)
	useEffect(() => {
		axios.post(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`,null,
		  {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,},})
		.then((res) => {
		  setUserInfo(res.data.userInfo);
		})
		.catch(function (error){
		  if (error.response){
			  router.push({pathname :`/errorPage/${error.response.status}`})
		  }
	  })
	},[]);

  useEffect(() => {
    axios.get(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
		//   console.log("res=",res.data)
        setUsersData(res.data);
		setIsLoading(false);
      }).catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
  }, [update]);
//   console.log("props=",props);
	props.socket?.off("Refresh").on("Refresh", (data:any) => {console.log("heifhiewhfilhediv");setUpdateVar(!update)});
  return (
    <>
      {
		  isLoading ?
		  	<div className={styles.LoadingContainer}>
		  		<Grid><Loading type="points" /></Grid>
	 		</div>
			 :
			<Users
			placeholder="Search..."
			usersData={usersData?.all_users}
			usersSinvite={usersData?.user_sinvite}
			usersRinvite={usersData?.user_rinvite}
			friends={usersData?.user_friends}
			setUpdate={setUpdateVar}
			inBlock={false}
			update={update}
			user={userInfo}
			socket={props.socket}
			/>
      }
    </>
  );
}

export default users;
