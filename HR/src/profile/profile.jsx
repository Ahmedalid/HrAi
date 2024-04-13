import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UpdateProfaile from './UpdateProfaile';
import { UserContext } from '../Context/Context';
import { RotateLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const [data, setData] = useState(null);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { Url } = useContext(UserContext);
  const { t , i18n} = useTranslation();

  useEffect(() => {
    async function fetchSettings() {
      try {
        const token = localStorage.getItem('UserToken');
        
        const response = await axios.get(`${Url}companies/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response?.data);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading to false on error
      }
    }

    fetchSettings();
  }, [Url]);

  const handleUpdateClick = () => {
    setIsUpdateVisible(!isUpdateVisible);
  };

  return (
    <div className='container'>
      {isLoading ? (
        // Display a loading message or spinner while data is being fetched
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
      ) : (
        // Display profile data once loading is complete
        <div className="row">
          <div className="col-3">
            <img src={data?.data?.logo} className='w-100' alt="" />
          </div>
          <div className="col-9">
            <div className="border border-1">
              <h5 className='mt-3 text-center'> {t("Profile")}</h5>
              <div className="mx-3 mt-3">
                <div className="d-flex justify-content-between">
                  <p className='fw-bold'>{t("name")}</p>
                  <p className='fw-bold'>{data?.data?.user_name}</p>

                </div>
                <div className="d-flex justify-content-between">
                <p className='fw-bold'> {t("phonenumber")}</p>

                  <p className='fw-bold'>{data?.data?.phone}</p>
                </div>
                <div className="d-flex justify-content-between">
                <p className='fw-bold'>  {t("email")}</p>

                  <p className='fw-bold'>{data?.data?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isUpdateVisible && (
        <div>
          {/* Render the UpdateProfile component when isUpdateVisible is true */}
          <button className="w-100 btn mt-3"> <UpdateProfaile/></button>
        </div>
      )}
    </div>
  );
}
