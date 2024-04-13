import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
// import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../Context/Context';

export default function UpdateProfaile() {
    let { Url} = useContext(UserContext)
    // let { BasUrl3 , en} = useContext(UserContext)
    // استخدام useContext للوصول إلى الحالة والدوال من UserContext
    // let { setUserToken, setUserData } = useContext(UserContext);
    const { t } = useTranslation();
    // useState لإدارة حالة النجاح في التحديث والأخطاء والتحميل
    let [updateSuccess, setUpdateSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Hook من React Router DOM للانتقال بين الصفحات
    let navigate = useNavigate();

    // دالة تنفيذ عملية التحديث عبر الطلب الى السيرفر
    async function handleLoginSubmit(values) {
        try {
            // الحصول على رمز الوصول من التخزين المحلي
            const token = localStorage.getItem('UserToken');

            // تعيين قيمة التحميل إلى true
            setIsLoading(true);

            // إجراء طلب PUT لتحديث ملف التعريف الشخصي
            const { data } = await axios.post(
                `${Url}companies/profile`,
                values, // قيم الحقول من النموذج
                {
                    headers: {
                        Authorization: `Bearer ${token}` // إرسال رمز الوصول
                    }
                }
            );

            // التحقق من نجاح الطلب
            if (data.status === true) {
                // إذا نجح، قم بتحديث الحالة والمعلومات المستلمة
                setIsLoading(false);
             
           
                setUpdateSuccess(true); // تعيين حالة النجاح إلى true
            }
        } catch (error) {
            // التعامل مع الأخطاء في حالة فشل الطلب
            setIsLoading(false);
            if (error.response) {
                setError(error.response.data.message); // رسالة الخطأ من الاستجابة
            } else {
                setError("An error occurred"); // رسالة خطأ عامة
            }
        }
    }

    // نموذج Yup schema للتحقق من الحقول المدخلة
    // const egyptianPhoneNumberPattern = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
    let validationSchema = yup.object({
        user_name: yup.string().required("Name is required"),
        email: yup.string().required("email  is required"),
        phone: yup.string().required("Address is required"),
        location_id: yup.string().required("Address is required"),
        address: yup.string().required("Address is required"),
        sub_category_id: yup.string().required("Address is required"),
        // device_token: null,
        // company_name: null,
        // main_category_id: null,
        // prefix: null,
        // logo: yup
        // .mixed(),
      
      
      
    });

    let formik = useFormik({
        initialValues: {
            user_name: "",
            email: "",
            phone: "",
            location_id: "",
            address: "",
            device_token: null,
            company_name: "02",
            main_category_id: "2000",
            prefix: "",
            logo: "",
        },
        validationSchema,
        onSubmit: handleLoginSubmit // دالة التقديم
    });

    return (
        <div className='w-75 mx-auto py-5'>
            {updateSuccess && (
                <div className='alert alert-success'>{t('Profilesuccessfully')}</div>
            )}

            {error && <div className='alert alert-danger'>{error}</div>}

            <form onSubmit={formik.handleSubmit}>
                <h5 className='fw-bold text-center'>{t('update')}</h5>

                {/* حقول الإدخال */}
                <label htmlFor='user_name' className='mt-3 d-flex'>{t("name")}:</label>
                <input type='text' className='form-control mt-2' id="name" onBlur={formik.handleBlur} name='user_name' value={formik.values.user_name} onChange={formik.handleChange} />
                {formik.errors.user_name && formik.touched.user_name && <div classuser_name='alert alert-danger'>{formik.errors.user_name}</div>}



                <label htmlFor='email' className='mt-3 d-flex'>{t("email")}:</label>
                <input type='tel' className='form-control mt-2' id="email" onBlur={formik.handleBlur} name='email' value={formik.values.email} onChange={formik.handleChange} />
                {formik.errors.email && formik.touched.email && <div className='alert alert-danger'>{formik.errors.email}</div>}



                <label htmlFor='phone' className='mt-3 d-flex'>{t("phone")}:</label>
                <input type='text' className='form-control mt-2' id="phone" onBlur={formik.handleBlur} name='phone' value={formik.values.phone} onChange={formik.handleChange} />
                {formik.errors.phone && formik.touched.phone && <div className='alert alert-danger'>{formik.errors.phone}</div>}


                <label htmlFor='address' className='mt-3 d-flex'>{t("address")}:</label>
                <input type='text' className='form-control mt-2' id="address" onBlur={formik.handleBlur} name='address' value={formik.values.address} onChange={formik.handleChange} />
                {formik.errors.address && formik.touched.address && <div className='alert alert-danger'>{formik.errors.address}</div>}


                <label htmlFor='prefix' className='mt-3 d-flex'>prefix:</label>
                <input type='text' className='form-control mt-2' id="prefix" onBlur={formik.handleBlur} name='prefix' value={formik.values.prefix} onChange={formik.handleChange} />
                {formik.errors.prefix && formik.touched.prefix && <div className='alert alert-danger'>{formik.errors.prefix}</div>}


                <label htmlFor='logo' className='mt-3 d-flex'>logo:</label>
                <input type='file' className='form-control mt-2' id="logo" onBlur={formik.handleBlur} name='logo' value={formik.values.logo} onChange={formik.handleChange} />
                {formik.errors.logo && formik.touched.logo && <div className='alert alert-danger'>{formik.errors.logo}</div>}


                {isLoading ? (
    <button className='btn bg-main btn-add-card mt-2' type="button">
        <i className="fas fa-spinner fa-spin"></i> Loading...
    </button>
) : (
    <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-add-card w-100 border-radius p-8' type="submit">
      Update Profile
    </button>
)}


                {/* نص إشارة الموقع */}
                {/* <p className='mt-4'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply</p> */}
            </form>
        </div>
    );
}
