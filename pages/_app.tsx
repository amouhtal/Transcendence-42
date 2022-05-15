
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import  Style  from '../styles/app.module.css'
import backgrd from '../public/images/cool.png'
import { Provider } from 'react-redux'
import  store  from '../redux/configureStore'
import Login from '../components/login/Login'

function MyApp({ Component, pageProps }: AppProps) {
  const [isConnect, changeStatus] = useState(true)

  useEffect(()=>{
    document.getElementsByTagName("body")[0].style.margin = "0"
    document.getElementsByTagName("body")[0].style.width = "100%"
    document.getElementsByTagName("body")[0].style.height = "100%"
  })

  return (
    <>
    {
      isConnect ? 
        <Provider store={store}>
          <div className={Style.App}>
              <Component {...pageProps}/>
              <SideBar /> 
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
