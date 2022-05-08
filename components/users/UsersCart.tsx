import styles from '../../styles/users/usersCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../public/images/profile.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import addUser from '../../public/images/usersImages/add-user.png'
import chatting from '../../public/images/usersImages/chatting.png'
import { useRouter } from 'next/router'
import profileIcon from '../../public/images/profile.jpg'
import blockUser from '../../public/images/usersImages/block-user.png'
import accept from '../../public/images/usersImages/accept.png'
import reject from '../../public/images/usersImages/reject.png'
import users from '../../pages/users'

const UsersCart = (props:any) => {
    const [friends, setFriends] = useState<any>([])
    const [usernamek, setuserNamek] = useState<string>();
    const [isFriend, setIsFreind] = useState<boolean>(false);
    const router = useRouter();
    const CheckIfFriend = (user:any) => {
        let friendstest = false;
        // console.log(props.friends);
        props.friends?.map ((e:any) => {
            // console.log("e.userName = ", e.userName, "user.userName = ", user.userName)
            if (e.userName === user.userName)
                friendstest = true;
        })
        return friendstest
    }
    const CheckIfInviteRecive = (user:any) => {
        let isInvite = false;
        // props.usersSinvite?.map((e:any) => {
        //     if (e.userName === user.userName)
        //         isInvite = true;
        // })
        props.usersRinvite?.map((e:any) => {
            if (e.userName === user.userName)
                isInvite = true;
        })
        return isInvite;
    }
    const CheckIfInviteSend = (user:any) => {
        let isInvite = false;
        props.usersSinvite?.map((e:any) => {
            if (e.userName === user.userName)
                isInvite = true;
        })
        // props.usersRinvite?.map((e:any) => {
        //     if (e.userName === user.userName)
        //         isInvite = true;
        // })
        return isInvite;
    }
    let checkFriends: boolean;
    let checkInviteRecive: boolean;
    let checkInviteSend:boolean
    return (
        <>
        {props.data?.map((e: any | any[]) => {
            return  (
                // <Link href={`/users/${e.userName}`} key={Math.random()}>
                    <div className={styles.userCard} key={Math.random()}>
                        <div className={`${styles.imgContainer}`}>
                            {/* <div className={props.status?styles.userStatusOn : styles.userStatusOff}></div> */}
                            <img src={e.picture} width={80} height={80} className={`${styles.profileImage} ${props.status?styles.userStatusOn : styles.userStatusOff}`}/>
                        </div>
                        <div className={styles.userName}>
                            <p>{e.userName}</p>
                        </div>
                        <div className={styles.icons}>
                            {checkFriends = CheckIfFriend(e)}
                            {checkInviteRecive = CheckIfInviteRecive(e)}
                            {checkInviteSend = CheckIfInviteSend(e)}
                            <Link href={`/users?id=${e.userName}`}>
                            <img src={addUser.src} alt="add" className={checkInviteRecive ? styles.none : checkInviteSend ? styles.none : checkFriends ? styles.none : styles.addUserIcon} onClick={(e:any) => {
                                console.log("name=",router.query);
                                    const data = { recipent_id: `${router.query.id}` };
                                    // console.log(data);
                                    axios.post('http://10.12.4.2:3000/friends/send',data,{
                                      headers:{
                                            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmV0dGFjaEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTIwMTM0NDQsImV4cCI6MTY1MzA1MDI0NH0.hv6DAluhbY8MoWS7cbmtOLkdZxp4NDDHck9Kdn53P-o`
                                  }
                                }).then((res) =>{
                                    //   console.log(res.data.message)
                                })
                                // router.query.name = '';
                                // router.push(`/users`)
                            }}/>
                            </Link>
                            <img src={accept.src} alt="accept" className={checkInviteRecive && !checkFriends ? styles.acceptInvite: styles.none} onClick={(e:any) => {
                                const data = {
                                    sender_id: "amouhtal"
                                };
                                // console.log(data);
                                axios.post('http://10.12.4.2:3000/friends/accept',data,{
                              headers:{
                                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmV0dGFjaEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTIwMTM0NDQsImV4cCI6MTY1MzA1MDI0NH0.hv6DAluhbY8MoWS7cbmtOLkdZxp4NDDHck9Kdn53P-o`
                              }
                            }).then((res) =>{
                            //   console.log(res.data.message)
                            })
                            }}/>
                            <Link href={`/users?id=${e.userName}`}>
                            <img src={reject.src} alt="reject" className={checkInviteRecive && !checkFriends ? styles.rejectInvite: checkInviteSend ? styles.rejectInvite : styles.none} onClick={(e: any) => {
                                console.log("id=", router.query.id)
                                const data = {
                                    recipent_id: router.query.id
                                };
                                // console.log(data);
                                axios.post('http://10.12.4.2:3000/friends/cancell',data,{
                              headers:{
                                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmV0dGFjaEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTIwMTM0NDQsImV4cCI6MTY1MzA1MDI0NH0.hv6DAluhbY8MoWS7cbmtOLkdZxp4NDDHck9Kdn53P-o`
                              }
                            }).then((res) =>{
                            //   console.log(res.data.message)
                            })
                            // router.push(`/users`)
                            }}/>
                            </Link>
                            {checkInviteRecive = false}
                            {checkInviteSend = false}
                            {checkFriends = false}
                            <Link href={`/messages/${e.userName}`}>
                                <img src={chatting.src} alt="chat" className={styles.chattingIcon}/>
                            </Link>
                            <img src={blockUser.src} alt="add" className={props.blocked ? styles.addUserIcon : styles.none} />
                        </div>
                    </div>
                // </Link>
            );
        })}
        </>
    );
}

export default UsersCart;