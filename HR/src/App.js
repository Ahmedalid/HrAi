import logo from "./logo.svg";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
// index.js or App.js
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Component/Navbar/Navbar";
import { I18nextProvider, useTranslation } from "react-i18next";
import Layout from "./Layout/Layout";
import Home from "./Component/Navbar/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import i18n from "./locales/i18n";
import Sidbar from "./Layout/Sidbar";
import Employees from "./employees/Employees";
import Companies from "./companies/Companies";
import Packages from "./packages/Packages";
import Skills from "./skills/Skills.";
import Categories from "./categories/Categories";
import Subscriptions from "./subscriptions/Subscriptions";
import Locations from "./locations/Locations";
import Admins from "./Admins/Admins";
import Settings from "./settings/settings";
import LoginSubmit from "./login/login";
import Register from "./Rejster/Rejster";
import Logout from "./Logout/Logout";
import UserContextProvider, { UserContext } from "./Context/Context";
import { useContext, useEffect } from "react";
import Profile from "./profile/profile";
import UpdateProfaile from "./profile/UpdateProfaile";
import DeleteAccount from "./Layout/DeleteAccount";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
import Subscription from "./Subscription/Subscription";


import { ToastContainer } from 'react-toastify';
import AddJop from "./AddJop/AddJop";
import Allcompanyjobs from "./company/Allcompanyjobs";
import Showjobdetails from "./company/Showjobdetails";
import VeiduoDetails from "./company/VeiduoDetails";
import ForgetPassword from "./Forget/Fortget";
import ChangePassword from "./locations/ChangePassword";
import Example from "./company/pop";
import Allorders from "./company/Allorders";
import ViewCV from "./company/ViewCV";
import Online from "./company/Online";
import { generateToken , messaging} from '../src/firebase';
import Notifications from "./notifications/notifications";
import TestData from "./company/TestData";
import { onMessage } from 'firebase/messaging';
// import { generateToken, messaging } from './firebase';


let routes = createBrowserRouter([
  
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "Navbar", element: <Navbar /> },
      { path: "Sidbar", element: <Sidbar /> },
      { path: "AddJop", element: <AddJop /> },
      { path: "home", element: <Home /> },
      { path: "Employees", element: <Employees /> },
      { path: "Allcompanyjobs", element: <Allcompanyjobs /> },
      { path: "Companies", element: <Companies /> },
      { path: "ChangePassword", element: <ChangePassword /> },
      { path: "Example", element: <Example /> },
      { path: "Showjobdetails/:id", element: <Showjobdetails /> },
      { path: "ViewCV/:id", element: <ViewCV /> },
      { path: "Packages", element: <Packages /> },
      { path: "Skills", element: <Skills /> },
      { path: "VeiduoDetails/:id", element: <VeiduoDetails /> },
      { path: "Categories", element: <Categories /> },
      { path: "Subscriptions", element: <Subscriptions /> },
      { path: "Locations", element: <Locations /> },
      { path: "Allorders", element: <Allorders /> },
      { path: "subscription", element: <Subscription /> },
      { path: "settings", element: <Settings /> },
      { path: "Online/:id", element: <Online /> },
      { path: "LoginSubmit", element: <LoginSubmit /> },
      { path: "login", element: <LoginSubmit /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "Register", element: <Register /> },
      { path: "Logout", element: <Logout /> },
      { path: "profile", element: <Profile /> },
      { path: "DeleteAccount", element: <DeleteAccount /> },
      { path: "UpdateProfaile", element: <UpdateProfaile /> },
      { path: "LanguageSwitcher", element: <LanguageSwitcher /> },
      { path: "notifications", element: <Notifications /> },
      { path: "TestData", element: <TestData /> },
      
    ],
  },
]);

function App() {

  useEffect(()=>{
    generateToken()
    onMessage(messaging , (payload)=>{
console.log(messaging );
    })
    },[])


  return (
    <I18nextProvider i18n={i18n}>
      <UserContextProvider>
      <ToastContainer />
  
        <RouterProvider router={routes}></RouterProvider>
      </UserContextProvider>

      {/* <div className="App"></div> */}
    </I18nextProvider>
  );
}
export default App;
