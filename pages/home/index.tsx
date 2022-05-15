import Home from '../../components/home/Home'
import styles from '../../styles/home/home.module.css'
import UserInfoPopup from '../../components/UserInfoPopup/UserInfoPopup'
import SidePar from '../../components/sideBar'


const home = () => {
    return (
        <>
        <div className={styles.globaleHomeContainer}>
            <Home />
        </div>
        <div className={styles.userInfoContainerBlure}></div>
        <div className={styles.userInfoContainer}>
            <UserInfoPopup />
        </div>
        </>
    );
}

export default home;