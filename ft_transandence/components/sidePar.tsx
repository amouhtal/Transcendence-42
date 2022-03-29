import  Style  from "../styles/sidePar.module.css"
import  Profile from './../public/images/profile.jpg';
import  iconprofil from './../public/images/iconprofil.png';
import  iconHome from './../public/images/home.png';
import  iconGame from './../public/images/icon-game.png';
import  iconLogout from './../public/images/log-out.png';
import  message from './../public/images/message-icon.png';
import  Notification from './../public/images/notification-icon.png';
import  setting from './../public/images/setting-icon.png';
import  search from './../public/images/search.png';
import Link from 'next/link';

function SidePar(){
    return (
        <>
            <div className={Style.sidePar}>
                <div className={Style.container1}>
                    <img src={Profile.src} className={Style.imgProfile}/>
                    <p className={Style.P}>Zakarya Akdim</p>
                </div>
                <div className={Style.container2}>
                    <div className={Style.Setting}>
                    <Link href='/users'><img src={search.src} className={Style.iconimg}></img></Link>
                        <p className={Style.Picon}>Find Friends</p>
                    </div>
                    <div className={Style.home}>
                        <img src={iconHome.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Home</p>
                    </div>
                    <div className={Style.Profile}>
                        <img src={iconprofil.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Profile</p>
                    </div>
                    <div className={Style.Messages}>
                        <img src={message.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Messages</p>
                    </div>
                    <div className={Style.Notification}>
                        <img src={Notification.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Notification</p>
                    </div>
                    <div className={Style.Game}>
                        <img src={iconGame.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Game</p>
                    </div>
                    <div className={Style.Setting}>
                        <img src={setting.src} className={Style.iconimg}></img>
                        <p className={Style.Picon}>Setting</p>
                    </div>
                </div>
                    <div className={Style.Logout}>
                        <img src={iconLogout.src} className={Style.iconimgLogout}></img>
                        <p className={Style.Picon}>Logout</p>
                    </div>
            </div>
        </>
    )
}

export default SidePar