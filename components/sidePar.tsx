import  Style  from "../styles/sidePar.module.css"
import  Profile from './../public/images/profile.jpg';
// import  iconprofil from './../public/images/iconprofil.png';
// import  iconHome from './../public/images/home.png';
// import  iconGame from './../public/images/icon-game.png';
// import  iconLogout from './../public/images/log-out.png';
// import  message from './../public/images/message-icon.png';
// import  Notification from './../public/images/notification-icon.png';
// import  setting from './../public/images/setting-icon.png';
import  search from './../public/images/search.png';
import Link from 'next/link';
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";

function SidePar(){
    const [isNavBar, setNavBar] = useState<boolean>(true);
    return (
        <>
            <div className={isNavBar?Style.sideParOn: Style.sideParOff}>
                <div className={Style.container1}>
                    <img src={Profile.src} className={Style.imgProfile}></img>
                    <p className={Style.P}>FT_transcendence</p>
                </div>
                <div className={Style.container2}>
                    <div className={Style.child}>
                    <Link href='/users'><img src={search.src} className={Style.iconimg}/></Link>
                        <p className={Style.Picon}>Friends</p>
                    </div>
                    <div className={Style.child}>
                    <Link href='/home'><img src={search.src} className={Style.iconimg}></img></Link>
                        <p className={Style.Picon}>Home</p>
                    </div>
                    <div className={Style.child}>
                    <Link href='/profile'><img src={search.src} className={Style.iconimg}></img></Link>
                        <p className={Style.Picon}>Profile</p>
                    </div>
                    <div className={Style.child}>
                    <Link href='/messages'><img src={search.src} className={Style.iconimg}></img></Link>
                        <p className={Style.Picon}>Messages</p>
                    </div>
                    <div className={Style.child}>
                        <img src={search.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Notification</p>
                    </div>
                    <div className={Style.child}>
                        <img src={search.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Game</p>
                    </div>
                    <div className={Style.child}>
                        <img src={search.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Setting</p>
                    </div>
                </div>
                    <div className={Style.Logout}>
                        <img src={search.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Logout</p>
                    </div>
            </div>
            <button className={isNavBar? Style.btnOn: Style.btnOff} onClick={() => {setNavBar(!isNavBar)}}><AiOutlineBars className={Style.icon}/></button>
        </>
    )
}
export default SidePar