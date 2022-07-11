import type { AppProps } from "next/app";
import { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../components/sideBar";
import Style from "../styles/app.module.css";
import backgrd from "../public/images/cool.png";
import { Provider } from "react-redux";
import store from "../redux/configureStore";
import Login from "../components/login/Login";
import { useRouter } from "next/router";
import io, { Socket } from "socket.io-client";
import axios from "axios";
import AlertNotification from "../components/notification/AlertNotification";
import TokenContextProvider, { TokenContext } from '../contexts/TokenContext'


function MyApp({ Component, pageProps }: AppProps) {
  const array:any = useRef([])
  const [notification, changeNotification] = useState<any>([]);
  const [showSidBar, setShowSidBar] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [socket, changeSocket] = useState<Socket>()
  const [userInfo, setUserInfo] = useState<any>();
  const [showContent, setShowContent] = useState<boolean>(false);
  const router = useRouter();

  {/*Get AcessToken And refreshToken*/}
  useEffect(() => {

  });

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.margin = "0";
    document.getElementsByTagName("body")[0].style.width = "100%";
    document.getElementsByTagName("body")[0].style.height = "100%";
  });
  useEffect(() => {
    let socketOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, //'Bearer h93t4293t49jt34j9rferek...'
          },
        },
      },
      transports: ["websocket"],
      auth: {
        Authorization: `${localStorage.getItem("accessToken") as string}`,
      },
    };
    changeSocket(io(
      `${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}`,
      socketOptions
    ));
  },[]);
  useEffect(()=>{
    socket?.emit("startChannels");
    socket?.on("notification",(data:any) =>{
      array.current.push({userName:data.userName,type:data.type})
      changeNotification((oldValues:any)=> [...oldValues ,array.current])
      window.setTimeout(() =>{
        array.current.splice(0,1)
        // console.log(array.current)
        changeNotification(array.current)
      },6000)
    })
  },[socket])
  // console.log(notification)
  return (
    <>
        <Provider store={store}>
          <div className={Style.App}>
              {
                notification.map((value:any, key:any) =>
                  <AlertNotification />
                )
              }
              <TokenContextProvider>
                	<Component {...pageProps} socket={socket} user={userInfo} />
            	</TokenContextProvider>
            {typeof window != "undefined" &&
            (window.location.href.split("/")[3] != "game" && window.location.pathname.split("/")[1] != "errorPage" && window.location.pathname.split("/")[1] != "login")? (
              <SideBar
                setShowSidBar={setShowSidBar}
                showSidBar={showSidBar}
                setUpdate={setUpdate}
                update={update}
              />
            ) : (
              ""
            )}
          </div>
        </Provider>
    </>
  );
}

export default MyApp;
