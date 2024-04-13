// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyB1FHYC1PnJpnQ_YS-8R3o6ulBNlJD13Ak",
  authDomain: "haha-10bcc.firebaseapp.com",
  projectId: "haha-10bcc",
  storageBucket: "haha-10bcc.appspot.com",
  messagingSenderId: "257470577005",
  appId: "1:257470577005:web:e6e13270a13064c9368264",
  measurementId: "G-Y6RWCJ4WGR"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  // console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BFmiMH6tZv4A7JzfusKgYTAVaO8gKlzsTcWWzvBHTgIcHvAlgScHndKbwtohFC_8_BACL-B4jSgIVJ7NbGjg_h4"
    });
    console.log(token);
    // setToken()
  }
}
