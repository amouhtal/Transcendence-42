import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { Loading, Grid } from "@nextui-org/react";
import styles from '../styles/messages/ChatZone.module.css'

function Home (){
    const route = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        route.push("/home");
    },[])
    return (
        <>
        {
            isLoading ?
            <div className={styles.LoadingContainer}>
                <Grid><Loading type="points" /></Grid>
            </div>
            :
            <div>
            </div>
        }
        </>
    )
}

export default Home