import styles from '../../styles/messages/friends.module.css'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../public/images/profile.jpg'


const FriendsCart = (props:any) => {
    return (
        <>
        {props.data.map((e: any | any[]) => {
            return  (
                <Link href={`/messages/${e.first_name}`} key={Math.random()}>
                    <div className={styles.userCard} onClick={(e:any) => {props.setShow(false)}} key={Math.random()}>
                        <div className={styles.imgFriendsContainer}>
                            <Image src={image.src} width={60} height={60} className={styles.profileImage}/>
                            <div className={props.status? styles.friendsStatusOnline : styles.friendsStatusOffline}></div>
                        </div>
                        <div className={styles.userName}>
                            <p>{e.first_name} {e.last_name}</p>
                        </div>
                        <div className={styles.status}>
                            <p>{props.status? "Online" : "Offline"}</p>
                        </div>
                    </div>
                </Link>
            );
        })}
        </>
    );
}

export default FriendsCart;