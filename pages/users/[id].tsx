import Style from "../../styles/profile/Profile.module.css"
import userData from '../../data.json'
import { useRouter } from 'next/router'
import CartProfile from "../../components/profile/cartProfile"
import SliderAchevment from "../../components/profile/sliderAchevment"
import MatchHestory from "../../components/profile/matchHestory"
import axios from 'axios'
import { useEffect, useState } from 'react'
import FakeData from '../../data.json'

function Profile (){
    const [usersData, setUsersData] = useState<any>([])
    const router = useRouter();
    useEffect(() => {
        axios.get('http://10.12.11.3:3000/friends/all', {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
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
                <CartProfile userdata={filtredData} Myprofile={false}/>
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