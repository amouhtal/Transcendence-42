import styles from '../../styles/messages/index.module.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Friends from '../../dataFriend.json'
import Router, { useRouter } from 'next/router';
import FriendsZone from '../../components/Messages/friendsZone';
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import UserInfo from '../../components/Messages/UserInfo';
import ChatZone from '../../components/Messages/chatZone';
import UserInfoPopup from '../../components/UserInfoPopup/UserInfoPopup'
import {useSelector} from 'react-redux'
const messages = () => {
    const [Status ,setStatus] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(true);
    const router = useRouter();
    const [filterData] = Friends.filter((value: any) => {
        return (value.first_name === router.query.id);
    });
    const test:any = useSelector<any>(state=>state);
    return (
        <>
            <div className={styles.globaleContainer}>
                <button className={styles.tmp} onClick={(e:any) => {e.preventDefault();setStatus(!Status)}}>Status</button>
                <div className={styles.container}>
                    <FriendsZone data={Friends} status={Status} show={showFriends} setShow={setShowFriends}/>
                    <div className={styles.indexWelcomeZone}>
                        <h1 className={styles.indexWelcomeSentence}>Welcome To ft_transcendance Chat</h1>
                    </div>
                </div>
            </div>
            {test.sizes_.zak_test && <UserInfoPopup />}
        </>
    );
}

export default messages;