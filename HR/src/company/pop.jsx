import React, { useContext, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { UserContext } from "../Context/Context";
import { useTranslation } from "react-i18next";


const Example = ({id}) => {
  console.log(id);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

let { Url} = useContext(UserContext)
const { t, i18n } = useTranslation();


  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    status: "online", // القيمة الافتراضية
    email: "",
    start: null,
    allow_update_interview: "1",
    company_interview_start: null,
    company_interview_end: null,
  });

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
  
      const token = localStorage.getItem("UserToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // تحديث قيمة الحالة إلى "Online"
      const formDataWithStatus = {
        ...formData,
        status: "online",
        allow_update_interview: formData.allow_update_interview // ترك القيمة كما هي
      };
  
      // إرسال البيانات إلى API POST
      const response = await axios.post(
        `${Url}companies/cv-job/status/${id}`,
        formDataWithStatus,
        config
      );
  
      console.log("Response:", response.data);
      if (response.data.status === true) {
        toast(response.data.message);
      }
  
      // إعادة تعيين الحالة لتفريغ الحقول بعد الإرسال بنجاح
      setFormData({
        status: "Online",
        email: "",
        start: null,
        allow_update_interview: "",
        company_interview_start: null,
        company_interview_end: null,
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // console.log(id , "Ahighe00000002");

  

  return (
    <div>
       <Button variant="" onClick={handleShow} className="btn">
            <div className="btn btn-cv mt-1 font-12 mx-2"> online</div>
          </Button>
   



      <Modal show={show} onHide={handleClose}>
       <div className="d-flex justify-content-between mt-3 mx-3">
       <Modal.Title> <h2 className="fw-bold">HR AI</h2> </Modal.Title>





<Modal.Header closeButton>
</Modal.Header>
       </div>
      
       <h2 className="text-center fw-bold">   {t("Pleaseenterdata")}   </h2>
      <form onSubmit={handleSubmit} className="mt-5 mx-4">
        <label className="w-100 mt-3"> Message </label>
        <input
          type="text"
          placeholder="Message"
          className="form-control w-100 mt-2 w-88"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
<div className="">
  <label className="w-100 mt-3"> Allow Update Interview: </label>
  <select
  className="form-control w-100 mt-2 w-88"
  name="allow_update_interview"
  value={formData.allow_update_interview}
  onChange={(e) => handleChange("allow_update_interview", e.target.value)}
>
  <option value="1">Yes</option>
  <option value="0">No</option>
</select>


</div>


        <label className="w-100 mt-3">{t("startdate")}   </label>
        <div className="d-flex">
          <span className="input-group-text" role="img" aria-label="calendar">
            &#x1F4C5;
          </span>
          <div className="w-88">
            <DatePicker
              className="form-control w-100 mt-2"
              placeholder="Start"
              selected={formData.start}
              onChange={(date) => handleChange("start", date)}
            />
          </div>
        </div>

        <label className="w-100 mt-3">   Company Interview Start:   </label>

        
        <div className="input-group mt-2 d-flex">
          <div className="input-group-prepend">
            <span className="input-group-text" role="img" aria-label="calendar">
              &#x1F4C5;
            </span>
          </div>
          <div className="w-88">
            <DatePicker
              className="w-100 form-control"
              selected={formData.company_interview_start}
              onChange={(date) =>
                handleChange("company_interview_start", date)
              }
            />
          </div>
        </div>

        <label className="w-100 mt-3"> Company Interview End: </label>
        <div className="d-flex">
          <span className="input-group-text" role="img" aria-label="calendar">
            &#x1F4C5;
          </span>
          <div className="w-88">
            <DatePicker
              className="mt-2 w-100 form-control "
              selected={formData.company_interview_end}
              onChange={(date) => handleChange("company_interview_end", date)}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`mt-3 btn btn-cv mt-1 font-12 mx-2 ${
            isLoading ? "disabled" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Submit"
          )}
        </button>
      </form>




        <Modal.Footer>
     
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Example;
