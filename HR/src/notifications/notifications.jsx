import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import NotificationButton from './Sendnotification';
import { UserContext } from '../Context/Context';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [token, setToken] = useState('');
    let { Url} = useContext(UserContext)
    useEffect(() => {
        // استرجاع الرمز المخزن في localStorage
        const storedToken = localStorage.getItem('UserToken');
        
        // تحقق من توفر الرمز قبل إرسال الطلب
        if (storedToken) {
          // إعداد رأس الطلب لتضمين الرمز في الطلب
          const config = {
            headers: {
              'Authorization': `Bearer ${storedToken}` // تعيين رمز الوصول في رأس الطلب
            }
          };
          
          // إجراء طلب GET باستخدام Axios
          axios.get(`${Url}companies/notifications`, config)
            .then(response => {
              // تم التحقق من نجاح الطلب، ويمكنك القيام بما تحتاجه هنا مع البيانات المسترجعة
              setNotifications(response.data.data);
              setToken(storedToken); // حفظ الرمز في state
            })
            .catch(error => {
              // حدثت مشكلة أثناء الطلب، يمكنك القيام بما تحتاجه هنا للتعامل مع الخطأ
              console.error('Error fetching data:', error);
            });
        }
    }, []);

    return (
        <div className="row">
            {notifications.map(notification => (
                <div className="col-4" key={notification.id}>
                    <Toast>
                        <Toast.Header closeButton={false}>
                            <div className="d-flex">
                                <i className="fa-solid fa-bell mt-2"></i>
                                <p className="mx-2 text-danger fw-bold cursor-pointer">
                                    <NotificationButton notificationId={notification.id} token={token} />
                                </p>
                            </div>
                            <strong className="me-auto mx-3">{notification.title}</strong>
                        </Toast.Header>
                        <Toast.Body>{notification.body}</Toast.Body>
                    </Toast>
                </div>
            ))}
        </div>
    );
}
