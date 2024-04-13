// Context.jsx
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const { t, i18n } = useTranslation();
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isTextVisible, setTextVisible] = useState(true);
  const [isCol11, setIsCol11] = useState(false);
  const [setData, setsetData] = useState([])
  const [isButtonPressedd, setButtonPressedd] = useState(false);
  const [isTextVisiblee, setTextVisiblee] = useState(true);
  const [Token, setToken] = useState([])


  const changeLanguage = (newLanguage) => {
    // Implement language change logic here if needed
    // console.log(`Changing language to ${newLanguage}`);
  };

  const handleChangeLanguage = (newLanguage) => {
    changeLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };


  const [dataas, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [company_name, setcompany_name] = useState([])
  useEffect(() => {
    async function fetchSettings() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(`https://aihr.ahlanuof.com/api/companies/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(dataas, "resp00ahmed0onse");
        setdata(response?.data?.data?.length);
        // console.log(response.data.data.length);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    }

    fetchSettings();
  }, []);
  useEffect(() => {
    async function fetchSettings() {
      try {
        const token = localStorage.getItem('UserToken');
        
        const response = await axios.get(`https://aihr.ahlanuof.com/api/companies/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response?.data?.data?.company_name , "Ahneddd");
        setcompany_name(response)

        setsetData(response);
      } catch (error) {
        setsetData(false); 
      }
    
    }

    fetchSettings();
  }, []);

  const handleToggleCol = () => {
    setIsCol11(!isCol11);
  };

  const handleIconClick = () => {
    setButtonPressed(true);
  };

  const handleButtonClick = () => {
    setButtonPressed(!isButtonPressed);
    setTextVisible(!isTextVisible);
  };

  const handleToggleColl = () => {
    setIsCol11(!isCol11);
  };

  const handleIconClickk = () => {
    setButtonPressedd(true);
  };

  const handleButtonClickk = () => {
    setButtonPressedd(!isButtonPressedd);
    setTextVisiblee(!isTextVisiblee);
  };





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
   const messaging = getMessaging(app);
  
   const getrteToken = async () => {
    const permission = await Notification.requestPermission();
    // console.log(permission);
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BFmiMH6tZv4A7JzfusKgYTAVaO8gKlzsTcWWzvBHTgIcHvAlgScHndKbwtohFC_8_BACL-B4jSgIVJ7NbGjg_h4"
      });
      setToken(token)
      // setToken()
    }
  }
      // console.log(Token );
  
  getrteToken()


  return (
    <UserContext.Provider
      value={{
        Url: `https://aihr.ahlanuof.com/api/`,
        changeLanguage,
        handleChangeLanguage,
        isButtonPressed,
        handleIconClick,
        handleButtonClick,
        isTextVisible,
        handleToggleCol,
        dataas,
        setData,
        company_name,
        Token
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
