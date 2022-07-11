import styles from '../../styles/messages/userInfo.module.css'
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import profileIcon from '../../public/images/profile.png'
import themeIcon from '../../public/images/seo.png'
import { FiSearch } from "react-icons/fi";
import block from '../../public/images/block.png'
import Link from 'next/link';
import back from '../../public/images/left.png'
import { useEffect, useState } from 'react';
import messages from '../../pages/messages';
import bruch from '../../public/images/brush.png'

const UserInfo = (props: any) => {
	const [search, setSearch] = useState<boolean>(false);
	const [theme, setTheme] = useState<boolean>(false);
	const handleChange = (e:any) => {
		const filterdData = props.allMessages.filter((element:any) => {
			return (element.message.includes(e.target?.value) ? element.message : null);
		})
		props.setMessages(filterdData);
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
				<Link href={`/users/${props.data?.userName}`}>
        	    <div className={styles.imgContainer}>
        	        <img src={props.data?.picture} alt="" className={styles.userInfoImg}/>
        	        <div className={props.status? styles.UserInfoZoneOnline : styles.UserInfoZoneOffline}></div>
        	    </div>
				</Link>
        	    <div className={styles.userInfoName}>
        	        <p>{props.data?.userName}</p>
        	    </div>
        	    <div className={styles.CostumizationContainer} onClick={(e:any)=> {setTheme(!theme)}}>
        	        {/* <div className={theme ? styles.showThemes : styles.ChangeTheme} >
						<div className={theme ? styles.showThemesColors : styles.none}>
							<p className={styles.blackColor} onClick={(e:any) => {props.color("black")}}></p>
							<p className={styles.pinkColor} onClick={(e:any) => {props.color("pink")}}></p>
							<p className={styles.greenColor} onClick={(e:any) => {props.color("green")}}></p>
							<p className={styles.blueColor} onClick={(e:any) => {props.color("blue")}}></p>
						</div> */}
        	            <img src={bruch.src} alt="" className={styles.blockImage}/>
        	            <p>Theme</p>
        	        {/* </div> */}
        	    </div>
        	    <div className={styles.SearchInMessages} onClick={(e:any) => {setSearch(!search)}}>
        	            <FiSearch className={styles.SearchIcon}/>
        	            <p>Search in conversation</p>
        	    </div>
        	    <div className={styles.BlockContainer}>
        	            <img src={block.src} alt="" className={styles.blockImage}/>
        	            <p>Block</p>
        	    </div>
			</div>
		</>
    );
}

export default UserInfo;