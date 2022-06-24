import styles from '../../../styles/messages/userInfo.module.css'
import Image from 'next/image';
import image from '../../../public/images/profile.jpg'
import profileIcon from '../../../public/images/profile.png'
import themeIcon from '../../../public/images/seo.png'
import { FiSearch } from "react-icons/fi";
import block from '../../../public/images/block.png'
import Link from 'next/link';
import back from '../../../public/images/left.png'
import { useEffect, useState } from 'react';
import messages from '../../../pages/messages';
import addUsers from '../../../public/images/add-user.png'
import FakeData from '../../../data.json'
import UsersCart from './UsersgrpCart'
import { Socket } from 'socket.io-client';
import axios from 'axios';
import { Router, useRouter } from 'next/router';

const UserInfo = (props: any) => {
	const [search, setSearch] = useState<boolean>(false);
	const [theme, setTheme] = useState<boolean>(false);
    const [usersChoosen, setChoosenUsers] = useState<any>([]);
    const [update,setUpdate] = useState<boolean>(false);
	const [addUsersZone, setAddUserZone] = useState<boolean>(false);
	const [usersData, setUsersData] = useState<any>(FakeData);
	const router = useRouter();
	// const [display, setDisplay] = useState<boolean>();
	// useEffect(() => {
	// 	setDisplay(props.display);
	// })
	// dasdasdfds
	// let i = 0;
	useEffect(() => {
		axios
		  .get(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`, {
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		  })
		  .then((res) => {
			setUsersData(res.data.all_users);
			console.log("AllUsers=",res.data.all_users);
		  });
	  }, []);
	const handleChange = (e:any) => {
		const filterdData = props.allMessages.filter((element:any) => {
			return (element.message.includes(e.target?.value) ? element.message : null);
		})
		props.setMessages(filterdData);
	}
	const handelSearch = (e:any) => {
		e.preventDefault();
		const filtredData = FakeData.filter((crr:any) => {
			console.log("hello")
			return (crr.userName.includes(e.target.value))
		})
		console.log(filtredData)
		// setChoosenUsers(filtredData);
		setUsersData(filtredData);
	}
    return (
		<>
        	<form action="" className={search ? (props.display ? styles.showSearch : styles.DontShowSearch ): styles.DontShowSearch} onSubmit={(e:any) => {e.preventDefault()}}>
        		<input type="search" name="" id="messageSearch" placeholder="Search..." className={styles.FindMessage} onChange={handleChange}/>
        	</form>
        	<div className={(props.display? (search? styles.userInfoContainerBlure : styles.userInfoContainer) : styles.userInfoContainerNone)}>
			<img src={back.src} className={styles.showFriendsZone} onClick={(e:any) => {e.preventDefault(); props.setDisplay(!props.display)}}/>
				<div className={search? styles.searchBox : styles.non} onClick={(e:any) => {setSearch(!search)}}>
				</div>
        	    <div className={styles.imgContainer}>
        	        <img src={props.data?.picture} alt="" className={styles.userInfoImg}/>
        	        <div className={props.status? styles.UserInfoZoneOnline : styles.UserInfoZoneOffline}></div>
        	    </div>
        	    <div className={styles.userInfoName}>
        	        <p>{props.data?.userName}</p>
        	    </div>
        	    <div className={styles.CostumizationContainer}>
        	        <div className={theme ? styles.showThemes : styles.ChangeTheme} onClick={(e:any)=> {setTheme(!theme)}}>
						<div className={theme ? styles.showThemesColors : styles.none}>
							<p className={styles.blackColor} onClick={(e:any) => {props.color("black")}}></p>
							<p className={styles.pinkColor} onClick={(e:any) => {props.color("pink")}}></p>
							<p className={styles.greenColor} onClick={(e:any) => {props.color("green")}}></p>
							<p className={styles.blueColor} onClick={(e:any) => {props.color("blue")}}></p>
						</div>
        	            <img src={themeIcon.src} alt="" className={styles.themeIcon}/>
        	            <p>Theme</p>
        	        </div>
        	    </div>
        	    <div className={styles.SearchInMessages}>
        	        <div className={styles.search} onClick={(e:any) => {setSearch(!search)}}>
        	            <FiSearch className={styles.SearchIcon}/>
        	            <p>Search in conversation</p>
        	        </div>
        	    </div>
        	    <div className={styles.BlockContainer} onClick={(e:any) => {setAddUserZone(!addUsersZone)}}>
        	        <div className={styles.block}>
        	            <img src={addUsers.src} alt="" className={styles.blockImage}/>
        	            <p>Add users</p>
        	        </div>
        	    </div>
				<div className={addUsersZone ? styles.add_user_on : styles.add_user_off}>
					<button className={styles.add_btn} onClick={(e:any) => {
						setAddUserZone(!addUsersZone); setChoosenUsers([]);
						props.socket?.emit("addUserToChannel",{users: usersChoosen, roomId: router.query?.id})
						}}>add</button>
					<button className={styles.cancel_btn} onClick={(e:any) => {setAddUserZone(!addUsersZone); setChoosenUsers([])}}>cancel</button>
            	    	<input type="text" placeholder="Search..." className={styles.creatGroupsearch} onChange={handelSearch}/>
            	    	<div className={styles.usersAdd}>
            	        	{
            	            	usersChoosen.map((e:any) => {
            	                	return (
            	                    	<div className={styles.users}>
            	                	        <img src={e.picture} alt="" className={styles.addUsersimg}/>
            	            	        </div>
            	        	        )
            	    	        })
            	    	    }
            	    	</div>
            	    	<p className={styles.Suggested}>SUGGESTED</p>
            	    	<div className={styles.usersContainer}>
            	        	<UsersCart data={usersData} setChoosenUsers={setChoosenUsers} usersChoosen={usersChoosen} update={update} setUpdate={setUpdate}/>
            	    	</div>
            		</div>
            		{/* <div className={styles.friendscard}>
            	    	<GroupsCart data={props.data} status={props.status} setShow={props.setShow}/>
            		</div> */}
			</div>
		</>
    );
}

export default UserInfo;