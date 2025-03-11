import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { baseUri } from "../AdminPanel/Components/api/baseUri";

// firebase Configration
const firebaseConfig = {
    apiKey: "AIzaSyAKd6yeRAGpbmJ_kF4xCuAl165xdn5vz34",
    authDomain: "backend-450304.firebaseapp.com",
    projectId: "backend-450304",
    storageBucket: "backend-450304.firebasestorage.app",
    messagingSenderId: "530809007696",
    appId: "1:530809007696:web:b3e9fc17321eed2705eb55",
  };

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app);

const  FirebaseNotification = () =>{
  const {token:userToken} = useSelector(state => state.authenticate)
  useEffect(()=>{
    regesterServiceWorker()
    requestPermission()
    onMessage(messaging , (payload)=>{
      console.log("📩 Foreground Message received:", payload);
    })
  }, [])

const regesterServiceWorker = async()=>{
  if("serviceWorker" in navigator){
    try{
      const regestration = await navigator.serviceWorker.register('/firebase-messaging-sw.js',{
        type: "module"
      });
      console.log('server worker regesteration successfull' , regestration)
    }catch(error){
      console.log('server worker regesteration failed' ,  error)
    }
  }
}

const requestPermission = async() =>{
  try{
    // const permission = await Notification.requestPermission();
    // if(permission !== "granted")throw new Error("permission not allowed");

    const token = await getToken(messaging , {
      vapidKey:"BOXKKIurvZdRzxPnSik7saJXYY1q1vzpVrfQiW0g8FM2QwBula2y0WGNtsttbZ0Guv8lfoQeWZAu1InVIO5HbLw",
      serviceWorkerRegistration: await navigator.serviceWorker.ready
    })
    let {userId} = jwtDecode(userToken)
    console.log(userId)
    console.log("📲 FCM Token:", token);
    sendTokenToBackend(token,userId)
  }catch(error){
    console.log("error geting fcm token",error)
}
}

async function sendTokenToBackend(fcmToken,userId) {
  try {
    // const response = await axios.post("http://localhost:5000/v1/api/notification/store-user-fcmToken-&-userId", {
    const response = await axios.post(`${baseUri}/v1/api/notification/store-user-fcmToken-&-userId`, {
      fcmToken: fcmToken,
      userId:userId
    });

    console.log("✅ FCM Token stored successfully:", response.data);
  } catch (error) {
    console.error("❌ Error sending FCM token to backend:", error.response ? error.response.data : error.message);
  }
}



  return(null)
}

export default FirebaseNotification
