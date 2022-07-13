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
        axios
          .post(
            `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`,
            null,
            {
              headers: {
                Authorization: `Bearer ${
                  localStorage.getItem("accessToken") as string
                }`,
              },
            }
          )
          .then((res) => {
            setUserInfo(res.data.userInfo);
        })
        .catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        })

    }, []);

    useEffect(() =>{
        axios.post(
            `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/notifications/getUserNotifications`,
            {userName :  userInfo?.userName},{
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


      //   axios.post(
      //     `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/livegames/getLiveGameByUserName`,
      //     {userName :  userInfo?.userName},{
      //         headers: {
      //             Authorization: `Bearer ${
      //               localStorage.getItem("accessToken") as string
      //             }`,
      //         }  
      //     }
      // ).then((res) =>{
      //   console.log("lavematch-=-=>",res.data);
      //   setLiveMatch(res.data);
      // }).catch(function (error){
      //     if (error.response){
      //         router.push({pathname :`/errorPage/${error.response.status}`})
      //     }
      // })


    },[userInfo])
    const getSenderInformation = (userName:string) => {
        const filterData: any = alluser.filter((e:any) => {
            return (e.userName === userName);
        })
        return filterData;
    }
  return (
    <div className={style.cartSlide}>
      <div className={style.achivment}>
        {
          props.Myprofile ?(
            allnotification.length > 0 ?(
            allnotification.map((Data, id) =>{
            const [senderInformation]: any = getSenderInformation(Data.senderName);
            return (
              <div key={Math.random()}>
                <CartNotification MyP={true} key={id} data={Data} PicSender={senderInformation}/>
              </div>
            )})
           ):( <div className={style.NoNotification}>No Notification</div>)
          ):(
            <LiveListMatch LiveM={true}/>)
        }
      </div>
    </div>
  );
}

export default Achevment;
