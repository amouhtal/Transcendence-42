import style from "../../styles/profile/matchHestory.module.css"
import users from "../../data.json"
import img from "../../public/images/homme-jouant-au-tennis.png"
import image from "../../public/images/sttar.png"
import imag from "../../public/images/profile.jpg"
import crry from "../../public/images/crrey.png"

function MatchHestory () {
    return(
        <div className={style.Container}>
            <p className={style.matchHestory}> Match Hestory</p>
                <div className={style.matchScrol}></div>
                
                {users.map((use,index) =>(
                    <>
                        <div className={style.match} key={index} >
                            <div className={style.chaild1}>
                                <p className={style.EndMatch}> End Match {index}</p>
                                <p className={style.EndMatch}>{use.date}</p>
                            </div>
                            <div className={style.content}>
                                <div className={style.child2}>
                                    <img src={imag.src} className={style.img1}></img>
                                    <p className={style.EndMatch}>{use.userName}</p>
                                    <div className={style.winIcon}>
                                        <p className={style.EndMatch}>{use.end}</p>
                                        <img src={image.src} className={style.imgicon}></img>
                                    </div>
                                    <p className={style.EndMatch1}>{use.scor}</p>
                                </div>
                                <p className={style.VS}>VS</p>
                                <div className={style.child3}>
                                    <img src={imag.src} className={style.img2}></img>
                                    <p className={style.EndMatch}>{use.oppenonet?.userName}</p>
                                    <div className={style.winIcon}>
                                        <p className={style.EndMatch}>{use.end}</p>
                                        <img src={crry.src} className={style.imgicon}></img>
                                    </div>
                                    <p className={style.EndMatch1}>{use.scor}</p>
                                </div>
                            </div>
                        </div>
                        <div className={style.separet} key={index}></div>
                    </>
                ))}
        </div>
    )
}

export default MatchHestory