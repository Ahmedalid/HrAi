import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../Context/Context";
import { useTranslation } from "react-i18next";
import {Helmet} from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const ChangePassword = () => {
    let navegat =  useNavigate()
  const token = localStorage.getItem("UserToken");
  const { t } = useTranslation();
  let { Url} = useContext(UserContext)
  const [data, setdata] = useState([])
  const formik = useFormik({
    initialValues: {
      email: "",

    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),

    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const response = await axios.post(
          `${Url}companies/send-code`,
          {
            email: values.email,

          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.errors.email , "response");
        setdata(response.data)

        if (response.data.status) {
          toast.success("Password changed successfully");
          navegat("/Locations")
          console.log("Password changed successfully");
        } else {
          toast.error(`Error: ${data.errors.email}`);
          console.error("Error changing password:", response.data.message);
        }
      } catch (error) {
        toast.error(`Err000or: ${data.errors.email}`);
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

  {data?.errors?.email ?     <div className="alert alert-danger">{data?.errors?.email}</div>:""}

    <h2 className="mt-5">{t("changepassword")}</h2>
      <form onSubmit={formik.handleSubmit}>
        <label className="fw-bold mt-3">  {t("email")}  </label>
        
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="form-control w-100 mt-3"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="alert alert-danger">{formik.errors.email}</div>
          )}
     
        
 
        <button type="submit" disabled={formik.isSubmitting} className="border-radius btn  mt-3">
          {formik.isSubmitting ?       <Spinner color="success" aria-label="Success spinner example" /> : "Send Code"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
