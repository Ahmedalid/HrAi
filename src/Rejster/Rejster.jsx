import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t , i18n} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  let { Url , Token} = useContext(UserContext)

// console.log(Token);
  // ----------------------------------------------------------------


  const { handleChangeLanguage, isButtonPressed, isTextVisible } =
    useContext(UserContext);

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

  // ----------------------------------------------------------------

  let Navigate = useNavigate()
  const [errorr, seterror] = useState(null)
  const [isLoding, setisLoding] = useState(false)
  const [select, setselect] = useState([]);
  const [addressId, setaddressId] = useState([])
  const [locaionidd, setlocaionidd] = useState([])
const [ctedLocationId , selectedLocationId]=useState([])
const [IDselect , setIDselect] = useState("")
const [Categories, Setcategories] = useState([])
const [aress, setaress] = useState([])
const [main_category_id, setmain_category_id] = useState([])
const [selectid, setselectid] = useState(0)
// const [locaionidd, setlocaionidd] = useState(0)
const [locaionid, setlocaionid] = useState(0);
const sendLocationIdToShipping = (selectedLocationId) => {
  // You can add your logic here to handle the selected location ID
  // console.log('Selected Location ID:', selectedLocationId);
  setIDselect(selectedLocationId);
  // Perform any additional actions based on the selected location ID
};


