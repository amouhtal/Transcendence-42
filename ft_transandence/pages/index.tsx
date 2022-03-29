import Router, { useRouter } from "next/router"

function Home (){
    const router = useRouter();
    // componentDidMount= () => {
    //     router.push("/home");
    // }
    return (
        <div>
            Hello im in index
        </div>
    )
}

export default Home