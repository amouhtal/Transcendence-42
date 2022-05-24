import Style from "../../styles/profile/Profile.module.css"
import CartProfile from "../../components/profile/cartProfile"
import MatchHestory from "../../components/profile/matchHestory"
import SliderAchevment from "../../components/profile/sliderAchevment"
import axios from "axios"
import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { type } from "os"
import FakeData from '../../data.json'
import UserInfoPopup2 from '../../components/UserInfoPopup/UserInfoPopup2'
import {useSelector} from 'react-redux'

function Profile (){
    const [userInfo, setUserInfo] = useState<any>({});
    const [MatchHistory, setMatchHistory] = useState<any>([]);
    const Router = useRouter();
    useEffect(() => {
        axios.post('http://10.12.11.3:3000/users/profile',null,{
            headers:{
              'Authorization': `Bearer ${localStorage.getItem("accessToken") as string}`
            }
          }).then((res) =>{
            setUserInfo(res.data.userInfo);
            setMatchHistory(res.data.gameHistory);
          })
    }, [])
    const test:any = useSelector<any>(state=>state);
    return (
      <>
          <div className={Style.container}>
            <div className={Style.header}>
              <CartProfile data={userInfo} Myprofile={true}/>
              <SliderAchevment />
            </div>
              <MatchHestory userData={userInfo} gameHistory={MatchHistory}/>
          </div>
          {test.sizes_.zak_test && <UserInfoPopup2 />}
        </>
    )
}

export default Profile;