import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { UserContext } from "../Context/Context";
import { pdfjs } from "react-pdf";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Example from "./pop";
export default function Showjobdetails() {
  const [jobDetails, setJobDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cv, setcv] = useState([])
  let { Url } = useContext(UserContext)
  const [cvs, setcvs] = useState([])
  const [cvss, setcvss] = useState([])
  const [data, setdata] = useState([])
  const [first, setfirst] = useState([])
  const [requrd, setrequrd] = useState(null)
  const [dawinloandate, setdawinloandate] = useState([])
  const [activeValue, setActiveValue] = useState(false);
  const [dawinload, setdawinload] = useState([])
  const [reading, setreading] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Step 1
  const [show, setShow] = useState(false);
  const [idd, setidd] = useState([])
  const [cv_status, setcv_status] = useState([])
const [i, seti] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ids, setids] = useState([])
  const [onloein, setoulin] = useState([])
  const [pending , setpending ] = useState([])
  // const [dawinload, setdawinload] = useState(second)
  const { id } = useParams();
  const { t } = useTranslation();
// console.log(id);

async function fetchData() {
  try {
    if (id) {
      const token = localStorage.getItem("UserToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${Url}companies/jobs/${id}`,
        {
          headers: headers,
        }
      );
      setdawinloandate(response?.data.data.cvs);
      setcv(response?.data?.data?.cvs);
      setJobDetails(response.data.data);
      setdata(response.data);
      // console.log(response.data.data.cvs[0].id, "2020202000");
      setidd(response.data.data.cvs[0].id);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsError(true);
  } finally {
    setIsLoading(false);
  }
}
async function fetchInterviewData() {
  try {
    const token = localStorage.getItem("UserToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${Url}companies/jobs/${id}`,
      {
        headers: headers,
      }
    );
    // console.log(response?.data?.data?.length);

console.log(response?.data.data.cvs, "opwefgvo5464444sdfj");
    seti(response?.data.data.cvs);
    response?.data?.data?.interviews?.map((data)=>{
      if(data.status == "pending"){
        setpending(data)
      }
    })
  } catch (error) {
    setIsError(true);
  } finally {
    setIsLoading(false);
  }
}
// console.log(pending?.length , "pendingpendingahmedasi00AapendingHMEDMDGVSDAJKOOSDJGufg");

useEffect(() => {
fetchInterviewData()

  data.data?.cvs?.map((cv) => {
    console.log(cv.status , "mappppppppppppppp");
    setoulin(cv.status )
    // console.log(onloein);
  });

}, []);


async function fetchRequiredData() {
  try {
    const token = localStorage.getItem("UserToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${Url}companies/jobs/${id}`,
      {
        headers: headers,
      }
    );
setids(response?.data?.data?.job.id)
// console.log(response , "Ahmemm");

    response?.data?.data?.interviews.map((data) => {
      // console.log(data , "Ahmemm");
      // console.log(data.status, "statusstat00usstatusv");
      setrequrd(data.status);
    });

    // console.log(response.data.data.interviews, "0000000000interviews00000");
  } catch (error) {
    console.error("Error fetching required data:", error);
  }
}

useEffect(() => {
  if (requrd) {
    fetchRequiredData();
  }
}, [requrd]);
useEffect(() => {
  fetchData();
  fetchRequiredData()
}, [id]);


  if (isLoading) {
    return <div className="d-center mt-5">
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
  }
  async function downloadewData(id) {
    try {
      const token = localStorage.getItem("UserToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const response = await axios.get(
        `${Url}companies/jobs/${id}`,
        {
          headers: headers,
        }
      );

      const downloadedAt = response.data.data.cvs;
      if (Array.isArray(downloadedAt)) {
        downloadedAt.map((data) => {
          // console.log(data??.downloaded_at , "PE222NDING ");
          setdawinload(data.downloaded_at)
        });
      }
  
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  downloadewData(id);
  


  const departmentName = jobDetails.department?.name || "N/A";

  const handleWatchedButtonClick = async (id) => {
    try {
      const token = localStorage.getItem("UserToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${Url}companies/cv-job/active/${id}`,
        { active: 'downloaded' },
        { headers: headers }
      );
      setdawinloandate(response)
      toast.success("You have viewed successfully", {
        position: 'top-center'
      })
      setActiveValue(true); 
    } catch (error) {

    }
  };
  const handleclickdawinload = async (id) => {
    try {
      const token = localStorage.getItem("UserToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${Url}companies/cv-job/active/${id}`,
        { active: 'accept' },
        { headers: headers }
      );
      setdawinloandate(response)
      toast.success("You have downloaded successfully", {
        position: 'top-center'
      })
      setActiveValue(true); // Ø£Ùˆ Ù‚Ù… Ø¨ØªØºÙŠÙŠØ± Ø§Ù„Ù‚ÙŠÙ…Ø© Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø±Ø¯ Ø§Ù„Ø°ÙŠ ØªØªÙˆÙ‚Ø¹Ù‡ Ù…Ù† Ø§Ù„Ø®Ø§Ø¯Ù…
    } catch (error) {
    }
  };
  const handleclickaccepted = async (id) => {
    try {
      const token = localStorage.getItem("UserToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${Url}companies/cv-job/status/${id}`,
        { status: 'accepted' },
        { headers: headers }
      );
      setdawinloandate(response)
      toast.success("You have downloaded successfully", {
        position: 'top-center'
      })
      setActiveValue(true);
    } catch (error) {
    }
  };

  
    const handleOfflineClick = () => {
      setIsPopupOpen(true);
    };



    const handleSubmit = async (id) => {
      try {
        
        const token = localStorage.getItem("UserToken");
        
        const requestData = {
          status: "offline" // Ù…Ø«Ø§Ù„ Ø¹Ù„Ù‰ ØªØ¶Ù…ÙŠÙ† Ù‚ÙŠÙ…Ø© Ø§Ù„Ø­Ø§Ù„Ø© ÙƒÙ…Ø¹Ù„Ù…Ø©
        };
        
        const response = await axios.post(
          `${Url}/companies/cv-job/status/${id}`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        
        if (response.data.status === true) {
          toast(response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const handlerejected = async (idd) => {
      try {
        const token = localStorage.getItem("UserToken");
        
        const requestData = {
          status: "rejected" 
        };
        
        const response = await axios.post(
          `${Url}companies/jobs/${id}/interview/${idd}`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response , "responseresponseresponseresponsejh n  ");
        
        if (response.data.status === true) {
          toast(response.data.message);
        }
      } catch (error) {
        // يمكنك معالجة الخطأ هنا
      } finally {
        setIsLoading(false);
      }
    };
    
  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>

      <div className="container mt-4">
        <div className="row">
          <h5 className="pt-3 mx-1 mt-3 mb-3 text-color fw-bold">{jobDetails.name}</h5>

          <div className="col-6">

            <div className="pt-2 d-flex">
              <p className="fw-bold mx-2 font-12">الوظيفه</p>
              <p>{departmentName}</p>
            </div>
            <div className="pt-0 d-flex">
              <p className="fw-bold mx-2 font-12"> {t("Experience")}  </p>
              <p>{jobDetails.category_level}</p>
            </div>
            <div className="pt-0 d-flex">
              <p className="fw-bold mx-2 font-12">{t("startdate")}     </p>
              <p>{jobDetails.start}</p>
            </div>
            <div className=" pb-2 text-center d-center"></div>
          </div>
          <div className="col-6">
            <div className="pt-2 d-flex pt-5">
              <p className="fw-bold mx-2 font-12"> department</p>
              <p>{departmentName}</p>
            </div>
            <div className="pt-0 d-flex">
              <p className="fw-bold mx-2 font-12"> {t("skills")}</p>
              {/* Add a check for jobDetails.skills before mapping */}
              <p>{jobDetails.skills ? jobDetails?.skills?.map((skill) => skill.name).join(", ") : "N/A"}</p>
            </div>
            <div className="pt-0 d-flex">
              <p className="fw-bold mx-2 font-12"> {t("enddate")}   </p>
              <p>{jobDetails.end}</p>
            </div>
            <div className=" pb-2 ">
              <div className="pb-2 text-center d-center "></div>
            </div>
          </div>
        </div>

        {/* {console.log(jobDetails , "hwhidfwe")} */}
        <div className="container mt-4">
          <ul class="nav nav-pills mb-3 w-75     justify-content-between mx-auto" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">    {t("accepted")}</button>
            </li>
           
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">  {t("download")}  </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-contact-tabb" data-bs-toggle="pill" data-bs-target="#pills-contactt" type="button" role="tab" aria-controls="pills-contactt" aria-selected="false"> {t("rejected")} </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-contact-tabbb" data-bs-toggle="pill" data-bs-target="#pills-contacttt" type="button" role="tab" aria-controls="pills-contacttt" aria-selected="false"> تم القبول </button>
            </li>
          </ul>





          <div class="tab-content w-75 mx-auto mt-5" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">


            <div className="row">
  {i.filter(cv => cv.status === "PENDING").length > 0 ? (
    i.filter(cv => cv.status === "PENDING").map((cv, index) => (
      <div className="col-6 box-shado" key={index}>
        <div className="text-center pt-1">
          <div className="row">
            <div className="col-5">
              <div className="d-flex d-flex">
                <h4 className="pt-2 fw-bold mx-2 font-16 mt-2">{t("name")}</h4>
                <h5 className="pt-2 mt-1">{cv.employee.name}</h5>
              </div>
              <div className="d-flex">
                <h4 className="pt-2 fw-bold mx-2 font-16 mt-1">{t("jop")}</h4>
                <h5 className="pt-2 mt-1 font-16">{cv.employee.job_title}</h5>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex d-center">
                <h4 className="pt-2 fw-bold mx-2 font-16">{t("Salary")}</h4>
                <h5 className="pt-2 mt-1">{cv.employee.salary}</h5>
              </div>
              <div className="d-flex d-center">
                <h4 className="pt-2 fw-bold mx-2 font-16">{t("age")}</h4>
                <h5 className="pt-2 mt-1">{cv?.employee?.age}</h5>
              </div>
            </div>
          </div>
          <div>
            <div className="row mt-3">
              <div className="pb-3 text-center">
                <button className="btn btn-cv mt-1 font-12 d-center" onClick={() => handleWatchedButtonClick(cv.id)}>
                  {t("ViewCV")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <h2 className="text-center mt-3"> {t("display")}  </h2>
  )}
</div>



            </div>
      
            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
      <div className="col-12 box-shado">
      {jobDetails?.cvs?.map((cv, index) => {
  // قم بفحص قيمة downloaded_at هنا
  if (cv.downloaded_at !== null) {
    return (
      <div className="row" key={index}>
        <div className="text-center pt-3">
          <div className="row">
            <div className="col-6">
              <div className="d-flex d-center">
                <h4 className="pt-2 fw-bold mx-2 font-16"> {t("name")}</h4>
                <h5 className="pt-2 mt-1">{cv.employee.name}</h5>
              </div>
              <div className="d-flex d-center">
                <h4 className="pt-2 fw-bold mx-2 font-16"> {t("jop")}</h4>
                <h5 className="pt-2 mt-1">{cv.employee.job_title}</h5>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="d-flex d-center">
                <h4 className="pt-2 fw-bold mx-2 font-16"> {t("Salary")}</h4>
                <h5 className="pt-2 mt-1">{cv.employee.salary}</h5>
              </div>
              <div className="d-flex d-center">
                <h4 className="pt-2 fw-bold mx-2 font-16"> {t("age")}</h4>
                <h5 className="pt-2 mt-1">{cv.employee.age}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 text-center">
          <Button variant="" onClick={handleShow} className="btn">
          <Example id={cv.id}/> 
          </Button>
        </div>
        <div className="col-4 text-center">
          <button onClick={()=>handleSubmit(cv.id)} className="btn">
            <div className="btn btn-cv mt-1 font-12 mx-2"> اوف لاين</div>
          </button>
        </div>
        <div className="col-4 text-center">
          <button onClick={()=>handlerejected(cv.id)} className="btn">
            <div className="btn btn-cv mt-1 font-12 mx-2">  رفض</div>
          </button>
        </div>
      </div>
    );
  } else {
    return <h1 className="d-center mt-3">      {t("display")}    </h1>; // Do not render anything if 'first' is not 'viewed'
  }
})}

        {/* Modal */}
    
        {/* <Modal show={show} onHide={handleClose}>
       <div className="d-flex justify-content-between mt-3 mx-3">
       <Modal.Title> <h2 className="fw-bold">HR AI</h2> </Modal.Title>





<Modal.Header closeButton>
</Modal.Header>
       </div>
      
       <Example id={"id"}/>   




        <Modal.Footer>
     
        </Modal.Footer>
      </Modal> */}


      </div>
    </div>
    <div class="tab-pane fade" id="pills-contactt" role="tabpanel" aria-labelledby="pills-contact-tabb">
  {i.filter(cv => cv.status === "REJECTED").map((cv, index) => (
    <div key={index} className="text-center pt-3 box-shado">
      <div className="row">
        <div className="col-6">
          <div className="d-flex d-center">
            <h4 className="pt-2 fw-bold mx-2 font-16">{t("name")}</h4>
            <h5 className="pt-2 mt-1">{cv.employee.name}</h5>
          </div>
          <div className="d-flex d-center">
            <h4 className="pt-2 fw-bold mx-2 font-16">{t("jop")}</h4>
            <h5 className="pt-2 mt-1">{cv.employee.job_title}</h5>
          </div>
        </div>
        <div className="col-6 pt-2">
          <div className="d-flex d-center">
            <h4 className="pt-2 fw-bold mx-2 font-16">{t("Salary")}</h4>
            <h5 className="pt-2 mt-1">{cv.employee.salary}</h5>
          </div>
          <div className="d-flex d-center">
            <h4 className="pt-2 fw-bold mx-2 font-16">{t("age")}</h4>
            <h5 className="pt-2 mt-1">{cv.employee.age}</h5>
          </div>
        </div>
      </div>
    </div>
  ))}
  {!i.some(cv => cv.status === "REJECTED") && (
    <h1 className="d-center">{t("display")}</h1>
  )}
</div>

            <div class="tab-pane fade" id="pills-contacttt" role="tabpanel" aria-labelledby="pills-contact-tabbb">
            <div className="row">
  {i.filter(cv => cv.type === "online" || cv.type === "offline").length > 0 ? (
    i.filter(cv => cv.type === "online" || cv.type === "offline").map((cv, index) => (
      <div className="col-6 box-shado mt-3 " key={index}>
        <div className="text-center pt-1 mx-4">
          <div className="row">
            <div className="col-5">
              <div className="d-flex d-flex">
                <h4 className="pt-2 fw-bold mx-2 font-16 mt-2">{t("name")}</h4>
                <h5 className="pt-2 mt-1">{cv.employee.name}</h5>
              </div>
              <div className="d-flex">
                <h4 className="pt-2 fw-bold mx-2 font-16 mt-1">{t("jop")}</h4>
                <h5 className="pt-2 mt-1 font-16">{cv.employee.job_title}</h5>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex d-center">
                <h4 className="pt-2 fw-bold mx-2 font-16">{t("Salary")}</h4>
                <h5 className="pt-2 mt-1">{cv.employee.salary}</h5>
              </div>
              <div className="d-flex d-center">
                <h4 className="pt-2 fw-bold mx-2 font-16">{t("age")}</h4>
                <h5 className="pt-2 mt-1">{cv?.employee?.age}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <h2 className="text-center mt-3"> {t("display")}  </h2>
  )}
</div>

            </div>
          </div>
        </div>

      </div>
    </>
  );

}
