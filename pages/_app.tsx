
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
import { access } from 'fs'

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
			socket = io("10.12.10.4:3300",socketOptions);
	// 	}
	// }
	//   if (typeof window !== 'undefined') {
	//     if (localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== "undefined" && localStorage.getItem("accessToken") !== '')
	// 	axios.get('http://10.12.10.3:3000/users/profile',{
    //         headers:{
    //           'Authorization': `Bearer ${localStorage.getItem("accessToken") as string}`
    //         }
    //       }).then((res) =>{
	// 		  console.log(res)
	// 		setUserInfo(res);
    //       })
	// 	}
	},[])
	useEffect(() => {
        console.log("im hereerere");
        if (localStorage.getItem("accessToken") !== "undefined" && localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== '')
          axios.post('http://10.12.11.3:3000/users/profile',null,{
              headers:{
                'Authorization': `Bearer ${localStorage.getItem("accessToken") as string}`
              }
            }).then((res) =>{
              setUserInfo(res.data.userInfo);
            })
      }, [])
	// useEffect(() => {
	//   if (typeof window !== 'undefined') {
	//     if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === "undefined" || localStorage.getItem("accessToken") === '')
	// 	{
	// 		router.push("/login")
	// 		changeStatus(false);
	// 	}
	//     else
	// 	{
	// 		// router.push("/home")
	// 		changeStatus(true);
	// 	}
	// }
	// },[])
	console.log("socket = ",socket)
	console.log("userInfo = ", userInfo?.data?.userInfo)
	return (
	  <>
	  {
		  <Provider store={store}>
			<div className={Style.App}>
	            <Component {...pageProps} socket={socket} user={userInfo}/>
				{
					typeof window != "undefined" &&
					window.location.href.split('/')[3] != "game" ?
					<SideBar setShowSidBar={setShowSidBar} showSidBar={showSidBar} setUpdate={setUpdate} update={update} /> 
					:
					""
				}
	        </div>
			</Provider>
		}
	  </>
	)
}

export default MyApp
