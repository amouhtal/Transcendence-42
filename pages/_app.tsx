
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import  Style  from '../styles/app.module.css'
import backgrd from '../public/images/cool.png'
import { Provider } from 'react-redux'
import  store  from '../redux/configureStore'
import Login from '../components/login/Login'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const [isConnect, changeStatus] = useState(true)
  const [showSidBar, setShowSidBar] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false)
  const router = useRouter();
  useEffect(()=>{
    document.getElementsByTagName("body")[0].style.margin = "0"
    document.getElementsByTagName("body")[0].style.width = "100%"
    document.getElementsByTagName("body")[0].style.height = "100%"
  })
  useEffect(() => {
    console.log("im here in fjdklsfjsdkl",localStorage.getItem("accessToken"));
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === "undefined")
      {
        console.log("im in localStorage")
        setShowSidBar(true);
        router.push("/login");
      }
      else
        setShowSidBar(false);
    }
  },[update])
  return (
    <>
    {
      isConnect ? 
        <Provider store={store}>
          <div className={Style.App}>
              <Component {...pageProps}/>
              <SideBar setShowSidBar={setShowSidBar} showSidBar={showSidBar} setUpdate={setUpdate} update={update}/> 
          </div>
        </Provider>
        :
        <>
          <div className={Style.App}>
          </div>
        </>
    }
    </>
  )
}

export default MyApp
