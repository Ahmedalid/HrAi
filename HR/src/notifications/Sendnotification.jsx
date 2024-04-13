import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const NotificationButton = ({ notificationId, token }) => {
  const markNotificationAsRead = () => {
    const data = { id: notificationId };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.put('https://aihr.ahlanuof.com/api/companies/notifications/mark-read', data, config)
      .then(response => {
        console.log('Notification marked as read:', response.data);
        if(response.data.status == true){
            toast(response.data.message)
        }
      })
      .catch(error => {
        console.error('Error marking notification as read:', error);
      });
  };

  return (
    <button onClick={markNotificationAsRead} className='btn text-success '>
       Read A Massge
    </button>
  );
};

export default NotificationButton;
