import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/Context';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import VerticalBarChart from './VerticalBarChart';


export default function Home() {
  const { t } = useTranslation();

  let { Url, dataas, setData , company_name} = useContext(UserContext);
const [response, setresponse] = useState([])

  // console.log(setData, "setDatasetDatasetDatasetData0000");
  let logoProful = setData?.data?.data?.logo
  let username = setData?.data?.data?.company_name 
  // console.log(logoProful);
  // console.log(setData.data.data.user_name);
  useEffect(() => {
    async function fetchSettings() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(`${Url}companies/statistics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(company_name, "resp00ahmed0onse");
        setresponse(response)
        // setdata(response.data.data.length);
        // console.log(response.data.data.length);
        // setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // console.error("Error fetching data:", error);
        // setLoading(false); // Set loading to false if there's an error
      }
    }

    fetchSettings();
  }, []);

 
  
  
  

  
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title> {t("Homepage")} </title>
    </Helmet>
    <div className="container mt-5">
      <div className='row mb-5'>
        <div className="col-2 ">
          <div className='d-flex'>
            <div className='d-flex w-100'>
              <img src={logoProful} className='h-155 w-100 border-r' />
            </div>
   
          </div>

        </div>
        <div className='col-4'>
          <div className='d-center flex-column bg-color border-radius h-100 border-r'>
            <div className='d-flex pt-3'>
              <p className='text-white fw-bold mx-4'> {t("Postedjobs")}</p>

              <p className='text-white fw-bold'><i class="fa fa-paper-plane" aria-hidden="true"></i></p>
            </div>
            <p className='text-white fw-bold'>{dataas}</p>

          </div>
        </div>
        <div className='col-4'>
          <div className='d-center flex-column bg-dang h-100'>
            <div className='d-flex pt-3'>
              <p className='text-white fw-bold mx-4'> {t("cv")}  </p>

              <p className='d-center w-icone fw-bold'><i class="fa-solid fa-user"></i></p>
            </div>
            <div className='w-50 mx-auto'>
              <div className='d-flex justify-content-between'>
                <p className='text-white fw-bold'>{t("All")}</p>
                <p className='text-white fw-bold'>{t("opened")}</p>
              </div>
              <div className='d-flex justify-content-between pt-0 mt-0'>
                <p className='text-white fw-bold mx-2'>{response?.data?.data.cvs}</p>
                <p className='text-white fw-bold mx-3'>{response?.data?.data.opened_cvs}</p>
              </div>

            </div>
            {/* <p className='text-white fw-bold'>{dataas}</p> */}

          </div>
        </div>
        <div className="col-2">
        <div className='w-100 text-center'>
              <h5 className=' mt-0 fw-bold'>{username}</h5>
              <Link to={"/Packages"} className='  fw-bold text-danger  mt-5'> <button className='btn mt-4 text-white  bg-color font-14'>    {t("editfile")}   </button></Link>
              <Link to="/Companies" className='mt-5'>  <button className='btn mt-4 text-white  bg-color'>    {t("Addajob")}  </button></Link>


            </div>
        </div>
      </div>
    </div>
    <div className="mt-5 col-12">
   <VerticalBarChart/>
</div>


  </>
}
