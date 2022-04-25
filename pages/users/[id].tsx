import Style from "../../styles/profile/Profile.module.css"
import userData from '../../data.json'
import { useRouter } from 'next/router'
import CartProfile from "../../components/profile/cartProfile"
import SliderAchevment from "../../components/profile/sliderAchevment"
import MatchHestory from "../../components/profile/MatchHestory"
import axios from 'axios'
import { useEffect, useState } from 'react'
import FakeData from '../../data.json'

function Profile (){
    const [userInfo, setuserInfo] = useState<any>([])
    const router = useRouter();
    const [filtredData] = FakeData.filter((value: any) => {
        // console.log(router.query.id);
        return (value.userName === router.query.id)
    });
    // const info = {userName: router.query.id}
    // console.log("info :", typeof router.query.id);
    // console.log(router.query);
    // useEffect(() => {
    //     if(!router.isReady) return;
    //     axios.post('http://10.12.11.3:3000/friends/one',{userName: `${router.query.id}`},{
    //         headers:{
    //             'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbW91aHRhbEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTA2Mzk0MjAsImV4cCI6MTY1MTY3NjIyMH0.BXv9s17uEzNUXsBekwm42fCNnIV1dTLDW63bM-DkKwQ`
    //         }
    //     }).then((res) =>{
    //         // console.log(res.data);
    //         setuserInfo(res.data);
    //     })
    // },[router.isReady])
    // console.log(router.query.id);
    return (
        <div className={Style.container}>
            <div className={Style.container2}>
                <CartProfile userdata={filtredData}/>
                <SliderAchevment/>
            </div>
           <div className={Style.matchH}>
               <MatchHestory userdata={userInfo.userInfo} gameHistory={userInfo.gameHistory}/>
           </div>
        </div>
    )
}

export default Profile;