import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";
import DeleteAccount from './DeleteAccount';
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isTextVisible, setTextVisible] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  const { Url } = useContext(UserContext);
  let navigate = useNavigate();
  const [isCol11, setIsCol11] = useState(false);

  const toggleTextVisibility = () => {
    setTextVisible(!isTextVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("UserToken");
    navigate("/login");
  };

  const handleButtonClickk = (buttonName) => {
    setActiveButton((prevActiveButton) => (prevActiveButton === buttonName ? null : buttonName));
  };

  return (

    <div className="cursor-pointer ">  
    {/* ---------------------------------------- */}
    <div
  className={`hoverNav text-center mt-2 d-center ${activeButton === 'home' ? 'active-button ' : ''}`}
  onClick={() => handleButtonClickk('home')}
>
  <div className={`pt-2 w-100 ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
    <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'home' ? 'active-button text-white' : ''}`} to={`./home`}>
     
      <p className="w-25 icon">
        <i className="fa-solid fa-house"></i>
      </p>
      <p className="w-75">{isTextVisible && t(`homepage`)}</p>
    </Link>
  </div>
</div>
<div
  className={`hoverNav text-center mt-2 d-center ${activeButton === 'allCompanyJobs' ? 'active-button' : ''}`}
  onClick={() => handleButtonClickk('allCompanyJobs')}
>
  <div className={`pt-2 w-100 ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
  <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'allCompanyJobs' ? 'active-button text-white' : ''}`} to={`./Allcompanyjobs`}>
      <p className="w-25 icon">
        {" "}
        <i className="fa-solid fa-calendar-days"></i>
      </p>
      <p className="w-75 ">
        {isTextVisible && t(`interviews`)}
      </p>
    </Link>
  </div>
</div>
<div
  className={`hoverNav text-center mt-2 d-center ${activeButton === 'Allorders' ? 'active-button ' : ''}`}
  onClick={() => handleButtonClickk('Allorders')}
>
  <div className={`pt-2 w-100 ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
    <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'Allorders' ? 'active-button text-white' : ''}`} to={`./Allorders`}>
     
      <p className="w-25 icon">
      <i class="fa-brands fa-rebel"></i>
      </p>
      <p className="w-75">{isTextVisible && t(`allorders`)}</p>
    </Link>
  </div>
</div>
      {/* --------------------------- */}
    {/* ---------------------------------------- */}
    <div
  className={`hoverNav text-center mt-2 d-center ${activeButton === 'employees' ? 'active-button' : ''}`}
  onClick={() => handleButtonClickk('employees')}
>
  <div className={`pt-2 w-100 ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
    <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'employees' ? 'active-button text-white' : ''}`} to={`./Employees`}>
      <p className="w-25 icon">
        <i className="fa fa-users" aria-hidden="true"></i>
      </p>
      <p className="w-75">{isTextVisible && t(`subscription`)}</p>
    </Link>
  </div>
</div>

    <div
  className={`hoverNav text-center mt-2 d-center ${activeButton === 'packages' ? 'active-button' : ''}`}
  onClick={() => handleButtonClickk('packages')}
>
  <div className={`pt-2 w-100 ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
  <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'packages' ? 'active-button text-white' : ''}`} to={`./notifications`}>
      <p className="w-25 icon">
        {" "}
        <i class="fa-solid fa-bell"></i>
      </p>
      <p className="w-75 ">
        {isTextVisible && t(`notifications`)}
      </p>
    </Link>
  </div>
</div>


      <div
  className={`hoverNav text-center mt-2 d-center ${activeButton === 'categories' ? 'active-button' : ''}`}
  onClick={() => handleButtonClickk('categories')}
>
  <div className={`pt-2 w-100 ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
  <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'categories' ? 'active-button text-white' : ''}`} to={`./Categories`}>
      <p className="w-25 icon">
        <i className="fa-solid fa-shapes"></i>
      </p>
      <p className="w-75 ">
        {isTextVisible && t(`contact`)}
      </p>
    </Link>
  </div>
</div>
      {/* --------------------------- */}
    {/* ---------------------------------------- */}
    <div
  className={`hoverNav text-center mt-2 d-center ${activeButton === 'subscriptions' ? 'active-button' : ''}`}
  onClick={() => handleButtonClickk('subscriptions')}
>
  <div className={`pt-2 w-100 ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
  <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'subscriptions' ? 'active-button text-white' : ''}`} to={`./Subscriptions`}>
      <p className="w-25 icon">
        <i className="fa-solid fa-hand-scissors"></i>
      </p>
      <p className="w-75 ">
        {isTextVisible && t(`aboutus`)}
      </p>
    </Link>
  </div>
</div>
      {/* --------------------------- */}
    {/* ---------------------------------------- */}
    {/* <div
  className={`hoverNav text-center mt-2 d-center ${activeButton === 'locations' ? 'active-button' : ''}`}
  onClick={() => handleButtonClickk('locations')}
>
  <div className={`pt-2 w-100 ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
  <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'locations' ? 'active-button text-white' : ''}`} to={`./ChangePassword`}>
      <p className="w-25 icon">
        <i className="fa-solid fa-map-location"></i>
      </p>
      <p className="w-75 ">
        {isTextVisible && t(`changepassword`)}
      </p>
    </Link>
  </div>
</div> */}
      {/* --------------------------- */}
    {/* ---------------------------------------- */}
    <div
  className={`hoverNav text-center mt-2 d-center ${activeButton === 'subscription' ? 'active-button' : ''}`}
  onClick={() => handleButtonClickk('subscription')}
>
  <div className={`pt-2 w-100 ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
  <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'subscription' ? 'active-button text-white' : ''}`} to={`./subscription`}>
      <p className="w-25 icon">
      <i class="fa fa-certificate" aria-hidden="true"></i>
      </p>
      <p className="w-75 ">
        {isTextVisible && t(`language`)}
      </p>
    </Link>
  </div>
</div>


      {/* --------------------------- */}
    {/* ---------------------------------------- */}
    <div
  className={`hoverNav text-center mt-2 d-center bg-dangerr text-white ${activeButton === 'deleteAccount' ? 'active-button' : ''}`}
  onClick={() => handleButtonClickk('deleteAccount')}
>
  <div className="pt-2 w-100">
  <Link className={`w-100 text-dark d-flex justify-content-between ${activeButton === 'deleteAccount' ? 'active-button text-white' : ''}`}>
      <p className="w-25 icon text-white pt-2">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </p>
      <p className="w-75 font-15">
        {isTextVisible && <DeleteAccount />}
      </p>
    </Link>
  </div>
</div>

<div className="hoverNav text-center mt-2 d-center">
      <div className={`pt-2 w-100 ${isButtonPressed ? 'button-pressed' : ''}`}>
        <Link className="w-100 text-dark d-flex justify-content-between" to="/login" onClick={handleLogout}>
          <p className="w-25 icon">
            <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
          </p>
          <p className="w-75">
            <p className="w-75 ">
              {isTextVisible && t(`logout`)}
            </p>
          </p>
        </Link>
      </div>
    </div>
      {/* --------------------------- */}

   
 


      
    </div>
  );
}
