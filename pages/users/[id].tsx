import Style from "../../styles/profile/Profile.module.css"
import CartProfile from "../../components/profile/cartProfile"
import MatchHestory from "../../components/profile/matchHestory"
import SliderAchevment from "../../components/profile/sliderAchevment"
import userData from '../../data.json'
import { useRouter } from 'next/router'

function Profile (){
    const router = useRouter();
    const [filtredData] = userData.filter((value: any) => {
        console.log(router.query.id);
        return (value.first_name === router.query.id)
    });
    return (
        <div className={Style.container}>
            <div className={Style.container2}>
                <CartProfile userData={filtredData}/>
                <SliderAchevment userData={filtredData}/>
            </div>
           <div className={Style.matchH}>
               <MatchHestory userData={filtredData}/>
           </div>
        </div>
    )
}

export default Profile;