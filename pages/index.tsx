import Router, { useRouter } from "next/router"
import { useEffect } from "react";

function Home (){
    const route = useRouter();
    console.log(route.query.token)
    console.log(route.query.refreshToken)
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("accessToken",route.query.token as string);
            localStorage.setItem("refreshToken",route.query.refreshToken as string);
            route.query.token = '';
            route.query.refreshToken = '';
        }
    },[route.query.token])
    return (
        <div>
            {/* {route.push('/profile')}; */}
        </div>
    )
}

export default Home