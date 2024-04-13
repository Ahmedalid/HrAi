import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { UserContext } from '../Context/Context';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RotateLoader } from 'react-spinners';

export default function Online() {
    const [dawinloandate, setdawinloandate] = useState([]);
    const [activeValue, setActiveValue] = useState(false);
    const [cv, setcv] = useState([]);
    const { Url } = useContext(UserContext);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true); // حالة التحميل

    // console.log(id, "ididididdidi");
    const { t } = useTranslation();

    const fetchInterviewsData = async () => {
        try {
            const token = localStorage.getItem("UserToken");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(
                `${Url}companies/jobs/${id}/interview`,
                { headers: headers }
            );
            setdawinloandate(response.data.data.interviews);
            setActiveValue(true);
        } catch (error) {
            // التعامل مع الخطأ هنا
            console.error("Error fetching interviews data:", error);
        }

    };

    useEffect(() => {
        fetchInterviewsData();
    }, []);
    function chunkArray(array, size) {
        return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
            array.slice(index * size, index * size + size)
        );
        
    }
    useEffect(() => {
        // اقرأ البيانات هنا
        // بعد اكتمال التحميل، غير حالة التحميل
        setIsLoading(false);
      }, []); // يتم تشغيل هذا الأثر مرة واحدة بمجرد تحميل المكون
    return (
        <>

<ul class="nav nav-tabs d-flex justify-content-between" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">online</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">تم عمل  المقابله</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">لم يتم عمل  المقابله</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tabb" data-bs-toggle="tab" data-bs-target="#contactt" type="button" role="tab" aria-controls="contactt" aria-selected="false"> حالة السيره الذاتيه</button>
  </li>

</ul>
<div class="tab-content" id="myTabContent">


<div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
      {chunkArray(dawinloandate.filter(data => data.type === "online"), 4).map((group, groupIndex) => (
        <div key={groupIndex} className="row">
          {group.map((data, index) => (
            <div key={index} className="col-md-4">
              <div className='boxShado text-center'>
                <img src={`https://aihr.ahlanuof.com/${data.employee.image}`} alt="CV" className="cv-image pt-2" />
                <div className="d-center">
                  <a href={`https://aihr.ahlanuof.com/${data.employee.cv}`} className="d-center" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-cv mt-1 font-12 d-center">
                      {t("ViewCV")}
                    </button>
                  </a>
                  <Link to={`/VeiduoDetails/${data.employee.id}`} className="mx-3 ">
                    <button className="btn-class text-white  bg-color px-4 pt-2 d-center pb-2">
                      {t("moro")}
                    </button>
                  </Link>
                </div>
                <div className="d-flex mx-3 mt-3">
                  <p className='mx-2 fw-bold'> {t("email")}</p>
                  <p className='text-color'>{data.employee.email}</p>
                </div>
                <div className="d-flex mx-4 pt-0">
                  <p className='mx-3 fw-bold pt-0 mt-0'> {t("name")}</p>
                  <p className='text-color pt-0 mt-0'>{data.employee.custom_name}</p>
                </div>
                <div className="d-flex mx-4  pt-0">
                  <p className='mx-3 fw-bold pt-0 mt-0'> {t("startdate")}</p>
                  <p className='text-color pt-0 mt-0'>{data.start}</p>
                </div>
                {/* إضافة نص عند التحميل */}
                {isLoading && (
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
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    
    <div className="tab-pane fade mt-2" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  {dawinloandate.length === 0 ? (
    <div className="text-center">
        <h2 className='fw-bold text-center text-color mt-5'>{t("display")}</h2>
    </div>
  ) : (
    <div className="pb-3 text-center row">
      {dawinloandate.map((item, index) => {
        // تحقق مما إذا كانت البيانات متوفرة ونوعها "online" ولم يتم عرض الرسالة بالفعل
        if (item.video !== null && item.type === "online") {
          return (
            <div key={index} className="col-md-4">
              <div className='boxShado'>
                <img src={`https://aihr.ahlanuof.com/${item.employee.image}`} alt="CV" className="cv-image" />
                <div className="d-center">
                  <a href={`https://aihr.ahlanuof.com/${item.employee.cv}`} className="d-center" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-cv mt-1 font-12 d-center">
                      {t("ViewCV")}
                    </button>
                  </a>
                  <Link to={`/VeiduoDetails/${item.employee.id}`} className="mx-3 ">
                    <button className="btn-class text-white bg-color px-4 pt-2 d-center pb-2">
                      {t("moro")}
                    </button>
                  </Link>
                </div>
                <div className="d-flex mx-3 mt-3">
                  <p className='mx-2 fw-bold'> {t("email")}</p>
                  <p className='text-color'>{item.employee.email}</p>
                </div>
                <div className="d-flex mx-4 pt-0">
                  <p className='mx-3 fw-bold pt-0 mt-0'> {t("name")} </p>
                  <p className='text-color pt-0 mt-0'>{item.employee.custom_name}</p>
                </div>
                <div className="d-flex mx-4  pt-0">
                  <p className='mx-3 fw-bold pt-0 mt-0'> {t("startdate")}</p>
                  <p className='text-color pt-0 mt-0'>{item.start}</p>
                </div>
              </div>
            </div>
          );
        } else if (item.video === null && item.type === "online") {
          // تحقق مما إذا تم عرض الرسالة بالفعل
          if (index === 0) {
            return (
              <div key={index} className="">
                <h2 className='fw-bold d-center text-color mt-5'>{t("display")}</h2>
              </div>
            );
          } else {
            return null; // لا تقوم بإعادة عرض الرسالة إذا تم عرضها بالفعل
          }
        }
        return null;
      })}
    </div>
  )}
</div>



    <div class="tab-pane fade mt-2" id="contact" role="tabpanel" aria-labelledby="contact-tab">
      {chunkArray(dawinloandate.filter(data => data.video === null && data.type === "online"), 4).map((group, groupIndex) => (
        <div key={groupIndex} className="pb-3 text-center row">
          {group.map((item, index) => {
            if (item.video == null) {
              return (
                <div key={index} className="col-md-4">
                  <div className='boxShado'>
                    <img src={`https://aihr.ahlanuof.com/${item.employee.image}`} alt="CV" className="cv-image" />
                    <div className="d-center">
                      <a href={`https://aihr.ahlanuof.com/${item.employee.cv}`} className="d-center" target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-cv mt-1 font-12 d-center">
                          {t("ViewCV")}
                        </button>
                      </a>
                      <Link to={`/VeiduoDetails/${item.employee.id}`} className="mx-3 ">
                        <button className="btn-class text-white bg-color px-4 pt-2 d-center pb-2">
                          {t("moro")}
                        </button>
                      </Link>
                    </div>
                    <div className="d-flex mx-3 mt-3">
                      <p className='mx-2 fw-bold'> {t("email")}</p>
                      <p className='text-color'>{item.employee.email}</p>
                    </div>
                    <div className="d-flex mx-4 pt-0">
                      <p className='mx-3 fw-bold pt-0 mt-0'> {t("name")}</p>
                      <p className='text-color pt-0 mt-0'>{item.employee.custom_name}</p>
                    </div>
                    <div className="d-flex mx-4  pt-0">
                      <p className='mx-3 fw-bold pt-0 mt-0'> {t("startdate")}</p>
                      <p className='text-color pt-0 mt-0'>{item.start}</p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <h2 key={index} className='text-center fw-bold mt-5 '>{t("display")}</h2>
              );
            }
          })}
        </div>
      ))}
    </div>


    <div class="tab-pane fade mt-2" id="contactt" role="tabpanel" aria-labelledby="contact-tabb">
    {dawinloandate.length === 0 ? (
        <div className="text-center">
            <h2 className='fw-bold text-center'>{t("display")}</h2>
        </div>
    ) : (
        <div className="pb-3 text-center row">
            {dawinloandate.map((item, index) => {
                if (item.type === "online") {
                    return (
                        <div key={index} className="col-md-4">
                            <div className='boxShado'>
                                <img src={`https://aihr.ahlanuof.com/${item.employee.image}`} alt="CV" className="cv-image" />
                                <div className="d-center">
                                    <a href={`https://aihr.ahlanuof.com/${item.employee.cv}`} className="d-center" target="_blank" rel="noopener noreferrer">
                                        <button className="btn btn-cv mt-1 font-12 d-center">
                                            {t("ViewCV")}
                                        </button>
                                    </a>
                                    <Link to={`/VeiduoDetails/${item.employee.id}`} className="mx-3 ">
                                        <button className="btn-class text-white bg-color px-4 pt-2 d-center pb-2">
                                            {t("moro")}
                                        </button>
                                    </Link>
                                </div>
                                <div className="d-flex mx-5 pt-3">
                                    <p className='mx-2 fw-bold text-danger'>  {t("CVstatus")} </p>
                                    {item.status === "pending" && (
                                        <p className='text-color text-danger'> {t("accepted")} </p>
                                    )}
                                    {item.status === "progress" && (
                                        <p className='text-color text-danger'> {t("Inprogress")} </p>
                                    )}
                                    {item.status === "done" && (
                                        <p className='text-color text-danger'> {t("done")} </p>
                                    )}
                                    {item.status === "hired" && (
                                        <p className='text-color text-danger'>موظف</p>
                                    )}
                                    {item.status === "rejected" && (
                                        <p className='text-color text-danger'>{t("rejected")} </p>
                                    )}
                                </div>
                                <div className="d-flex mx-3">
                                    <p className='mx-2 fw-bold'>{t("email")}</p>
                                    <p className='text-color'>{item.employee.email}</p>
                                </div>
                                <div className="d-flex mx-4 pt-0">
                                    <p className='mx-3 fw-bold pt-0 mt-0'>{t("name")}</p>
                                    <p className='text-color pt-0 mt-0'>{item.employee.custom_name}</p>
                                </div>
                                <div className="d-flex mx-4  pt-0">
                                    <p className='mx-3 fw-bold pt-0 mt-0'>{t("startdate")}</p>
                                    <p className='text-color pt-0 mt-0'>{item.start}</p>
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    )}
</div>





</div>



      
        </>
    );
}
