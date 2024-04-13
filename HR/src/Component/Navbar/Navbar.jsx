import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Context";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() =>
    localStorage.getItem("language") || "en"
  );
  const navigate = useNavigate();
  const { handleChangeLanguage, company_name } = useContext(UserContext);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    const storedDirection = localStorage.getItem("direction");

    if (storedLanguage && storedLanguage !== currentLanguage) {
      i18n.changeLanguage(storedLanguage, () => {
        handleChangeLanguage(storedLanguage);
        setCurrentLanguage(storedLanguage);
        document.body.dir = storedDirection || "ltr";
      });
    } else if (!storedLanguage && currentLanguage !== "en") {
      const defaultLanguage = "en";
      i18n.changeLanguage(defaultLanguage, () => {
        handleChangeLanguage(defaultLanguage);
        setCurrentLanguage(defaultLanguage);
        document.body.dir = defaultLanguage === "ar" ? "rtl" : "ltr";
      });
    }
  }, [currentLanguage, i18n, handleChangeLanguage]);

  const handleLanguageChange = (newLanguage) => {
    handleChangeLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    const newDirection = newLanguage === "ar" ? "rtl" : "ltr";
    document.body.dir = newDirection;
    localStorage.setItem("language", newLanguage);
    localStorage.setItem("direction", newDirection);
    setCurrentLanguage(newLanguage);
  };

  const handleLogout = () => {
    localStorage.removeItem("UserToken");
    navigate("/login");
  };

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col-6  d-flex  justify-content-start mt-3">
            <div className="d-flex">
              {company_name?.data?.data?.logo && (
                <img
                  src={company_name?.data?.data?.logo}
                  className="w-img"
                  alt=""
                />
              )}
              {company_name?.data?.data?.company_name && (
                <h5 className="fw-bold mx-3 mt-2">
                  {company_name?.data.data?.company_name}
                </h5>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6">
                <div className="d-flex justify-content-between">
                  <Link
                    to={"./profile"}
                    className="mt-3 d-flex fw-bold text-color"
                  >
                    <i className="fa-solid fa-user mt-1"></i>
                    <p className="text-color mx-2">{t("Profile")}</p>
                  </Link>
                  <div className="">
                    <select
                      id="languageSelect"
                      className="form-control bg-color text-white w-74 mt-3 mb-3"
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      value={currentLanguage}
                    >
                      <option value="en">{t("arabic")}</option>
                      <option value="ar">عربي</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border borde-1"></div>
    </>
  );
}
