import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { UserContext } from "../Context/Context";
import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import Modal from 'react-bootstrap/Modal';

import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { t } from "i18next";
import Shartviuo from "./ShartVeiduo";
// @import "~video-react/styles/scss/video-react"; // or import scss

export default function VeiduoDetails() {
  const [jobDetails, setJobDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataviduo, setdataviduo] = useState([]);
  const [comment, setComment] = useState("");
  const [cv, setcv] = useState([]);
  const [dawinloandate, setdawinloandate] = useState([]);
  const [activeValue, setActiveValue] = useState(false);
  const [dawinload, setdawinload] = useState([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [company_comment, setCompanyComment] = useState('');
  const [offer, setOffer] = useState('');
  const [status, setStatus] = useState('hired');
  const [show, setShow] = useState(false);
  const [Showw, setShoww] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShoww = () => setShoww(true);
  const handleClosee = () => setShoww(false);

  let { Url } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const token = localStorage.getItem("UserToken");
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(`${Url}companies/jobs/${id}`, {
            headers: headers,
          });
          // console.log(response.data.data.cvs[0].cv , "response");
          setcv(response.data.data.cvs[0].cv);
          setJobDetails(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const token = localStorage.getItem("UserToken");
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(
            `${Url}companies/jobs/${id}/interview`,
            {
              headers: headers,
            }
          );
          // console.log(response.data , "Ahmedd0000ddddddddffajjjjdddd");
          setdataviduo(response.data.data.interviews[0]);
          // console.log(response.data.data.interviews[0].video, "response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const sendComment = async () => {
    try {
      setIsCommentLoading(true); // تعيين الحالة إلى true عند بدء الطلب
      const token = localStorage.getItem("UserToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${Url}companies/jobs/${id}/interview/${dataviduo.id}`,
        {
          status: "hired",
          comment: comment, // تضمين بيانات التعليق هنا
        },
        { headers }
      );
      console.log("Comment sent successfully:", response.data);
      if (response.data.status == true) {
        toast.success(response.data.message, {
          position: "top-center",
        });
      }
      // إعادة تحميل البيانات بعد الإرسال إذا كان ذلك ضرورياً
      // fetchData(); // هذه الدالة تأخذ البيانات من الخادم كما فعلت في useEffect الأولى
    } catch (error) {
      console.error("Error sending comment:", error);
      setIsError(true);
    } finally {
      setIsCommentLoading(false); // تعيين الحالة إلى false بعد الانتهاء من الطلب
    }
  };

  // conso-le.log(onl);
  const handleclickdawinload = async (id) => {
    try {
      const token = localStorage.getItem("UserToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${Url}companies/cv-job/active/${id}`,
        { active: "downloaded" },
        { headers: headers }
      );
      setdawinloandate(response);
      console.log(response.data);
      toast.success("You have viewed successfully", {
        position: "top-center",
      });
      // قم بتحديث الحالة المحلية بناءً على الرد من الخادم
      setActiveValue(true); // أو قم بتغيير القيمة بناءً على الرد الذي تتوقعه من الخادم
    } catch (error) {
      console.error("Error updating status:", error);
      // قم بإدارة الخطأ هنا
    }
  };
  const handleWatchedButtonClick = async (id) => {
    try {
      const token = localStorage.getItem("UserToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${Url}companies/cv-job/active/${id}`,
        { active: "viewed" },
        { headers: headers }
      );
      setdawinloandate(response);
      console.log(response.data);
      toast.success("You have viewed successfully", {
        position: "top-center",
      });
      // قم بتحديث الحالة المحلية بناءً على الرد من الخادم
      setActiveValue(true); // أو قم بتغيير القيمة بناءً على الرد الذي تتوقعه من الخادم
    } catch (error) {
      console.error("Error updating status:", error);
      // قم بإدارة الخطأ هنا
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const token = localStorage.getItem("UserToken");
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`${Url}companies/jobs/${id}`, {
            headers: headers,
          });
          // console.log(response?.data.data.cvs , "aHM00ED8754441");
          setdawinloandate(response?.data.data.cvs);
          setcv(response?.data?.data?.cvs);
          setJobDetails(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);
  // --------------------------------------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const token = localStorage.getItem("UserToken");
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`${Url}companies/jobs/${id}/interview`, {
            headers: headers,
          });
          // console.log("response" , response.data.data?.interviews[0].id);
          setdawinload(response?.data?.data?.interviews[0].id)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const fetchDataInput = async (event) => {
    event.preventDefault(); // منع السلوك الافتراضي للزر
    try {
      if (id && dawinload) { // التحقق من قيمة dawinload
        setIsLoading(true);
        const token = localStorage.getItem("UserToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const dataToSend = {
          status: "rejected",
          company_comment: company_comment,
          offer: offer,
        };

        const response = await axios.post(
          `${Url}companies/jobs/${id}/interview/${dawinload}`, // تضمين dawinload في عنوان الطلب
          dataToSend,
          { headers: headers }
        );
          if(response.data.status == true){
            toast.success(response.data.message, {
              position: "top-center",
            });
          }
        // console.log("response", );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="d-center mt-5">
        <RotateLoader
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }
 
  const departmentName = jobDetails.department?.name || "N/A";

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />

      </Helmet>
      <div className="container mt-4">
        <div className="row">
          <h5 className="pt-3 mx-1 mt-3 mb-3 text-color fw-bold">
            {jobDetails.name}
          </h5>

          <div className="col-6">
            <div className="pt-2 d-flex">
              <p className="fw-bold mx-2 font-12">التصنيف الرئيسي</p>
              <p>{departmentName}</p>
            </div>
            <div className="pt-0 d-flex">
              <p className="fw-bold mx-2 font-12">    {t("Experience")}  </p>
              <p>{jobDetails.category_level}</p>
            </div>
            <div className="pt-0 d-flex">
              <p className="fw-bold mx-2 font-12">     {t("startdate")} </p>
              <p>{jobDetails.start}</p>
            </div>
            <div className=" pb-2 text-center d-center"></div>
          </div>
          <div className="col-6">
            <div className="pt-2 d-flex ">
              <p className="fw-bold mx-2 font-12"> department</p>
              <p>{departmentName}</p>
            </div>
            <div className="pt-0 d-flex">
              <p className="fw-bold mx-2 font-12">    {t("skills")} </p>
              {/* Add a check for jobDetails.skills before mapping */}
              <p>
                {jobDetails.skills
                  ? jobDetails.skills.map((skill) => skill.name).join(", ")
                  : "N/A"}
              </p>
            </div>
            <div className="pt-0 d-flex">
              <p className="fw-bold mx-2 font-12">     {t("enddate")} </p>
              <p>{jobDetails.end}</p>
            </div>
            <div className=" pb-2 ">
              <div className="pb-2 text-center d-center "></div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <video
                playsInline
                style={{ width: "100%", height: "auto" }}
                id="myVideo"
                autoPlay
                muted
                loop
                className="uvodna__bg-video"
                preload="auto"
                webkitPlaysInline
                x5PlaysInline
              >
                <source src={`${dataviduo?.video}`} type="video/mp4" />
                <source src={`${dataviduo?.video}`} type="video/ogg" />
              </video>
            </div>
            <div className="col-6">
              <div className="mt-4 d-flex">
        
                {/* ---------------------------------- */}
                <Button variant="" onClick={handleShow}  className="btn mt-3">
                <div className="btn btn-cv mt-1  mx-1">     {t("employee")}       </div>
              </Button>
                <Button variant="" onClick={handleShoww}  className="btn mt-3">
                <div className="btn btn-cv mt-1  mx-1">   {t("administration")}  </div>
              </Button>
              <div className="">
             <a
               href={`https://aihr.ahlanuof.com/${cv[0]?.cv}`}
               onClick={() => handleclickdawinload(cv.id)}
               target="_blank"
               rel="noopener noreferrer"
             >
               <button
                 className="btn btn-cv mt-1  mt-4"
                 onClick={() => handleWatchedButtonClick(cv.id)}
               >
                    {t("ViewCV")} 
               </button>
             </a>


           </div>
              </div>
        

              <Shartviuo/>


            </div>
          </div>
        </div>


        <Modal show={show} onHide={handleClose}>
  <div className="d-flex justify-content-between mt-3 mx-3">
    <Modal.Title> <h2 className="fw-bold">HR AI</h2> </Modal.Title>
    <Modal.Header closeButton />
  </div>

  <div className="w-100 px-2">
    <div className="w-100 px-3 pt-3 border-defalte">
      <h5 className="text-center text-color">     {t("employee")} </h5>
      <div className="w-100 position-relative">
        <select aria-label="Default select example" value={status} onChange={handleStatusChange} className="form-control mb-3">
          <option value="hired">Hired</option>
          <option value="rejected">Rejected</option>
        </select>
        <i className="fa-solid fa-chevron-down position-absolute top-50 start-0 mx-3 translate-middle-y"></i>
      </div>

      <input
        type="text"
        className="form-control w-100"
        value={company_comment}
        onChange={(e) => setCompanyComment(e.target.value)}
        placeholder="Enter Company Comment"
      />
      <input
        type="text"
        className="form-control w-100 mt-3"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
        placeholder="Enter Offer"
      />
      


      <button type="button" onClick={fetchDataInput} disabled={isLoading} className="mb-3 active-button border-0 px-4 mt-3  pt-2 pb-2 fw-bold">  {t("employee")}</button>
    
    
    
    </div>
  </div>

  <Modal.Footer />
</Modal>

<Modal show={Showw} onHide={handleClosee}>
  <div className="d-flex justify-content-between mt-3 mx-3">
    <Modal.Title> <h2 className="fw-bold">HR AI</h2> </Modal.Title>
    <Modal.Header closeButton />
  </div>

<div className="mx-4 mt-5">
<input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-control w-100 "
                  placeholder=  {t("administration")}
                />
                <button
                  onClick={sendComment}
                  className="btn text-color fw-bold active-button mt-4"
                  disabled={isCommentLoading} // تعطيل الزر أثناء التحميل
                >
                  {isCommentLoading ? (
                    <i class="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    t("administration")
                  )}
                </button>
</div>

  <Modal.Footer />
</Modal>

     



 
    <div className="w-50"></div>

      </div>
    </>
  );
}
