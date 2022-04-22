import style from "../../styles/profile/matchHestory.module.css"
import users from "../../users-data.json"
import img from "../../public/images/homme-jouant-au-tennis.png"
import image from "../../public/images/sttar.png"
import imag from "../../public/images/profile.jpg"
import crry from "../../public/images/crrey.png"
import Image from 'next/image'

function MatchHestory () {
    return(
        <div className={style.Container}>
            <p className={style.matchHestory}> Match History</p>
            <div className={style.containerHistory}>
                    {users.map((use,index) =>(
                    <div className={style.match} key={index} >
                        <div className={style.chaild1}>
                            <p className={style.EndMatch}> End Match {index}</p>
                            <p className={style.EndMatch}>{use.oppenonet?.date}</p>
                        </div>
                        <div className={style.content}>
                            <div className={style.child2}>
                                <div className={style.myimg}><Image src={imag.src} className={style.img1} width={70} height={70}/></div>
                                <p className={style.EndMatch}>Zakdim</p>
                                <div className={style.winIcon}>
                                    <p className={style.EndMatch}>{use.me?.end}</p>
                                    <img src={image.src} className={style.imgicon}></img>
                                </div>
                                <p className={style.EndMatch1}>{use.me?.scor}</p>
                            </div>
                            <p className={style.VS}>VS</p>
                            <div className={style.child3}>
                                <div className={style.vsimg}><Image src={imag.src} className={style.img2} width={70} height={70}/></div>
                                <p className={style.EndMatch}>{use.oppenonet?.userName}</p>
                                <div className={style.winIcon}>
                                    <p className={style.EndMatch}>{use.oppenonet?.end}</p>
                                    <img src={crry.src} className={style.imgicon}></img>
                                </div>
                                <p className={style.EndMatch1}>{use.oppenonet?.scor}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MatchHestory