async function onSubmit(values) {
  try {
    setIsLoading(true); // تعيين isLoading إلى true في بداية عملية التسجيل
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    let { data } = await axios.post(`${Url}companies/register`, formData);
    seterror(data.errors);
    console.log(data, "response01111111");
    if (data.status === true) {
      Navigate("/Login");
      toast.success(data.message, {
        position: 'top-center'
      });
    } else {
      // يمكنك إلغاء تعيين isLoading هنا في حالة حدوث خطأ
      setIsLoading(false);
    }
  } catch (error) {
    // يمكنك إلغاء تعيين isLoading هنا في حالة حدوث خطأ
    setIsLoading(false);
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
// console.log(errorr);

  useEffect(() => {
    async function fetchSettings() {
      try {
        // استرجاع التوكن من localStorage
        const token = localStorage.getItem('UserToken');
        
        // قم بإضافة التوكن إلى رأس الطلب
        const responsee = await axios.get(`${Url}employees/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setselect(responsee?.data.data)
        // console.log(responsee.data.data , "ahmedd");
      
      } catch (error) {
        console.error('Error fetching  data:', error);
      }
    }

    fetchSettings();
  }, []);
  

console.log(isLoading);
  // Adress
// ...


useEffect(() => {
  async function fetchLocations() {
    try {
      const token = localStorage.getItem('UserToken');
      const response = await axios.get(`${Url}employees/countries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      selectedLocationId(response?.data.data);
      // console.log(ctedLocationId , "ctedLocationIdctedLocationIdctedLocationIdctedLocationId ");
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }



  fetchLocations();
  // fetchCities();
}, []);
// -------------------------------------------------------------
useEffect(() => {
  async function fetchLocations() {
    try {
      const token = localStorage.getItem('UserToken');
      const response = await axios.get(`${Url}employees/categories?main_id=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setmain_category_id(response?.data.data);
      console.log(response?.data?.data , "main_category_id");
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }

// console.log(Categories , "CategoriesCategoriesCategoriesCategories");

  fetchLocations();
  // fetchCities();
}, []);

// ...
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

  
  function validate(value) {
    // Navigate("/Login");
    console.log(value);
  }

  useEffect(() => {
    if (!isLoading) {
      formik.setValues({
        ...formik.values,
        device_token: Token || "",
      });
    }
  }, [Token, isLoading]);

  const saudiArabianPhoneNumberPattern = /^\+966[0-9]{9}$/;
  let validationSchema = yup.object({
    user_name: yup.string().min(3, "min is 3").max(20, "max is 20").required("not required"),
    password: yup.string().required("required"),
    email:  yup.string().email().required("required"),
    phone: yup.string().matches(/[0-9]{5,13}/, "phone is not required").required(),
    location_id: yup.string().required(),
    address: yup.string().required("العنوان مطلوب"),
    company_name: yup.string().min(3, "min is 3").max(20, "max is 20").required("not required"),
    main_category_id: yup.string().min(1, "min is 2").max(10, "max is 10").required("not required"),
    prefix: yup.string().min(3, "min is 3").max(10, "max is 10").required("not required"),
    sub_category_id: yup.string().required("not required"),
    logo: yup.mixed(),
    // device_token: yup.string(),
  })

  let formik = useFormik({
    initialValues: {
      user_name: "",
      password: "",
      email: "",
      phone: "",
      logo: "", 
      lang:"en",
      location_id: "",
      sub_category_id: "", // إضافة هذا السطر
      device_token: Token?Token:"" ,// Include the device token in initialValues
      address: "",
      company_name: "",
      main_category_id: "",
      prefix: "+20",
    }, validationSchema,
    onSubmit: onSubmit
  })

  return <>
    <div className='w-75 mx-auto py-5'>

    <select
        id="languageSelect"
        className=" bg-color text-white w-74 mt-3 mb-3 border-0 p-2 mx-2"
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={currentLanguage}
      >
        <option value="en">{t("arabic")}</option>
        <option value="ar">{t("english")}</option>
      </select>


      {errorr ? <div className='alert alert-danger'>{errorr.logo}</div> : ""}
      {errorr ? <div className='alert alert-danger'>{errorr.phone}</div> : ""}

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <h5 className='fw-bold text-center'>     {t("reateaccount")}  </h5>

        <label htmlFor='user_name' className='mt-2'>{t("name")} :</label>
        <input type='text' className='form-control mt-2 ' id="user_name" onBlur={formik.handleBlur} name='user_name' value={formik.values.user_name} onChange={formik.handleChange} />
        {formik.errors.user_name && formik.touched.user_name ? <div className='alert alert-danger'>{formik.errors.user_name}</div> : ""}

        <label htmlFor='email' className='mt-2'> {t("email")} :</label>
        <input type='email' className='form-control mt-2 ' id="email" onBlur={formik.handleBlur} name='email' value={formik.values.email} onChange={formik.handleChange} />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}

        <label htmlFor='phone' className='mt-2'> {t("phonenumber")} :</label>
        <input type='tel' className='form-control mt-2 ' dir='rtl' id="phone" onBlur={formik.handleBlur} name='phone' value={formik.values.phone} onChange={formik.handleChange} />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}

        <label htmlFor='password' className='mt-2'> {t("passwor")} :</label>
        <input type='password' className='form-control mt-2 ' id="password" onBlur={formik.handleBlur} name='password' value={formik.values.password} onChange={formik.handleChange} />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}


        <label htmlFor='main_category_id' className='mt-2'>
        {t("country")} 
</label>
<div className='select-container'>
  <span className='select-icon'>&#9660;</span>
  <select
    className='form-control mt-2'
    id='main_category_id'
    onBlur={formik.handleBlur}
    name='main_category_id'
    value={locaionidd}
    onChange={(e) => {
      // تحديث حالة formik
      formik.handleChange(e);

      // إرسال القيمة إلى وظيفة أو API الخاصة بك
      const selectedLocationId = e.target.value;
      setlocaionidd(selectedLocationId);
    }}
  >
    <option value='' disabled>
      {t("selectacity")}
    </option>
    {ctedLocationId?.map((location) => (
      <option key={location.id} value={location.id}>
        {location.name}
      </option>
    ))}
  </select>
</div>




{/* <i className="fas fa-chevron-down"></i> */}

{formik.errors.main_category_id && formik.touched.main_category_id ? (
  <div className='alert alert-danger'>{formik.errors.main_category_id}</div>
) : (
  ''
)}
{/* ---------------------------------------------------------------------------------؟ */}

{/* ------------------------------------------------ */}

<label htmlFor='location_id' className='mt-2'>
{t("city")} :
</label>
<div className='select-container'>
  <select
    className='form-control mt-2'
    id='location_id'
    onBlur={formik.handleBlur}
    name='location_id'
    value={formik.values.location_id}
    onChange={(e) => {
      // تحديث حالة formik
      formik.handleChange(e);

      const selectedAddressId = e.target.value;
      setaddressId(selectedAddressId);
    }}
  >
    <option value='' disabled>
      {t("selectacity")}
    </option>
    {aress.map((location) => (
      <option key={location.id} value={location.id}>
        {location.name}
      </option>
    ))}
  </select>
  <span className='select-icon'>&#9660;</span>
</div>

{formik.errors.location_id && formik.touched.location_id ? (
  <div className='alert alert-danger'>{formik.errors.location_id}</div>
) : (
  ''
)}



    
    
        <label htmlFor='company_name' className='mt-2'> {t("company_name")} :</label>
        <input type='text' className='form-control mt-2 ' id="company_name" onBlur={formik.handleBlur} name='company_name' value={formik.values.company_name} onChange={formik.handleChange} />
        {formik.errors.company_name && formik.touched.company_name ? <div className='alert alert-danger'>{formik.errors.company_name}</div> : ""}

    
    
        {/* <label htmlFor='main_category_id' className='mt-2'>main_category_id:</label>
        <input type='text' className='form-control mt-2 ' id="main_category_id" onBlur={formik.handleBlur} name='main_category_id' value={formik.values.main_category_id} onChange={formik.handleChange} />
        {formik.errors.main_category_id && formik.touched.main_category_id ? <div className='alert alert-danger'>{formik.errors.main_category_id}</div> : ""} */}
<label htmlFor='address' className='mt-2'>
  المجال:
</label>
<div className='select-container'>
      <select
        className='form-control mt-2'
        id='address'
        onBlur={formik.handleBlur}
        name='address'
        value={formik.values.address}
        onChange={(e) => {
          formik.handleChange(e);
          const selectedAddressId = e.target.value;
          formik.setFieldValue('address', selectedAddressId);
        }}
      >
        <option value='' disabled>
          {t("choosethedomain")}
        </option>
        {select.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      <span className='select-icon'>&#9660;</span>
    </div>

{formik.errors.address && formik.touched.address ? (
  <div className='alert alert-danger'>{formik.errors.address}</div>
) : null}




    
        {/* <label htmlFor='sub_category_id' className='mt-2'>sub_category_id:</label>
        <input type='text' className='form-control mt-2 ' id="sub_category_id" onBlur={formik.handleBlur} name='sub_category_id' value={formik.values.sub_category_id} onChange={formik.handleChange} />
        {formik.errors.sub_category_id && formik.touched.sub_category_id ? <div className='alert alert-danger'>{formik.errors.sub_category_id}</div> : ""} */}

<label htmlFor='sub_category_id' className='mt-2'>
{t("specialization")}  
</label>
<div className='select-container'>
<select
  className='form-control mt-2'
  id='sub_category_id'
  onBlur={formik.handleBlur}
  name='sub_category_id'
  value={formik.values.sub_category_id}
  onChange={(e) => {
    // تحديث حالة formik
    formik.handleChange(e);

    const selectedAddressId = e.target.value;
    setaddressId(selectedAddressId);
  }}
>
  <option value='' disabled>
  {t("choosespecialty")}
  </option>
  {main_category_id?.map((location) => (
    <option key={location.id} value={location.id}>
      {location.name}
    </option>
  ))}
</select>
<span className='select-icon'>&#9660;</span>
</div>

{formik.errors.sub_category_id && formik.touched.sub_category_id ? (
  <div className='alert alert-danger'>{formik.errors.sub_category_id}</div>
) : (
  ''
)}

    {/* ------------------------------------------------------------------- */}



    
        <label htmlFor='logo' className='mt-2'>{t("logo")} :</label>
<input
  type='file'
  className='form-control mt-2'
  id="logo"
  onBlur={formik.handleBlur}
  name='logo'
  onChange={(event) => {
    formik.setFieldValue('logo', event.currentTarget.files[0]);
  }}
/>
{formik.errors.logo && formik.touched.logo ? (
  <div className='alert alert-danger'>{formik.errors.logo}</div>
) : null}

{isLoading ? (
  <button className="btn bg-main btn-add-card mt-2" type="button">
    <span className="btn bg-color btn-add-card">
      <i className="fas fa-spinner fa-spin text-white"></i>
    </span>
  </button>
) : (
  <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-add-card mt-4 w-100  btn-hoverlogin border-radius p-8' type="submit">{t("register")}</button>
)}


        <p className='mt-3 text-center'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
        <div className='d-center flex-column'>
          <div className='d-flex'>
          <p className='mx-3 mt-3'>  {t("alreadyAcount")}</p>
            <Link to={"/Login"} className='mt-3'>{t("login")}</Link>
          </div>
        </div>
      </form>
    </div>
  </>
}
