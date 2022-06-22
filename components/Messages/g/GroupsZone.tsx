import { FiSearch } from "react-icons/fi";
import { MdAddComment } from "react-icons/md"
import GroupsCart from './groupsCart';
import styles from '../../../styles/messages/messages.module.css'
import img from '../../../public/images/writing.png'
import { BsPlus } from "react-icons/bs";
import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import image from '../../../public/images/profile.jpg'
import stylesfriends from '../../../styles/messages/friends.module.css'
import axios from "axios";
import UsersCart from './UsersgrpCart'
import FakeData from '../../../data.json'
import padlock from '../../../public/images/padlock.png'
import show from '../../../public/images/show.png'
import hidden from '../../../public/images/hidden.png'

/*
    -Private UseState : sheck If the room is Private or public : show or not show the room;
    -Protected UseStae: check if the room have a password on None;
*/
const FriendsZone = (props:any) => {
    const [ContactInformation, setContatInformation] = useState<any>([]);
    let FriendsInformation: any = [];
    const router = useRouter();
    const [CreatNewGrp, setCreatNewGrp] = useState<boolean>(false);
    const [Private, setPrivate] = useState<boolean>(false);
    const [usersChoosen, setChoosenUsers] = useState<any>([])
    const [update,setUpdate] = useState<boolean>(false);
    const [Protected, setProtected] = useState<boolean>(false);
    const [GroupName, setGroupName] = useState<string>("");
    const [GourpPassword, setGroupPassword] = useState<string>("");
    // const handleSubmit = (e:any) => {
    //     e.preventDefault();
    //     console.log(e.target.Password.value);
    //     axios.post("http://localhost:3001/chatRoom/create",{name: e.target.groupeName.value, type: Public ? "public" : Private ? "private" : "error", password: e.target.Password.value},
    //     {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
    //     .then((res: any) => {
    //             console.log("res =",res);
    //     }).catch(function (error){
    //         if (error.response){
    //             router.push({pathname :`/errorPage/${error.response.status}`})
    //         }
    //     })
    // }
    useEffect(() => {
        axios.get("http://localhost:3001/chatRoom/getAllRooms",
        {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            console.log("response=",res);
        })
    },[])
    const handelNameCange = (e:any) => {
        e.preventDefault();
        setGroupName(e.target.value);
    }
    return (
        <div className={props.show ? styles.friendListshow : styles.friendListDontshow}>
            <div className={styles.searchBar}>
                <form action="">
                    <input type="search" name="" id="" className={styles.search} placeholder="Enter for search..."/>
                    <FiSearch className={styles.searchIcon}/>
                </form>
            </div>
            <div className={styles.creatNewGrp}>
                {/* <p>Creat New Groupe</p> */}
                <img src={img.src} className={styles.creatIcon} onClick={(e:any) => {e.preventDefault();setCreatNewGrp(!CreatNewGrp)}} />
            </div>
            <div className={CreatNewGrp ? styles.creatGoupContainerOn : styles.creatGoupContainerOff}>
                <p className={styles.NewGrpP}>New Group</p>
                <button className={styles.btn_create} onClick={(e:any) => {
                    setCreatNewGrp(!CreatNewGrp);setProtected(false);setChoosenUsers([]);
                    console.log("Hellloo im heeererererer");    
                    props.socket?.emit("creatChannel",{name:GroupName, type:Private ? "private" : "public", protected:Protected ? true : false,password: Protected ? GourpPassword : null,users: usersChoosen})
                    }}>Create</button>
                <button className={styles.btn_cancel} onClick={(e:any) => {e.preventDefault();setCreatNewGrp(!CreatNewGrp);setChoosenUsers([])}}>Cancel</button>
                <form action="" className={styles.groupForm}>
                    <input type="text" placeholder="Group name" className={styles.groupName} onChange={handelNameCange}/>
                </form>
                <div className={styles.container}>
                    <label className={styles.switch}>
                    <input type="checkbox" onChange={(e:any) => {setProtected(!Protected)}}/>
                    <div className={`${styles.slider} ${styles.round}`}></div>
                    </label>
                </div>
                <img src={padlock.src} alt="Protected" className={styles.private} />
                <img src={show.src} alt="show" className={Private ? styles.none: styles.showIcon} onClick={(e:any) => {setPrivate(true)}}/>
                <img src={hidden.src} alt="show" className={Private ? styles.showIcon : styles.none} onClick={(e:any) => {setPrivate(false)}}/>
                <input type="text" placeholder="Password..." className={Protected ? styles.Password : styles.none} onChange={(e:any) => {setGroupPassword(e.target.value)}}/>
                <input type="text" placeholder="Search..." className={styles.creatGroupsearch}/>
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
                <div className={CreatNewGrp ? styles.usersContainer : styles.none}>
                    <UsersCart data={FakeData} setChoosenUsers={setChoosenUsers} usersChoosen={usersChoosen} update={update} setUpdate={setUpdate}/>
                </div>
            </div>
            <div className={styles.friendscard}>
                <GroupsCart data={props.data} status={props.status} setShow={props.setShow}/>
            </div>
        </div>
    );
}

export default FriendsZone;