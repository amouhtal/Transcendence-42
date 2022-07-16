import Users from "../../components/users/Users";
import React, { Component } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/users/users.module.css";
import {useRouter} from 'next/router';
import { Loading, Grid } from "@nextui-org/react";

function users() {
  const router = useRouter()
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usersData, setUsersData] = useState<any>([]);
  const [update, setUpdateVar] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/block`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("im=",res.data)
		    setIsLoading(false);
        setUsersData(res.data.users_T_blocked);
      }).catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
  }, [update]);
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
			usersData={usersData}
			blocked={usersData}
			setUpdate={setUpdateVar}
			inBlock={true}
			update={update}
			/>
      }
    </>
  );
}

export default users;
