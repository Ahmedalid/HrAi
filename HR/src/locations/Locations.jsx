import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../Context/Context";
import { useTranslation } from "react-i18next";
import {Helmet} from "react-helmet";
import { Spinner } from "react-bootstrap";

const Locations = () => {
  const token = localStorage.getItem("UserToken");
  const { t } = useTranslation();
  let { Url} = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      code: "",
      password: "",
      password_confirmation: "",
      email:""
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const response = await axios.post(
          `${Url}companies/change-password`,
          {
            code: values.code,
            password: values.password,
            password_confirmation: values.password_confirmation,
            email: values.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.status) {
          toast.success("Password changed successfully");
          console.log("Password changed successfully");
        } else {
          toast.error(`Error: ${response.data.message}`);
          console.error("Error changing password:", response.data.message);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
        console.error("Error changing password:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-75 mx-auto">

<Helmet>
        <meta charSet="utf-8" />
        <title>  {t("changePassword")}
 </title>
      </Helmet>

    <h2>{t("changepassword")}</h2>
      <form onSubmit={formik.handleSubmit}>
        <label className="fw-bold mt-3"> code </label>
        
          <input
            type="text"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            className="form-control w-100 mt-3"
          />
          {formik.touched.code && formik.errors.code && (
            <div>{formik.errors.code}</div>
          )}
     
        <label className="fw-bold mt-3">   {t("newpassword")} </label>
     
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="form-control w-100 mt-3"
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
       
        <label className="fw-bold mt-3">    {t("retypepassword")}</label>
    
          <input
            type="password"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            className="w-100 form-control w-100 mt-2"
          />
          {formik.touched.password_confirmation &&
            formik.errors.password_confirmation && (
              <div>{formik.errors.password_confirmation}</div>
            )}
       
        <label className="fw-bold mt-3">    {t("email")}</label>
    
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-100 form-control w-100 mt-2"
          />
          {formik.touched.email &&
            formik.errors.email && (
              <div>{formik.errors.email}</div>
            )}
        
 
        <button type="submit" disabled={formik.isSubmitting} className="border-radius btn  mt-3">
          {formik.isSubmitting ?       <Spinner color="success" aria-label="Success spinner example" /> : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Locations;
