import styles from '../../../styles/messages/index.module.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Router, { useRouter } from 'next/router';
import GroupsZone from '../../../components/Messages/g/GroupsZone';
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import UserInfo from '../../../components/Messages/UserInfo';
import ChatZone from '../../../components/Messages/chatZone';
import axios from 'axios';

const messages = (props:any) => {
    const [Status ,setStatus] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(true);
    const [groups, setGroups] = useState<any>();

    return (
        <>
            <div className={styles.globaleContainer}>
                <div className={styles.container}>
                    <GroupsZone data={groups} Info={groups} status={Status} show={showFriends} setShow={setShowFriends} socket={props.socket}/>
                    <div className={styles.indexWelcomeZone}>
                        <h1 className={styles.indexWelcomeSentence}>Welcome To ft_transcendance Groups Chat</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default messages;