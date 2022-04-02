
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import SidePar from '../components/sidePar'
import  Style  from '../styles/app.module.css'
// import { Provider as AuthProvider } from 'next-auth/client'
function MyApp({ Component, pageProps }: AppProps) {
  const [isConnect, changeStatus] = useState(true)

  useEffect(()=>{
    document.getElementsByTagName("body")[0].style.margin = "0"
    document.getElementsByTagName("body")[0].style.backgroundColor = "#C7D1D2"
    document.getElementsByTagName("body")[0].style.width = "100wh"
    document.getElementsByTagName("body")[0].style.height = "100vh"
  })

  return (
    // <AuthProvider session={pageProps.session}>
    <>
    {
      isConnect ? 
      <div className={Style.App}>
            <SidePar />
              <Component {...pageProps} className={Style.component}/>
        </div>
        :
        <>
          <div>is not Connected</div>
          <input type="button" value="change" onClick={() => changeStatus(true)}/>
        </>
    }
    </>
    // </AuthProvider>
  )
}

export default MyApp
