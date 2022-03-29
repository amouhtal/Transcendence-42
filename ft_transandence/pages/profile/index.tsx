import Style from "../../styles/profile/Profile.module.css"
import CartProfile from "../../components/profile/cartProfile"
import MatchHestory from "../../components/profile/matchHestory"
import SliderAchevment from "../../components/profile/sliderAchevment"

function Profile (){
    return (
        <div className={Style.container}>
            <div className={Style.container2}>
                <CartProfile />
                <SliderAchevment />
            </div>
           <div className={Style.matchH}>
               <MatchHestory />
           </div>
        </div>
    )
}

export default Profile