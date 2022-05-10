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
    const [usersData, setUsersData] = useState<any>([])
    const router = useRouter();
    useEffect(() => {
        axios.get('http://10.12.11.3:3000/friends/all', {
            headers:{
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmV0dGFjaEBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2NTA4MjA5OTMsImV4cCI6MTY1MTg1Nzc5M30.2hjp2cBut1fSxh_mhNmnBIi7w2cj3teS8CW63AcuDYo`
            }
        }).then((res) =>{
            console.log("response = ", res.data);
            setUsersData(res.data.all_users);
            // console.log("usersData=",usersData)
        })
    },[])
    const [filtredData] = usersData.filter((value: any) => {
        return (value.userName === router.query.id)
    });
    return (
        <div className={Style.container}>
            <div className={Style.container2}>
                <CartProfile userdata={filtredData}/>
                <SliderAchevment/>
            </div>
           <div className={Style.matchH}>
               <MatchHestory  friends={false}/>
               {/* userdata={''} gameHistory={} */}
           </div>
        </div>
    )
}

export default Profile;