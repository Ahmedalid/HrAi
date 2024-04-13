import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/Context';
import { toast } from 'react-toastify';

const Cancel = ({ iid, onUpdateData }) => {
  const { Url } = useContext(UserContext);

  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem('UserToken');
      const response = await axios.patch(
        `${Url}companies/subscribes`,
        { subscribe_id: iid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.status === true) {
        // alert(response.data.message)
        toast.success(response.data.message);
        onUpdateData(); // Trigger the callback on successful deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      // toast.error('Error canceling subscription. Please try again.');
    }
  };

  return (
    <>
      <div className='cursor-pointer '  onClick={handleSubscribe}>
      <i class="fa fa-trash text-danger" aria-hidden="true"></i>
      </div>
     
         </>
  );
};

export default Cancel;
