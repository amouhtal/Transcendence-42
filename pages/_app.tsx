
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import SidePar from '../components/sideBar'
import  Style  from '../styles/app.module.css'
import backgrd from '../public/images/cool.png'

function MyApp({ Component, pageProps }: AppProps) {
  const [isConnect, changeStatus] = useState(true)

  useEffect(()=>{
    document.getElementsByTagName("body")[0].style.margin = "0"
    // document.getElementsByTagName("body")[0].style.backgroundImage = '/cool.png';
    document.getElementsByTagName("body")[0].style.width = "100%"
    document.getElementsByTagName("body")[0].style.height = "100%"
  })

  return (
    <>
    {
      isConnect ? 
        <div className={Style.App}>
            <Component {...pageProps}/>
            <SidePar /> 
        </div>
        :
        <>
          <div>is not Connected</div>
          <input type="button" value="change" onClick={() => changeStatus(true)}/>
        </>
    }
    </>
  )
}

export default MyApp
