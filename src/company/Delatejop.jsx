import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../Context/Context';

const Delatejop = ({ id, onDeleteSuccess }) => {
  const { Url } = useContext(UserContext);
  
  const handleS = async () => {
    try {
      const token = localStorage.getItem('UserToken');
      const response = await axios.delete(
        `${Url}companies/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.status === true) {
        toast.success(response.data.message);
        onDeleteSuccess(); // تحديث البيانات بعد الحذف
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  return (
    <div className='cursor-pointer ' onClick={handleS}>
      <i className="fa fa-trash text-danger" aria-hidden="true"></i>
    </div>
  );
};

export default Delatejop;
