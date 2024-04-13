import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Sidbar from "./Sidbar";

export default function Layout() {
  const navigate = useNavigate();
  const [isCol11, setIsCol11] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const toggleCol11 = () => {
    setIsCol11(!isCol11);
  };

  const handleClick1 = () => {
    console.log("Button 1 clicked");
    // Add functionality for button 1 here
  };

  const handleClick2 = () => {
    console.log("Button 2 clicked");
    // Add functionality for button 2 here
  };

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <>
      {localStorage.getItem("UserToken") !== null ? (
        <Navbar
          toggleCol11={toggleCol11}
          handleClick1={handleClick1}
          handleClick2={handleClick2}
          toggleTextVisibility={toggleTextVisibility} // Pass toggleTextVisibility here
        />
      ) : null}
      <div className="container">
        {/* <button className="btn" onClick={toggleCol11}>{isCol11 ? 'Expand' : 'Collapse'}</button> */}
        {/* <span onClick={toggleTextVisibility}>T</span> */}
        <div className="row mt-2">
          <div className={isCol11 ? "col-1" : "col-2"}>
            {localStorage.getItem("UserToken") !== null ? (
              <div>
                <Sidbar />
              </div>
            ) : null}
          </div>
          <div className={isCol11 ? "col-11" : "col-10"}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
