import styles from '../../styles/messages/userInfo.module.css'
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import profileIcon from '../../public/images/profile.png'
import themeIcon from '../../public/images/seo.png'
import { FiSearch } from "react-icons/fi";
import block from '../../public/images/block.png'
import Link from 'next/link';
import { useState } from 'react';
const UserInfo = (props: any) => {
	const [search, setSearch] = useState<boolean>(false);
    console.log(props.display);
    return (
		<>
        	<form action="" className={search ? (props.display ? styles.showSearch : styles.DontShowSearch ): styles.DontShowSearch} onSubmit={(e:any) => {e.preventDefault()}}>
        		<input type="search" name="" id="messageSearch" placeholder="Search..." className={styles.FindMessage}/>
        	</form>
        	<div className={(props.display? (search? styles.userInfoContainerBlure : styles.userInfoContainer) : styles.userInfoContainerNone)}>
				<div className={search? styles.searchBox : styles.non} onClick={(e:any) => {setSearch(!search)}}>
				</div>
        	    <div className={styles.imgContainer}>
        	        <img src={image.src} alt="" width={150} height={150} className={styles.userInfoImg}/>
        	        <div className={props.status? styles.UserInfoZoneOnline : styles.UserInfoZoneOffline}></div>
        	    </div>
        	    <div className={styles.userInfoName}>
        	        <p>{props.data?.first_name} {props.data?.last_name}</p>
        	    </div>
        	    <div className={styles.profileIconContainer}>
        	        <Link href={`/users/${props?.data?.first_name}`}>
        	            <img src={profileIcon.src} alt="" className={styles.profileIcon}/>
        	        </Link>
        	        <p>Profile</p>
        	    </div>
        	    <div className={styles.CostumizationContainer}>
        	        <div className={styles.ChangeTheme}>
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
        	    <div className={styles.BlockContainer}>
        	        <div className={styles.block}>
        	            <img src={block.src} alt="" className={styles.blockImage}/>
        	            <p>Block</p>
        	        </div>
        	    </div>
			</div>
		</>
    );
}

export default UserInfo;