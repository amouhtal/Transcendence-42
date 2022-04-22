import Style from "../../styles/profile/Profile.module.css"
import CartProfile from "../../components/profile/CartProfile"
import MatchHestory from "../../components/profile/MatchHestory"
import SliderAchevment from "../../components/profile/SliderAchevment"
import CinFormation from "../pop"

function Profile (){
    return (
        <div className={Style.container}>
            <CartProfile />
            <SliderAchevment />
            <MatchHestory />
        </div>
    )
}

export default Profile