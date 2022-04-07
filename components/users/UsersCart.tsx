import styles from '../../styles/users/users.module.css'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../public/images/profile.jpg'


const UsersCart = (props:any) => {
    return (
        <>
        {props.data.map((e: any | any[]) => {
            return  (
                <Link href={`/users/${e.first_name}`} key={Math.random()}>
                    <div className={styles.userCard} key={Math.random()}>
                        <div className={props.status?styles.userStatusOn : styles.userStatusOff}>
                            <Image src={image.src} width={90} height={90} className={styles.profileImage}/>
                            {/* <img src={image.src} alt="img" className={styles.profileImage} /> */}
                        </div>
                        <div className={styles.userName}>
                            <p>{e.first_name}</p>
                        </div>
                    </div>
                </Link>
            );
        })}
        </>
    );
}

export default UsersCart;