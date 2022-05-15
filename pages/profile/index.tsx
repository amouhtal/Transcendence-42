import Style from "../../styles/profile/Profile.module.css"
import CartProfile from "../../components/profile/cartProfile"
import MatchHestory from "../../components/profile/matchHestory"
import SliderAchevment from "../../components/profile/sliderAchevment"
import CinFormation from "../pop"
import axios from "axios"
import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { type } from "os"
import FakeData from '../../data.json'
function Profile (){
    const [userInfo, setUserInfo] = useState<any>({});
    const [MatchHistory, setMatchHistory] = useState<any>([]);
    const Router = useRouter();
    useEffect(() => {
        axios.get('http://10.12.11.3:3000/users/profile',{
            headers:{
              'Authorization': `Bearer ${localStorage.getItem("accessToken") as string}`
            }
          }).then((res) =>{
              console.log(res.data);
              setUserInfo(res.data.userInfo);
              setMatchHistory(res.data.gameHistory);
          })
    }, [])
    return (
        <div className={Style.container}>
          <div className={Style.header}>
            <CartProfile userdata={userInfo} Myprofile={true}/>
            <SliderAchevment />
          </div>
            <MatchHestory userData={userInfo} gameHistory={MatchHistory}/>
        </div>
    )
}

export default Profile;