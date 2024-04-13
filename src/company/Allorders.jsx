import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/Context";
import { Link, useParams } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import Showjobdetails from "./Showjobdetails";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Delatejop from "./Delatejop";
import ChangejobStatus from "../companies/ChangejobStatus";

export default function Allorders() {
  let { Url } = useContext(UserContext);
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  // const { id } = useParams();
  const [id, setid] = useState(0)
  // console.log(id );

  useEffect(() => {
    async function fetchSettings() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(`${Url}companies/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setdata(response.data.data);
        response.data.data.map((data) =>{
          setid(data.id);
        })
        id.map((id) =>{
          console.log(id, "AHHHHHHHHHHHH222HHHHHH");
        })
      
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);



  return (
    <div className="row">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("interviews")} </title>
      </Helmet>

      {loading ? (
        <div>
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
        </div>
      ) : (
        data.map((jobData) => (
          // console.log(jobData.status),
          <div className="col-6 mt-3" key={jobData.id}>
            <div className="">
           
              <div className="box-shado border-r">
           <div className="pt-2 mx-2 d-flex justify-content-between">
          <div>
          <Delatejop id={jobData.id}/>
          </div>
          <div>
            {jobData.status == 1 ?  <div className="cursor-pointer"><p className="text-danger fw-bold"> <ChangejobStatus id={jobData.id}/></p></div> :
             <div className="cursor-pointer"><p className="text-danger fw-bold"> <ChangejobStatus id={jobData.id}/></p></div> }
          </div>
           </div>
                <div className="mx-2">
                  <div className="row">
                    <div className="col-6">
                      <h5 className="pt-3 mx-1 ">{jobData.name}</h5>
                      <div className="pt-2 d-flex">
                        <p className="fw-bold mx-2 font-12"> {t("maincatogry")}</p>
                        <p>{jobData.department.name}</p>
                      </div>
                      <div className="pt-0 d-flex">
                        <p className="fw-bold mx-2 font-12">  {t("experience")}</p>
                        <p>{jobData.category_level}</p>
                      </div>
                      <div className="pt-0 d-flex">
                        <p className="fw-bold mx-2 font-12">  {t("startdate")}</p>
                        <p>{jobData.start}</p>
                      </div>
                  
                    </div>
                    <div className="col-6">
                      {/* <h5 className="pt-3 mx-1 ">{jobData.name}</h5> */}

                      <div className="pt-2 d-flex pt-5">
                        <p className="fw-bold mx-2 font-12"> department</p>
                        <p>{jobData.department.name}</p>
                      </div>
                      <div className="pt-0 d-flex">
                        <p className="fw-bold mx-2 font-12"> {t("skills")}</p>
                        <p>
                          {jobData.skills.map((skill) => skill.name).join(", ")}
                        </p>
                      </div>
                      <div className="pt-0 d-flex">
                        <p className="fw-bold mx-2 font-12">  {t("enddate")}</p>
                        <p>{jobData.end}</p>
                      </div>
                      <div className=" pb-2 ">
                        <div className="pb-2 text-center d-center pt-2">
                          {/* <Link to={`/VeiduoDetails/${jobData.id}`}>
                            <button className="btn-class text-white font-12 bg-color">
                           25555555
                            </button>
                          </Link> */}
                        </div>
                      </div>
                    </div>
                    <div className=" pb-4 text-center d-center">
                        {/* <Link to={`/VeiduoDetails/${jobData.id}`} className="mx-3">
                            <button className="btn-class text-white  bg-color">
                            {t("Interviewvideos")}
                            </button>
                          </Link> */}
                          <Link to={`/Showjobdetails/${jobData.id}`} className="mx-3">
                          <button className="btn-class text-white  bg-color">
                         {t("cv")}
                          </button>
                        </Link> 
                        {/* <Link to={`/ViewCV/${jobData.id}`} className="mx-3">
                          <button className="btn-class text-white  bg-color">
                    {t("ViewCVs")}
                          </button>
                        </Link>
                        <Link to={`/Online/${jobData.id}`} className="mx-3">
                          <button className="btn-class text-white  bg-color">
                          {t("ViewCVonline")}
                          </button>
                        </Link> */}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="container"></div>
    </div>
  );
}
