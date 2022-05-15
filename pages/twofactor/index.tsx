import { useEffect } from 'react';
import styles from '../../styles/twofactor/twofactor.module.css'
import axios from 'axios';
const twofactor = () => {
    // useEffect(() => {
    //     axios.post('http://10.12.11.3/2fa/generate',{}, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
    //           }
    // }).then((response) => {
    //     console.log(response);
    //     });
    // })
    return (
        <div className={styles.GlobaleContainer}>
            <div className={styles.container}>
                <form action="">
                    <input type="text" className={styles.codeInput} />
                    <input type="submit" value="Send" className={styles.SubmitButton}/>
                </form>
            </div>
        </div>
    )
}

export default twofactor;