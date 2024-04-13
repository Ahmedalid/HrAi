import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../Context/Context";
import { useTranslation } from "react-i18next";
import {Helmet} from "react-helmet";

const Categories = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("UserToken");
  let { Url} = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      message :""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
      message: Yup.string().required("Required"),

      email: Yup.string()
        // .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const response = await axios.post(
          `${Url}companies/contact-us`,
          {
            name: values.name,
            mobile: values.mobile,
            email: values.email,
            message: values.message,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
          
            },
          }
        );
        console.log(response);
        if(response.data.status == true){
          toast.success(response.data.message , {
            position: 'top-center'
          });
        
        }

        if (response.data.status == false) {
          toast.success("Password changed successfully");
          console.log("Password changed successfully");
        } else {
          // toast.error(`Error: ${response.data.message}`);
          console.error("AhmedError changing password:", response.data.message);
        }
      } catch (error) {
        // toast.error(`Error: ${error.message}`);
        console.error("AhmedError changing password:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    
    <div className="w-75 mx-auto">

<Helmet>
        <meta charSet="utf-8" />
        <title> {t("Contactus")}</title>
      </Helmet>

      <h3 className="fw-bold"> {t("contact")} </h3>
      <form onSubmit={formik.handleSubmit}>
        <label className="fw-bold mt-3">    {t("name")}:   </label>
        
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="form-control w-100 mt-3"
          />
          {formik.touched.name && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
     
        <label className="fw-bold mt-3">      {t("phonenumber")} </label>
     
          <input
            type="tel"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            dir="rtl"
            className="form-control w-100 mt-3 "
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <div>{formik.errors.mobile}</div>
          )}
       
        <label className="fw-bold mt-3">         {t("email")}:</label>
    
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
       
       <label className="fw-bold mt-3">{t("message")}:</label>
<textarea
  type="text"
  name="message"
  value={formik.values.message}
  onChange={formik.handleChange}
  className="w-100 form-control w-100 mt-2"
/>
{formik.touched.message &&
  formik.errors.message && (
    <div>{formik.errors.message}</div>
  )}

        
 
        <button type="submit" disabled={formik.isSubmitting} className="border-radius btn  mt-3">
          {formik.isSubmitting ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Categories;
