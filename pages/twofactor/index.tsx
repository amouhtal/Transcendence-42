import styles from '../../styles/twofactor/twofactor.module.css'

const twofactor = () => {
    return (
        <div className={styles.GlobaleContainer}>
            <div className={styles.container}>
                <form action="">
                    <input type="text" className={styles.codeInput}/>
                    <input type="submit" value="Send" className={styles.SubmitButton}/>
                </form>
            </div>
        </div>
    )
}

export default twofactor;