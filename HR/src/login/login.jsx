import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserContext } from "../Context/Context";
// import { getDeviceToken } from "react-device-detect";
export default function LoginSubmit() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // let { Url , Token } = useContext(UserContext);
  const [data, setdate] = useState([]);
  const [deviceToken, setDeviceToken] = useState("");
// console.log(getDeviceToken);
  const { handleChangeLanguage, isButtonPressed, isTextVisible ,Url , Token} =
    useContext(UserContext);
// console.log(Token);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleLanguageChange = (newLanguage) => {
    // console.log('Changing language to:', newLanguage);

    handleChangeLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);

    // Set text direction based on the language
    document.body.dir = newLanguage === "ar" ? "rtl" : "ltr";

    // Save selected language and direction in local storage
    localStorage.setItem("language", newLanguage);
    localStorage.setItem("direction", document.body.dir);

    // console.log('Language and direction saved to local storage');
  };
  useEffect(() => {
    if (!isLoading) {
      formik.setValues({
        ...formik.values,
        device_token: Token || "",
      });
    }
  }, [Token, isLoading]);
  

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    const storedDirection = localStorage.getItem("direction");

    if (storedLanguage && storedLanguage !== currentLanguage) {
      // Use the i18n.changeLanguage callback to make sure the language is set before updating the direction
      i18n.changeLanguage(storedLanguage, () => {
        handleChangeLanguage(storedLanguage);
        setCurrentLanguage(storedLanguage);

        // Set text direction based on the stored direction
        document.body.dir = storedDirection || "ltr";
      });
    } else if (!storedLanguage && currentLanguage !== "en") {
      // If no language is stored, set the default language and direction based on the user's preference
      const defaultLanguage = "en"; // Change this to your default language
      i18n.changeLanguage(defaultLanguage, () => {
        handleChangeLanguage(defaultLanguage);
        setCurrentLanguage(defaultLanguage);

        // Set text direction based on the default language
        document.body.dir = defaultLanguage === "ar" ? "rtl" : "ltr";
      });
    }
  }, [i18n, currentLanguage, handleChangeLanguage, setCurrentLanguage]);

  // let {setUserToken , setUserData , BasUrl3 , en} = useContext(UserContext)
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  async function handleLoginSubmit(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${Url}companies/login`, values);
      console.log(data, "Success01010101");
      setdate(data);

      if (data.status === true) {
        const storedUserToken = localStorage.getItem("UserToken");
        localStorage.setItem("UserToken", data?.data.token);
        navigate("/");
      } else {
        setIsLoading(false);
        setError(data.errors || {}); // Set error to data.errors or an empty object
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.error("Server Error:", error.response.data);
        setError(error.response.data.errors || {}); // Set error to server response errors or an empty object
      } else {
        console.error("Error:", error.message);
        setError({ message: "An error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  }

  function validate(values) {
    console.log(values); // Log form values
  }

  // const saudiArabianPhoneNumberPattern = /^\+966[0-9]{9}$/;

  // Update the validationSchema to match the form fields
  let validationSchema = yup.object({
    email: yup.string().required("Email number is required"), // Change 'phone' to 'email'
    password: yup.string().required("Password is required"),
    // device_token: yup.string().required("Device token is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "", // Change 'phone' to 'email'
      password: "",
      device_token: Token?Token:"" // Include the device token in initialValues
    },
    validationSchema,
    onSubmit: handleLoginSubmit,
  });

  return (
    <>
      <select
        id="languageSelect"
        className="form-control bg-color text-white w-74 mt-3 mb-3"
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={currentLanguage}
      >
        <option value="en">{t("arabic")}</option>
        <option value="ar">{t("english")}</option>
      </select>

      <div className="row mt-50">
        <div className="col-1"></div>

        <div className="col-8">
        <div className="w-100 ">
          <div className="w-100 ">
            {/* Update this part to handle displaying specific error messages */}
            {error && error.email && (
              <div className="alert alert-danger">{error.email}</div>
            )}
            {error && error.password && (
              <div className="alert alert-danger">{error.password}</div>
            )}
            {error && error.device_token && (
              <div className="alert alert-danger">{error.device_token}</div>
            )}

            {/* ... other JSX ... */}
          </div>
          <form onSubmit={formik.handleSubmit}>
            <h5 className="fw-bold text-center"> {t("login")} </h5>

            <input
              type="tel"
              className="form-control mt-2 w-100 d-r mt-5"
              id="email"
              onBlur={formik.handleBlur}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter your email "
            />
            {formik.errors.email && formik.touched.email && (
              <div className="alert alert-danger">{formik.errors.email}</div>
            )}

            <input
              type="password"
              dir="ltr"
              className="form-control mt-2 w-100"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="current-password" // Add this line
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="alert alert-danger">{formik.errors.password}</div>
            )}

            {isLoading ? (
              <button className="btn bg-main btn-add-card mt-2" type="button">
                <button className="btn bg-color btn-add-card ">
                  <i className="fas fa-spinner fa-spin text-white"></i>
                </button>
              </button>
            ) : (
              <div className="text-center mt-2">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  className="btn btn-add-card  my-auto border-radius mt-3 w-50 p-8 btn-hoverlogin"
                  type="submit"
                >
                  {" "}
                  {t("login")}
                </button>
              </div>
            )}

            <div className="d-center flex-column">
              <div className="d-flex mt-3 justify-content-between">
                <p className="mx-3 mt-3">{t("registerr")} ?</p>
                <Link to={"/Register"} className="mt-3">
                  {t("registerr")}
                </Link>
                <Link
                  className={` text-dark  mt-3 mx-5`}
                  to={`/ChangePassword`}
                >
                  <p className=" text-danger ">{t(`changepassword`)}</p>
                </Link>
              </div>
            </div>
          </form>
        </div>
        </div>

      
        <div className="col-1"></div>
      </div>
    </>
  );
}
