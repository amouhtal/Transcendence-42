import  Style  from "../styles/sidePar.module.css"
// import  Profile from './../public/images/profile.jpg';
import  Profile from './../public/images/tennis1.png';
import  iconprofil from './../public/images/imgeSidBar/profile.png';
import  iconHome from './../public/images/imgeSidBar/home.png';
import  iconGame from './../public/images/imgeSidBar/game-controller.png'
import  iconLogout from './../public/images/imgeSidBar/out.png';
import  message from './../public/images/imgeSidBar/email.png';
import  Notification from './../public/images/imgeSidBar/bell.png';
import  setting from './../public/images/imgeSidBar/profileSetting.png';
import  friends from './../public/images/imgeSidBar/group.png';
import Link from 'next/link';
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";

function SidePar(){
    const [isNavBar, setNavBar] = useState<boolean>(true);
    return (
        <>
            <div className={isNavBar?Style.sideParOn: Style.sideParOff}>
                {/* <div className={Style.container1}>
                    <img src={Profile.src} className={Style.imgProfile}></img>
                    <p className={Style.P}>FT_transcendence</p>
                </div> */}
                <div className={Style.container2}>
                    <div className={Style.child}>
                    <Link href='/users'><img src={friends.src} className={Style.iconimg} onClick={(e:any) => {setNavBar(!isNavBar)}}/></Link>
                        {/* <p className={Style.Picon}>Friends</p> */}
                    </div>
                    <div className={Style.child}>
                    <Link href='/home'><img src={iconHome.src} className={Style.iconimg} onClick={(e:any) => {setNavBar(!isNavBar)}}></img></Link>
                        {/* <p className={Style.Picon}>Home</p> */}
                    </div>
                    <div className={Style.child}>
                    <Link href='/profile'><img src={iconprofil.src} className={Style.iconimg} onClick={(e:any) => {setNavBar(!isNavBar)}}></img></Link>
                        {/* <p className={Style.Picon}>Profile</p> */}
                    </div>
                    <div className={Style.child}>
                        <Link href='/messages'><img src={message.src} className={Style.iconimg} onClick={(e:any) => {setNavBar(!isNavBar)}}></img></Link>
                        {/* <p className={Style.Picon}>Messages</p> */}
                    </div>
                    <div className={Style.child}>
                        <img src={Notification.src} className={Style.iconimg} onClick={(e:any) => {setNavBar(!isNavBar)}}></img>
                        {/* <p className={Style.Picon}>Notification</p> */}
                    </div>
                    <div className={Style.child}>
                        <img src={iconGame.src} className={Style.iconimg} onClick={(e:any) => {setNavBar(!isNavBar)}}></img>
                        {/* <p className={Style.Picon}>Game</p> */}
                    </div>
                    <div className={Style.child}>
                        <img src={setting.src} className={Style.iconimg} onClick={(e:any) => {setNavBar(!isNavBar)}}></img>
                        {/* <p className={Style.Picon}>Setting</p> */}
                    </div>
                </div>
                    <div className={Style.Logout}>
                        <img src={iconLogout.src} className={Style.iconimg} onClick={(e:any) => {setNavBar(!isNavBar)}}></img>
                        {/* <p className={Style.Picon}>Logout</p> */}
                    </div>
            </div>
            <button className={isNavBar? Style.btnOn: Style.btnOff} onClick={() => {setNavBar(!isNavBar)}}><AiOutlineBars className={Style.icon}/></button>
        </>
    )
}
export default SidePar