import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
// import moment from "moment";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";


export default function Companies() {
  const { t, i18n } = useTranslation();

  let { Url } = useContext(UserContext);


  const { handleChangeLanguage, isButtonPressed, isTextVisible } =
    useContext(UserContext);

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleLanguageChange = (newLanguage) => {

    handleChangeLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);

    // Set text direction based on the language
    document.body.dir = newLanguage === "ar" ? "rtl" : "ltr";

    // Save selected language and direction in local storage
    localStorage.setItem("language", newLanguage);
    localStorage.setItem("direction", document.body.dir);

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

  let Navigate = useNavigate();
  const [errorr, seterror] = useState(null);
  const [isLoding, setisLoding] = useState(false);
  const [select, setselect] = useState([]);
  const [addressId, setaddressId] = useState([]);
  const [locaionidd, setlocaionidd] = useState([]);
  const [ctedLocationId, selectedLocationId] = useState([]);
  const [IDselect, setIDselect] = useState("");
  const [Categories, Setcategories] = useState([]);
  const [aress, setaress] = useState([]);
  const [main_category_id, setmain_category_id] = useState([]);
  const [selectid, setselectid] = useState(0);
  const [locaionid, setlocaionid] = useState([]);
  const [subid, setsubid] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setdate] = useState([])
  const sendLocationIdToShipping = (selectedLocationId) => {
    setIDselect(selectedLocationId);
  };

  async function handleLoginSubmit(values) {

    
    try {
      const token = localStorage.getItem("UserToken");
      const response = await axios.post(
        `${Url}companies/jobs`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      setdate(response);
      if (response.status === 200) {
        // Assuming response.data.status is a boolean
        if (response.data.status === true) {
          toast.success("Job posted successfully", {
            position: 'top-center',
          });
        } else if (response.data.errors && response.data.errors.length > 0) {
          // Handle specific errors returned by the API
          toast.error(response.data.errors.join(', '), {
            position: 'top-center',
          });
        } else {
          console.error('Backend Error:', response.data.message || response.data.data.message);
          toast.error("Job posting failed", {
            position: 'top-center',
          });
        }
      } else {
     
      }
    } catch (error) {
      console.error('Unhandled Error:', error);
 
    }

    if (date.data && date.data.errors && typeof date.data.errors === 'object') {
      // Map over the errors and display them individually
      Object.values(date.data.errors).forEach((error) => {
        console.error('Error:', error); // Log the error to the console
        toast.error(error, { position: 'top-center' }); // Display the error using toast
      });
    } else {
      console.error('Error data or errors is not an object:', date.data && date.data.errors);
      // Handle the case where data or errors is not an object
      // toast.error('An unexpected error occurred', { position: 'top-center' });
    }
  }
  useEffect(() => {
    async function fetchSettings() {
      try {
        // استرجاع التوكن من localStorage
        const token = localStorage.getItem("UserToken");

        // قم بإضافة التوكن إلى رأس الطلب
        const responsee = await axios.get(
          `${Url}employees/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setselect(responsee?.data.data);
      } catch (error) {
        console.error("Error fetching  data:", error);
      }
    }

    fetchSettings();
  }, []);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(`${Url}employees/countries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        selectedLocationId(response?.data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    fetchLocations();
    // fetchCities();
  }, []);
  // -------------------------------------------------------------
  useEffect(() => {
    async function fetchLocations() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(
          `${Url}employees/categories?main_id=${selectid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setmain_category_id(response?.data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    // console.log(Categories , "CategoriesCategoriesCategoriesCategories");
    // Fetch cities whenever locaionidd changes
    if (selectid) {
      fetchLocations();
    }

    // fetchCities();
  }, [selectid]);
  // ----------------------------------------------------------------
  // ...
  // -------------------------------------------------------------
  useEffect(() => {
    async function fetchLocations() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(
          `${Url}employees/categories?sub_id=${addressId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response?.data?.data , "debartmin_category_id");
        setsubid(response?.data?.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    // console.log(Categories , "CategoriesCategoriesCategoriesCategories");
    if (addressId) {
      fetchLocations();
    }
    // fetchCities();
  }, [addressId]);
  // ----------------------------------------------------------------
  // ...
  useEffect(() => {
    async function fetchCities() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(
          `${Url}employees/countries/${locaionidd}/cities`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  // ----------------------------------------------------------------
  // ...
  useEffect(() => {
    async function fetchCities() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(`${Url}companies/subscribes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setlocaionid(response.data.data);

        // -------------------------------------------------------------------------
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
  }

  let validationSchema = yup.object({
    name: yup.string().required("not required"),
    description: yup.string().required("required"),
    department_id: yup.string().required("required"),
    category_level: yup.string().required(),
    start: yup
    .date()
    .required("التاريخ مطلوب")
    .typeError("تنسيق غير صالح"),
    end: yup
      .date()
      .required("التاريخ مطلوب")
      .typeError(/^\d{4}-\d{2}-\d{2}$/, "تنسيق غير صالح"),
    interview_start: yup
      .date()
      .required("التاريخ مطلوب")
      .typeError(/^\d{4}-\d{2}-\d{2}$/, "تنسيق غير صالح"),
    interview_end: yup
      .date()
      .required("التاريخ مطلوب")
      .typeError(/^\d{4}-\d{2}-\d{2}$/, "تنسيق غير صالح"),
    subscribe_id: yup.mixed().required("not required"),
    asked_cvs: yup.number().required("not required"),
    // skills: yup.string().required('يرجى إدخال المهارات'),
    questions_ids: yup.array().required("not required"),
    new_questions: yup.mixed().required("not required"),
    questions_duration: yup.number()
      .lessThan(11, 'يجب أن يكون الرقم أقل من 10')
      .required('This field is required'),
    questions_type: yup.mixed().required("not required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      description: "  ",
      department_id: "",
      category_level: "",
      start: "",
      end: "",
      interview_start: "",
      interview_end: "",
      subscribe_id: "",
      asked_cvs: "",
      skills: ["1"],
      questions_duration: "",
      questions_type: "",
    },
    validationSchema,
    onSubmit: handleLoginSubmit,


  });
  // const handleSkillsChange = (e) => {
  //   const { value } = e.target;
  //   // تحديث حالة formik بالقيمة الجديدة للمهارات بعد التحقق من تنسيق البيانات
  //   const skillsArray = value.split('\n').map(skill => skill.trim());
  //   formik.setFieldValue('skills', skillsArray);
  // };
  // const handleFormSubmit = () => {
  //   // تحويل قيمة skills إلى سلسلة JSON قبل إرسالها إلى الخادم
  //   const formData = {
  //     // باقي البيانات...
  //     skills: JSON.stringify(formik.values.skills)
  //   };
  
  //   // إرسال البيانات إلى الخادم...
  // };
  




  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title> {t("jopequiest")} </title>
      </Helmet>

      <div className="w-75 mx-auto py-5">


        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <h5 className="fw-bold text-center"> {t("jopequiest")} </h5>

          <div className="container">
            <div className="row">
              <div className="col-4 mt-3">
                <label htmlFor="" className="mt-2">
                 {t("maincatogry")}
                </label>
                <div className="select-container">
                  <select
                    className='form-control mt-2'
                    id='address'  // Add the id attribute
                    name='address'  // Add the name attribute
                    onChange={(e) => {
                      formik.handleChange(e);
                      const selectedAddressId = e.target.value;
                      formik.setFieldValue('address', selectedAddressId);
                      setselectid(selectedAddressId);
                    }}
                  >
                    <option value='' disabled>
                    {t("subcatogry")}

                    </option>
                    {select.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>

                  <span className="select-icon">&#9660;</span>
                </div>
              </div>
              <div className="col-4 mt-3">
                <label htmlFor="sub_category_id" className="mt-2">
                  التصمنيف الفرعي
                </label>
                <div className="select-container">
                  <select
                    className="form-control mt-2"
                    id=""
                    onBlur={formik.handleBlur}
                    name="sub_category_id"
                    // value={formik.values.sub_category_id}
                    onChange={(e) => {
                      // تحديث حالة formik
                      formik.handleChange(e);

                      const selectedAddressId = e.target.value;
                      setaddressId(selectedAddressId);
                    }}
                  >
                    <option value="" disabled>
                      {t("choosespecialty")}
                    </option>
                    {main_category_id?.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <span className="select-icon">&#9660;</span>
                </div>

                {formik.errors.sub_category_id && formik.touched.sub_category_id ? (
                  <div className="alert alert-danger">
                    {formik.errors.sub_category_id}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-4 mt-3">
                <label htmlFor="department_id" className="mt-2">
                  department
                </label>
                <div className="select-container">
                  <select
                    className="form-control mt-2"
                    id="department_id"
                    onBlur={formik.handleBlur}
                    name="department_id"
                    value={formik.values.department_id}
                    onChange={(e) => {
                      // تحديث حالة formik
                      formik.handleChange(e);

                      const selectedAddressId = e.target.value;
                      setaddressId(selectedAddressId);
                    }}
                  >
                    <option value="" disabled>
                      {t("choosespecialty")}
                    </option>
                    {subid?.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <span className="select-icon">&#9660;</span>
                </div>

                {formik.errors.department_id && formik.touched.department_id ? (
                  <div className="alert alert-danger">
                    {formik.errors.department_id}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-4 mt-3">

                <label htmlFor="category_level" className="mt-2">
                  category_level
                </label>
                <div className="select-container">
                  <select
                    className="form-control mt-2"
                    id="category_level"
                    onBlur={formik.handleBlur}
                    name="category_level"
                    value={formik.values.category_level}
                    onChange={(e) => {
                      formik.handleChange(e);

                      const selectedAddressId = e.target.value;
                      setaddressId(selectedAddressId);
                    }}
                  >
                    <option value="0">fresh</option>
                    <option value="1">Jonior</option>
                    <option value="2">Mid Level</option>
                    <option value="3">Senior</option>
                    <option value="4">Team Lead</option>
                    <option value="5">CEO</option>
                  </select>
                  <span className="select-icon">&#9660;</span>
                </div>

                {formik.errors.category_level && formik.touched.category_level ? (
                  <div className="alert alert-danger">
                    {formik.errors.category_level}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-8 mt-3">
                <label htmlFor="subscribe_id" className="mt-2">
                {t("Choosepackage")}

                </label>
                <div className="select-container">
                  <select
                    className="form-control mt-2"
                    id="subscribe_id"
                    onBlur={formik.handleBlur}
                    name="subscribe_id"
                    value={formik.values.subscribe_id}
                    onChange={(e) => {
                      formik.handleChange(e);

                      const selectedAddressId = e.target.value;
                      setaddressId(selectedAddressId);
                    }}
                  >
                    <option value="" disabled>
                    {t("Choosepackage")}
                    </option>
                    {locaionid?.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location?.package?.name_ar}
                      </option>
                    ))}
                  </select>
                  <span className="select-icon">&#9660;</span>
                </div>

                {formik.errors.subscribe_id && formik.touched.subscribe_id ? (
                  <div className="alert alert-danger">
                    {formik.errors.subscribe_id}
                  </div>
                ) : (
                  ""
                )}

              </div>
              <div className="col-4 mt-3">

                <label htmlFor="name" className="mt-2">
                  {" "}
                  JOPName :
                </label>
                <input
                  type="text"
                  className="form-control mt-2 "
                  id="name"
                  onBlur={formik.handleBlur}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger">{formik.errors.name}</div>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="col-4 mt-3">

              <label htmlFor="skills" className="mt-2">
  Job Skills:
</label>
<input
  type="text"
  className="form-control mt-2"
  id="skills"
  onBlur={formik.handleBlur}
  name="skills"
  value={formik.values.skills}
/>
{formik.errors.skills && formik.touched.skills ? (
  <div className="alert alert-danger">
    {formik.errors.skills}
  </div>
) : (
  ''
)}
              </div> */}

              {/* --------------------------------------------------------------- */}

              <div className="col-4 mt-3">

                <label htmlFor="asked_cvs" className="mt-2">
                  {" "}
                  {t("numberCv")}
                </label>
                <input
                  type="text"
                  className="form-control mt-2 "
                  id="asked_cvs"
                  onBlur={formik.handleBlur}
                  name="asked_cvs"
                  value={formik.values.asked_cvs}
                  onChange={formik.handleChange}
                  placeholder={t("numberCv")}
                />
                {formik.errors.asked_cvs && formik.touched.asked_cvs ? (
                  <div className="alert alert-danger">{formik.errors.asked_cvs}</div>
                ) : (
                  ""
                )}

              </div>
              {/* <div className="col-4 mt-3">
                <label htmlFor="skills" className="mt-2">
                  Job Skills:
                </label>
                <textarea
                  className="form-control mt-2"
                  id="skills"
                  name="skills"
                  value={formik.values.skills.join('\n')} // تحديد الفاصلة المناسبة بين المهارات في textarea
                  onChange={handleSkillsChange}
                />
              </div> */}

              {/* --------------------------------------- */}
              <div className="col-4 mt-3">
                <label htmlFor="description" className="mt-2">
                  {" "}
                  description
                </label>
                <input
                  type="text"
                  className="form-control mt-2 "
                  id="description"
                  onBlur={formik.handleBlur}
                  placeholder="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description && formik.touched.description ? (
                  <div className="alert alert-danger">{formik.errors.description}</div>
                ) : (
                  ""
                )}

              </div>
              <div className="col-4 mt-3">
  <label htmlFor="start" className="mt-2">
    {t("Datestart")}
  </label>
<div className="d-flex">
<div>
                <span className="input-group-text" role="img" aria-label="calendar">
            &#x1F4C5;
          </span>
     </div>
 <div>
 <DatePicker
    className="form-control mt-2"
    id="start"
    selected={formik.values.start}
    onChange={(date) => formik.setFieldValue("start", date)}
    onBlur={formik.handleBlur}
  />
 </div>
</div>

  {formik.errors.start && formik.touched.start ? (
    <div className="alert alert-danger">{formik.errors.start}</div>
  ) : (
    ""
  )}
</div>

<div className="col-4 mt-3">
  <label htmlFor="end" className="mt-2">
    {t("Dateend")}
  </label>
<div className="d-flex">
<div>
                <span className="input-group-text" role="img" aria-label="calendar">
            &#x1F4C5;
          </span>
                </div>
 <div>
 <DatePicker
    className="form-control mt-2"
    id="end"
    selected={formik.values.end}
    onChange={(date) => formik.setFieldValue("end", date)}
    onBlur={formik.handleBlur}
  />
 </div>
</div>
  {formik.errors.end && formik.touched.end ? (
    <div className="alert alert-danger">{formik.errors.end}</div>
  ) : (
    ""
  )}
</div>

              <div className="col-4 mt-3">
                <label htmlFor="interview_start" className="mt-2">
                  {" "}
                  interview Start
                </label>
    <div className="d-flex">
    <div>
                <span className="input-group-text" role="img" aria-label="calendar">
            &#x1F4C5;
          </span>
                </div>
<div>
<DatePicker
  className="form-control mt-2"
  id="interview_start"
  selected={formik.values.interview_start}
  onChange={(date) => formik.setFieldValue("interview_start", date)}
  onBlur={formik.handleBlur}
/>
</div>
    </div>

                {formik.errors.interview_start && formik.touched.interview_start ? (
                  <div className="alert alert-danger">{formik.errors.interview_start}</div>
                ) : (
                  ""
                )}

              </div>
              <div className="col-4 mt-3">
        
  <label htmlFor="interview_end" className="mt-2">
    interview End
  </label>


<div className="d-flex">
<div>
<span className="input-group-text mt-1" role="img" aria-label="calendar">
            &#x1F4C5;
          </span>
  </div>
<div>
<DatePicker
    className="form-control mt-2"
    id="interview_end"
    selected={formik.values.interview_end}
    onChange={(date) => formik.setFieldValue("interview_end", date)}
    onBlur={formik.handleBlur}
  />
</div>
</div>
  {formik.errors.interview_end && formik.touched.interview_end ? (
    <div className="alert alert-danger">{formik.errors.interview_end}</div>
  ) : (
    ""
  )}
</div>
              <div className="col-4 mt-3">
                <label htmlFor="questions_type" className="mt-2">
                  questions_type
                </label>
                <div className="select-container">
                  <select
                    className="form-control mt-2"
                    id="questions_type"
                    onBlur={formik.handleBlur}
                    name="questions_type"
                    value={formik.values.questions_type}
                    onChange={(e) => {
                      formik.handleChange(e);

                      const selectedAddressId = e.target.value;
                      setaddressId(selectedAddressId);
                    }}
                  >
                    <option value="ai">ai</option>
                    <option value="company">company</option>
                    <option value="both"> both</option>
                  </select>
                  <span className="select-icon">&#9660;</span>
                </div>

                {formik.errors.questions_type && formik.touched.questions_type ? (
                  <div className="alert alert-danger">
                    {formik.errors.questions_type}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-4 mt-3">
                <label htmlFor="questions_duration" className="mt-2">
                  questions Duration :
                </label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="questions_duration"
                  onBlur={formik.handleBlur}
                  name="questions_duration"
                  value={formik.values.questions_duration}
                  onChange={formik.handleChange}
                />
                {formik.errors.questions_duration && formik.touched.questions_duration ? (
                  <div className="alert alert-danger">
                    {formik.errors.questions_duration}
                  </div>
                ) : (
                  ""
                )}
              </div>

            </div>
          </div>




          {isLoading ? (
            <button className="btn bg-main btn-add-card mt-2" type="submit">
              <button className="btn bg-color btn-add-card ">
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            </button>
          ) : (
            <div className="text-center mt-2">
              <button
                disabled={(formik.isValid && formik.dirty)}
                className="btn btn-add-card my-auto border-radius mt-3 w-50 p-8"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();  // Prevent the default form submission
                  handleLoginSubmit(formik.values);  // Manually call your submit function with formik values
                }}
              >
                                {t("AddJop")}

              </button>

            </div>
          )}

      
          <div className="d-center flex-column">
         
          </div>
        </form>
      </div>
    </>
  );
}
