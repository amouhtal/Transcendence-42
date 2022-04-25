import Style from "../../styles/profile/Profile.module.css"
import CartProfile from "../../components/profile/CartProfile"
import MatchHestory from "../../components/profile/MatchHestory"
import SliderAchevment from "../../components/profile/SliderAchevment"
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
    // useEffect(() => {
    //     axios.get('http://10.12.11.3:3000/users/profile',{
    //         headers:{
    //           'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmV0dGFjaEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTA2NDYyMzYsImV4cCI6MTY1MTY4MzAzNn0.mkVYrkzhNsL1RzuORqJwiCllxZD9Vq0Yl9MzN6a4lYU`
    //         }
    //       }).then((res) =>{
    //         //   console.log(res.data);
    //           setUserInfo(res.data.userInfo);
    //           setMatchHistory(res.data.gameHistory);
    //       })
    // }, [])
    return (
        <div className={Style.container}>
          <div className={Style.header}>
            <CartProfile userdata={FakeData[0]}/>
            <SliderAchevment />
          </div>
            <MatchHestory userData={FakeData} gameHistory={MatchHistory}/>
        </div>
    )
}

export default Profile;