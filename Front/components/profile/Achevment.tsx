import style from "../../styles/profile/sliderAchevment.module.css";
import Link from "next/link";
import LiveListMatch from "../LiveMatch/ListeLiveMatch";
import CartNotification from "../notification/Cart";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function Achevment(props: any) {
      const router = useRouter();
    const [userInfo, setUserInfo] = useState<any>({});
    const [allnotification, setNotification] = useState([])
    const [livematch, setLiveMatch] = useState<any>([])
    const [alluser, setAlluser] = useState([])
    const [data, setData] = useState<any>(props.data); useEffect(() => {setData(props.data)}, [props.data]);
    const [refresh, setRfresh] = useState<boolean>(false);
    console.log("props=",props.data?.userName)

    useEffect(() => {
            axios.get(
                `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
                }
            ).then((res) =>{
                setAlluser(res.data?.all_users);
            })
            .catch(function (error){
                if (error.response){
                    router.push({pathname :`/errorPage/${error.response.status}`})
                }
            })
    }, [])

    useEffect(() => {
            axios.post(
              `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/livegames/getLiveGameByUserName`,
              {userName :  data?.userName},{
                  headers: {
                      Authorization: `Bearer ${
                        localStorage.getItem("accessToken") as string
                      }`,
                  }  
              }
          ).then((res) =>{
            setLiveMatch(res.data);
          }).catch(function (error){
            if (error.response){
              router.push({pathname :`/errorPage/${error.response.status}`})
            }
          })
      }, [data]);
      // console.log("useeeerName", userInfo?.userName);      
    useEffect(() =>{
        axios.post(
            `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/notifications/getUserNotifications`,
            {userName : data?.userName},{
                headers: {
                    Authorization: `Bearer ${
                      localStorage.getItem("accessToken") as string
                    }`,
                }  
            }
        ).then((res) =>{
            setNotification(res.data);
        }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        })
    },[refresh,data])
    const getSenderInformation = (userName:string) => {
      console.log(",=====>",alluser)
        const filterData: any = alluser.filter((e:any) => {
            return (e.userName === userName);
        })
        return filterData;
    }
    props.socket?.off("Refresh").on("Refresh", (data: any) => {setRfresh(!refresh)})
  return (
    <div className={style.cartSlide}>
      <div className={style.achivment}>
        {
          props.Myprofile ?(
            allnotification.length > 0 ?(
            allnotification.map((e, id) =>{
            const [senderInformation]: any = getSenderInformation(e.senderName);
            console.log("senderInformation=",senderInformation);
            return (
              <div key={Math.random()}>
                <CartNotification MyP={true} key={id} data={e} PicSender={senderInformation}/>
              </div>
            )})
           ):( <div className={style.NoNotification}>No Notification</div>)
          ):(
            livematch && <LiveListMatch LiveM={true} data={livematch} socket={props.socket}/>)
        }
      </div>
    </div>
  );
}

export default Achevment;
