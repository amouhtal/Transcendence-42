import { useState } from 'react';
import styles from '../../styles/home/home.module.css'
import Popup from '../Popup/popup';
const Home = () => {
    const [popup, setPopup] = useState<boolean>(false);
    const popupTxt = "A small ball moves across the screen, bouncing off the top and bottom ledges, and the two players each control a pad, sliding it vertically between the ends of the screen using the controls. If the ball hits the pad, it bounces back to the other player. If it misses the pad, the other player scores a point. The ball bounces in different ways depending on how it hits the pad.";
    const handleClick = (e: any) => {
        setPopup(true);
    }
    return (
        <>
        <div className={styles.title}>
            <h1>Welcome</h1>
        </div>
        <div className={styles.FullContainer}>
            <div className={styles.game}>
                <div className={styles.player1}></div>
                <div className={styles.player2}></div>
                <div className={styles.middleLine}></div>
                <div className={styles.ball}></div>
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.howToplay} onClick={(e: any) => handleClick(e, )}>
                <p>How To play</p>
            </div>
            <div className={styles.FindFriends}>
                <p>Find Friends</p>
            </div>
            <div className={styles.dontNow}>
                <p>DontNow</p>
            </div>
            <div className={styles.QuickMatch}>
                <p>Quick Match</p>
            </div>
                <Popup trigger={popup} Child={popupTxt} title="Press up and down arrows to move your pad" setTrigger={setPopup}/>
        </div>
            </>
    );
}

export default Home;