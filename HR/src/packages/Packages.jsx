import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from "react-i18next";
import {Helmet} from "react-helmet";

export default function Packages() {
  const { Url } = useContext(UserContext);
  // const Navigate = useNavigate()
  const [errorr, seterror] = useState(null);
  const [isLoding, setisLoding] = useState(false);
  const [select, setselect] = useState([]);
  const [addressId, setaddressId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  const [logo, setlogo] = useState(0);

  const [ctedLocationId, selectedLocationId] = useState(0);
  const [IDselect, setIDselect] = useState("");
  const [aress, setaress] = useState([]);
  const [locaionidd, setlocaionidd] = useState(0)
  const [locaionid, setlocaionid] = useState(0);
  // const sendLocationIdToShipping = (selectedLocationId) => {
  //   // تحديث `location_id` في formik
  //   formik.setFieldValue("location_id", selectedLocationId);
  //   setSelectedCityId(""); // Reset selected city when location changes
  // };
  const { t } = useTranslation();
  
  // {console.log(addressId , "   {console.log(selectedLocationId )}   {console.log(selectedLocationId )}   {console.log(selectedLocationId )}   {console.log(selectedLocationId )}")}
  async function onSubmit(values) {
    try {
      const token = localStorage.getItem("UserToken");
  
    
      setisLoding(true);

      // Add the selected city ID to the form values
      


      let { data } = await axios.put(`${Url}companies/profile`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   
      if (data.status === false) {
        setisLoding(false);
        seterror(data.errors);
        // alert("Ahfihweks")
        toast.error(data?.errors?.phone);
        toast.error(data?.errors?.company_name);
        toast.error(data?.errors?.address);
        toast.error(data?.errors?.email);
        toast.error(data?.errors?.user_name)
      } else {
        setisLoding(false);
                // toast.success("Profile updated successfully!");

        // alert
        toast.success(data.message, {
          position: 'top-center'
        })
        // alert("Profile updated successfully!");
      }
  
      seterror(data.errors);
      console.log(data, "SuccessAhmmed ");
      console.log(logo.files[0], "logologologologo");
      console.log(IDselect, "response01111111"  );
      if(data.status === true){
        console.log("Welcome Amed");
        alert("Welcome Amed")
      }
     
  
      if (data.status === false) {
        setisLoding(false);
        seterror(data.errors);
      } else {
        setisLoding(false);
        // Display alert after a successful submission
        alert("Profile updated successfully!");
      }
    } catch (error) {
      setisLoding(false);
      if (error.response) {
        console.error("Server Error:", error.response.data);
        seterror(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        seterror("An error occurred");
      }
    }
  }
  
  

  useEffect(() => {
    async function fetchSettings() {
      try {
        // استرجاع التوكن من localStorage
        const token = localStorage.getItem("UserToken");

        // قم بإضافة التوكن إلى رأس الطلب
        const responsee = await axios.get(`${Url}employees/countries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setselect(responsee?.data.data);

        console.log(select, "responseeresponsee");
        // setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchSettings();
  }, []);

  // Adress
  // ...
  useEffect(() => {
    async function fetchLocations() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(`${Url}employees/countries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setselect(response?.data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

   
  }, []);
  useEffect(() => {
    async function fetchCities() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(`${Url}employees/countries/${locaionidd}/cities`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setaress(response.data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
  
    // Fetch cities whenever locaionidd changes
    if (locaionidd) {
      fetchCities();
    }
  }, [locaionidd]);
  
  // ...

  function validate(value) {
    // Navigate("/Login");
    console.log(value);
  }

  const saudiArabianPhoneNumberPattern = /^\+966[0-9]{9}$/;
  let validationSchema = yup.object({
    user_name: yup
      .string()
      .min(3, "min is 3")
      .max(20, "max is 10")
      .required("not required"),
    email: yup.string().email().required("required"),
    phone: yup
    .string()
    .matches(/^01[0-9]{9}$/, "Invalid Egyptian phone number")
    .required("Phone number is required"),
  
    location_id: yup
      .string()
      .min(1, "min is 3")
      .max(10, "max is 10")
      .required("not required"),
    address: yup.string().required(" required"),
    company_name: yup
      .string()
      .min(3, "min is 3")
      .max(20, "max is 10")
      .required("not required"),
    // main_category_id: yup
    //   .string()
    //   .min(1, "min is 2")
    //   .max(10, "max is 10")
    //   .required("not required10000"),
    prefix: yup
      .string()
      .min(3, "min is 3")
      .max(10, "max is 10")
      .required("not required"),
    // sub_category_id: yup.string().required("not required"),
    logo: yup
      .mixed()
      .test("isImage", "The logo field must be an image", (value) => {
        console.log("File:", value);
        if (!value) return true; // Allow empty values
        return (
          value instanceof File && value.type && value.type.startsWith("image/")
        );
      }),
  });

  // console.log(validationSchema);

  let formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      phone: "",
      lang: "en",
      location_id:"22", // Initialize with an empty string
      sub_category_id: "1",
      device_token: "25662",
      address: "",
      company_name: "",
      main_category_id: "22",
      prefix: "+20",
    },
    validationSchema,
    onSubmit: onSubmit,
  });
  
  return (
    <>

<Helmet>
        <meta charSet="utf-8" />
        <title>Edit profile </title>
      </Helmet>

      <div className="w-75 mx-auto py-5">
        {errorr && errorr.errors && errorr.errors.logo && (
          <div className="alert alert-danger text-dark">
            {errorr.errors.logo}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <h5 className="fw-bold text-center">   {t("editfile")}</h5>
          <label htmlFor="user_name" className="mt-2">
          {t("name")}
          </label>
          <input
            type="text"
            className="form-control mt-2 "
            id="user_name"
            onBlur={formik.handleBlur}
            name="user_name"
            value={formik.values.user_name}
            onChange={formik.handleChange}
          />
          {formik.errors.user_name && formik.touched.user_name ? (
            <div className="alert alert-danger">{formik.errors.user_name}</div>
          ) : (
            ""
          )}
          <label htmlFor="email" className="mt-2">
          {t("email")}
          </label>
          <input
            type="email"
            className="form-control mt-2 "
            id="email"
            onBlur={formik.handleBlur}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="phone" className="mt-2">
          {t("phonenumber")}
          </label>
          <input
            type="tel"
            className="form-control mt-2 "
            id="phone"
            dir="rtl"
            onBlur={formik.handleBlur}
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {/* {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : (
            ""
          )} */}
      
 
          {/* <input type='text' className='form-control mt-2 ' id="address" onBlur={formik.handleBlur} name='address' value={formik.values.address} onChange={formik.handleChange} /> */}
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : (
            ""
          )}
          <label htmlFor="location_id" className="mt-2">
          {t("country")}
          </label>
          <select
  className='form-control mt-2'
  id='location_id'
  onBlur={formik.handleBlur}
  name='location_id'
  
  value={formik.values.location_id}
  
  onChange={(e) => {
    //  تحديث حالة formik
    formik.handleChange("22");

 
    const selectedLocationId = e.target.value;
    // sendLocationIdToShipping(selectedLocationId);
    setlocaionidd(selectedLocationId)
    setlocaionid(e.target.value)
    // {console.log(selectedLocationId )}
  }}
>
  {/* ----------------------------------------------------------------------------------------------------------------- */}
  <option value='' disabled>
    {/* Select a location */}
  </option>
  {select.map((location) => (
    <option key={location.id} value={location.id}>
      {location.name}
    </option>
  ))}
</select>
          {formik.errors.location_id && formik.touched.location_id ? (
            <div className="alert alert-danger">
              {formik.errors.location_id}
            </div>
          ) : (
            ""
          )}
              <label htmlFor="address" className="mt-2">
              {t("city")}
          </label>
          <select
            className="form-control mt-2"
            id="address"
            onBlur={formik.handleBlur}
            name="address"
            value={formik.values.address}
            onChange={(e) => {
              // تحديث حالة formik
              formik.handleChange(e);

          
              const selectedAddressId = e.target.value;
              setaddressId(selectedAddressId);
            }}
          >
            <option value="" disabled>
              Select an address
            </option>
            {aress.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          {formik.errors.address && formik.touched.address ? (
            <div className="alert alert-danger">{formik.errors.address}</div>
          ) : (
            ""
          )}
          <label htmlFor="company_name" className="mt-2">
          {t("company_name")}:
          </label>
          <input
            type="text"
            className="form-control mt-2 "
            id="company_name"
            onBlur={formik.handleBlur}
            name="company_name"
            value={formik.values.company_name}
            onChange={formik.handleChange}
          />
          {formik.errors.company_name && formik.touched.company_name ? (
            <div className="alert alert-danger">
              {formik.errors.company_name}
            </div>
          ) : (
            ""
          )}
          {/* <label htmlFor="main_category_id" className="mt-2">
            main_category_id:
          </label>
          <input
            type="text"
            className="form-control mt-2 "
            id="main_category_id"
            onBlur={formik.handleBlur}
            name="main_category_id"
            value={formik.values.main_category_id}
            onChange={formik.handleChange}
          />
          {formik.errors.main_category_id && formik.touched.main_category_id ? (
            <div className="alert alert-danger">
              {formik.errors.main_category_id}
            </div>
          ) : (
            ""
          )} */}
          {/* <label htmlFor="sub_category_id" className="mt-2">
            sub_category_id:
          </label>
          <input
            type="text"
            className="form-control mt-2 "
            id="sub_category_id"
            onBlur={formik.handleBlur}
            name="sub_category_id"
            value={formik.values.sub_category_id}
            onChange={formik.handleChange}
          />
          {formik.errors.sub_category_id && formik.touched.sub_category_id ? (
            <div className="alert alert-danger">
              {formik.errors.sub_category_id}
            </div>
          ) : (
            ""
          )} */}
          {/* <label htmlFor="prefix" className="mt-2">
            prefix:
          </label>
          <input
            type="text"
            className="form-control mt-2 "
            id="prefix"
            onBlur={formik.handleBlur}
            name="prefix"
            value={formik.values.prefix}
            onChange={formik.handleChange}
          />
          {formik.errors.prefix && formik.touched.prefix ? (
            <div className="alert alert-danger">{formik.errors.prefix}</div>
          ) : (
            ""
          )} */}

          <button
            disabled={!formik.isValid && formik.dirty}
            className="btn btn-add-card mt-4 w-100 border-radius p-8"
            type="submit"
          >
         {t("editfile")}
          </button>
       
        </form>
      </div>
    </>
  );
}
