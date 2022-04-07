import styles from '../../styles/messages/userInfo.module.css'
import Image from 'next/image';
import image from '../../public/images/profile.jpg'


const UserInfo = (props: any) => {
    console.log(props.display);
    return (
        <div className={props.display? styles.userInfoContainer :styles.userInfoContainerNone}>
            <div className={styles.imgContainer}>
                <img src={image.src} alt="" width={150} height={150} className={styles.userInfoImg}/>
                <div className={props.status? styles.UserInfoZoneOnline : styles.UserInfoZoneOffline}></div>
            </div>
            <div className={styles.userInfoName}>
                <p>{props.data?.first_name} {props.data?.last_name}</p>
            </div>
    </div>
    );
}

export default UserInfo;