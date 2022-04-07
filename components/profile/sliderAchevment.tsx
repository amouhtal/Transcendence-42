import img1 from "../../public/imgSlide/861755.jpg"
import img2 from "../../public/imgSlide/IMG_20210525_100044_455.jpg"
import img3 from "../../public/imgSlide/pexels-lisa-1438248.jpg"
import img4 from "../../public/imgSlide/ricardo-gomez-angel-JJD1i9YO7w8-unsplash.jpg"
import img5 from "../../public/imgSlide/sepp-rutz-M2w-5xIkTzI-unsplash.jpg"
import img6 from "../../public/imgSlide/wallpaperflare.com_wallpaper (2).jpg"
import style from "../../styles/profile/sliderAchevment.module.css"

function SliderAchevment () {
    const images = [
        img1,img2,img3,img4,img5,img6
    ]
    const NextSlider = () =>{
        
    }

    const PrevSlider = () =>{

    }
    return(
        <div className={style.cartSlide}>
            <div className={style.child}>
                <div className={style.textSlid}>
                    <p className={style.AChevmente}>Achevmente</p>
                    <button className={style.ViewAll}>View All</button>
                </div>
                <div className={style.achivment}>
                    <div className={style.leftImage}><img className={style.childleft} src={img1.src}></img></div>
                    <div className={style.faceImage}><img className={style.childface} src={img5.src}></img></div>
                    <div className={style.rightImage}><img className={style.childright}src={img3.src}></img></div>
                </div>
            <div className={style.BtnSlider}>
                <button className={style.btnSlider} onClick={() => PrevSlider()}>Previous</button>
                <button className={style.btnSlider} onClick={() => NextSlider()}>Next</button>
            </div>
            </div>
        </div>
    )
}

export default SliderAchevment