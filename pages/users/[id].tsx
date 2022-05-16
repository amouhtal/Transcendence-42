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
    const [update, setUpdate] = useState<boolean>(false);

    const router = useRouter();
    useEffect(() => {
        axios.get('http://10.12.11.3:3000/friends/all', {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then((res) =>{
            console.log("response = ", res.data);
            setUsersData(res.data);
            // console.log("usersData=",usersData)
        })
    },[update])
    let filtredData = usersData?.all_users?.filter((value: any) => {
        return (value.userName === router.query.id)
    })[0];
    return (
        <div className={Style.container}>
            <div className={Style.container2}>
                {console.log(filtredData)}
                <CartProfile data={filtredData}
                usersdata={usersData?.all_users}
                status={false}
                usersSinvite={usersData?.user_sinvite}
                usersRinvite={usersData?.user_rinvite}
                friends={usersData?.user_friends}
                setUpdate={setUpdate}
                update={update}
                Myprofile={false}/>
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