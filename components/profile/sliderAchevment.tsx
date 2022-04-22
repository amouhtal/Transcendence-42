import style from "../../styles/profile/sliderAchevment.module.css"
import Link from 'next/link'
import achivement from '../../achievement.json'
import ViewAchievement from "../Achievement"

function SliderAchevment () {

    return(
        <div className={style.cartSlide}>
            <div className={style.child}>
                <div className={style.textSlid}>
                    <p className={style.AChevmente}>Achievement</p>
                    <Link href='/achievement'><button className={style.ViewAll}>View All</button></Link>
                </div>
                <div className={style.achivment}>
                    {achivement.map((achiv, index) =>(
                        <div key={index} className={style.faceImage}></div>
                    ))}
                </div>
            {/* <div className={style.BtnSlider}>
                <button className={style.btnSlider}>Previous</button>
                <button className={style.btnSlider}>Next</button>
            </div> */}
            </div>
        </div>
    )
}

export default SliderAchevment
