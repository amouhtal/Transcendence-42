import { FiSearch } from "react-icons/fi";
import GroupsCart from './groupsCart';
import styles from '../../../styles/messages/messages.module.css'
import img from '../../../public/images/writing.png'
import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UsersCart from './UsersgrpCart'
import padlock from '../../../public/images/padlock.png'
import show from '../../../public/images/show.png'
import hidden from '../../../public/images/hidden.png'
import { Loading, Grid } from "@nextui-org/react";

const FriendsZone = (props:any) => {
    const [CreatNewGrp, setCreatNewGrp] = useState<boolean>(false);
    const [Private, setPrivate] = useState<boolean>(false);
    const [usersChoosen, setChoosenUsers] = useState<any>([])
    const [update,setUpdate] = useState<boolean>(false);
    const [Protected, setProtected] = useState<boolean>(false);
    const [GroupName, setGroupName] = useState<string>("");
    const [GourpPassword, setGroupPassword] = useState<string>("");
    const [usersData, setUsersData] = useState<any>([]);
    const [PublicGroupsInfo, setPublicGroupsInfo] = useState<any>([]);
    const [PrivateGroupsInfo, setPrivateGroupsInfo] = useState<any>();
    const [getRoomsUpdate, setGetRoomsUpdate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refresh,setRefresh] = useState<boolean>(false);
    const [EmptyGroupeName, setEmptyGroupeName] = useState<boolean>(true);
    const router = useRouter();
    useEffect(() => {
         axios.get("http://localhost:3001/chatRoom/getAllRooms",{headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            console.log("theRes=",res)
            setPublicGroupsInfo(res.data.public);
            setPrivateGroupsInfo(res.data.private);
            let PrivateGroup: any = [];
            let on: boolean = false;
            PrivateGroupsInfo?.map((e:any) => {
                e.members.map((curr:any) => {
                    if (curr.userName === props.user?.userName)
                        on = true;
                })
                if (on)
                    PrivateGroup.push(e);
                setPrivateGroupsInfo(PrivateGroup);
                on = false;
            })
            setIsLoading(false);
        }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });
    },[getRoomsUpdate, refresh])
    useEffect( () => {
		 axios
		  .get(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`, {
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		  })
		  .then((res) => {
			setUsersData(res.data.all_users);
		  }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });;
	  }, []);
    const handelNameCange = (e:any) => {
        e.preventDefault();

        if (e.target.value !== "")
            setEmptyGroupeName(false);
        else {
            setEmptyGroupeName(true)
        }
        console.log("e.taget.value=",e.target.value)
        setGroupName(e.target.value);
    }
    props.socket?.on("Refresh", (data:any) => {setRefresh(!refresh)})
    return (
        <>
            <div className={props.show ? styles.friendListshow : styles.friendListDontshow}>
            <div className={styles.searchBar}>
                <form action="">
                    <input type="search" className={styles.search} placeholder="Enter for search..."/>
                    <FiSearch className={styles.searchIcon}/>
                </form>
            </div>
            <div className={styles.creatNewGrp}>
                <img src={img.src} className={styles.creatIcon} onClick={(e:any) => {e.preventDefault();setCreatNewGrp(!CreatNewGrp)}} />
            </div>
            <div className={CreatNewGrp ? styles.creatGoupContainerOn : styles.creatGoupContainerOff}>
                <p className={styles.NewGrpP}>New Group</p>
                <button className={styles.btn_create} onClick={(e:any) => {
                    if (!EmptyGroupeName)
                    {
                        props.socket?.emit("creatChannel",{name:GroupName, type:Private ? "private" : "public", protected:Protected ? true : false,password: Protected ? GourpPassword : null,users: usersChoosen});
                        props.socket?.emit("Refresh", usersData);
                        setGetRoomsUpdate(!getRoomsUpdate);
                        setCreatNewGrp(!CreatNewGrp);
                        setProtected(false);
                        setChoosenUsers([]);
                    }
                }}>Create</button>
                <button className={styles.btn_cancel} onClick={(e:any) => {e.preventDefault();setCreatNewGrp(!CreatNewGrp);setChoosenUsers([])}}>Cancel</button>
                <form action="" className={styles.groupForm}>
                    <input type="text" placeholder="Group name" className={styles.groupName} onChange={handelNameCange} />
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
                        usersChoosen.map((e:any, index:number) => {
                            return (
                                <div className={styles.users} key={index}>
                                    <img src={e.picture} alt="" className={styles.addUsersimg}/>
                                </div>
                            )
                        })
                    }
                </div>
                <p className={styles.Suggested}>SUGGESTED</p>
                <div className={CreatNewGrp ? styles.usersContainer : styles.none}>
                    <UsersCart data={usersData} setChoosenUsers={setChoosenUsers} usersChoosen={usersChoosen} update={update} setUpdate={setUpdate}/>
                </div>
            </div>
            {
                isLoading ?     
                <div className={styles.friendscard}>
                    <Grid><Loading type="gradient" /></Grid>
                </div>
                :
                <div className={styles.friendscard}>
                    <GroupsCart roomMembers={props.roomMembers} data={PublicGroupsInfo} thisRoomInfo={props.thisRoomInfo} user={props.user} PrivateData={PrivateGroupsInfo} setShow={props.setShow} setRoomOwnerUsername={props.setRoomOwnerUsername}/>
                </div>
            }
        </div>
        </>
        );
}

export default FriendsZone;

function handleRoshHotkey() {
    throw new Error("Function not implemented.");
}
