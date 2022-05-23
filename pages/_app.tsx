
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import  Style  from '../styles/app.module.css'
import backgrd from '../public/images/cool.png'
import { Provider } from 'react-redux'
import  store  from '../redux/configureStore'
import Login from '../components/login/Login'
import { useRouter } from 'next/router'
import io from 'socket.io-client';
import axios from 'axios'

let socket:any;
function MyApp({ Component, pageProps }: AppProps) {
	const [isConnect, changeStatus] = useState(true)
	const [showSidBar, setShowSidBar] = useState<boolean>(false);
	const [update, setUpdate] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<any>()
	const router = useRouter();
	useEffect(()=>{
		document.getElementsByTagName("body")[0].style.margin = "0"
		document.getElementsByTagName("body")[0].style.width = "100%"
		document.getElementsByTagName("body")[0].style.height = "100%"
	})
	useEffect(() => {
	 	// if (typeof window !== 'undefined') {
	    // 	if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === "undefined" || localStorage.getItem("accessToken") === "")
		// 		return;
	    // 	else
		// 	{
			
			let socketOptions = {
				transportOptions: {
					polling: {
						extraHeaders: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`, //'Bearer h93t4293t49jt34j9rferek...'
						}
					}
				},
				transports: ['websocket'],
				auth : {
					Authorization: `${localStorage.getItem("accessToken") as string}`
				}
			};
			socket = io("10.12.11.2:3300",socketOptions);
	// 	}
	// }
		// axios.get('http://10.12.10.3:3000/users/profile',{
        //     headers:{
        //       'Authorization': `Bearer ${localStorage.getItem("accessToken") as string}`
        //     }
        //   }).then((res) =>{
		// 	  console.log(res)
		// 	setUserInfo(res);
        //   })
	},[])
	// useEffect(() => {
	//   if (typeof window !== 'undefined') {
	//     if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === "undefined" || localStorage.getItem("accessToken") === "")
	//       changeStatus(false);
	//     else
	// 		changeStatus(true);
	// }
	// },[update])
	console.log("socket = ",socket)
	console.log("userInfo = ", userInfo?.data?.userInfo)
	return (
	  <>
	  {
	    isConnect ?
	      <Provider store={store}>
	        <div className={Style.App}>
	            <Component {...pageProps} socket={socket} user={userInfo?.data?.userInfo}/>
	            <SideBar setShowSidBar={setShowSidBar} showSidBar={showSidBar} setUpdate={setUpdate} update={update} /> 
	        </div>
	      </Provider>
	      :
		  <Login />
	  }
	  </>
	)
}

export default MyApp
