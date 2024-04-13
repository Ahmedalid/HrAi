import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/Context';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ChangejobStatus = ({ id }) => {
  const { Url } = useContext(UserContext);
  const [data, setdata] = useState([]);
  const { t, i18n } = useTranslation();


  const handleS = async () => {
    try {
      const token = localStorage.getItem('UserToken');

      // Determine the new status based on the current status
      const newStatus = data == true ? 0 : 1;

      const response = await axios.patch(
        `${Url}companies/jobs/change-status/${id}`,
        { status: newStatus }, // Send the new status to the backend
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.data.status, "assssss");
      setdata(newStatus);

      if (response.data.status === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error changing job status:', error);
      toast.error('Error changing job status. Please try again.');
    }
  };

  return (
    <>
      <div className='cursor-pointer ' onClick={handleS}>
        {data == true ? (
          <p className='text-danger cursor-pounter fw-bold' >    {t("inactive")}  </p>
        ) : (
          <p className='text-green cursor-pounter fw-bold'>{t("effective")}</p>
        )}
      </div>
    </>
  );
};

export default ChangejobStatus;
