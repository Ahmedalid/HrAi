import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/Context';
import {Helmet} from "react-helmet";

export default function Subscriptions() {

  let { Url} = useContext(UserContext)
const [data, setdata] = useState(0)
  useEffect(() => {
    async function fetchSettings() {
      try {
        // استرجاع التوكن من localStorage
        const token = localStorage.getItem('UserToken');
        
        // قم بإضافة التوكن إلى رأس الطلب
        const response = await axios.get(`${Url}employees/settings/about_us`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data , 'response');
        setdata(response.data.data)
        console.log(data.name);
        // setData(response?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchSettings();
  }, []);

  return <>
  <div className="container mt-5" >

  <Helmet>
        <meta charSet="utf-8" />
        <title>About us </title>
      </Helmet>

<div className="d-flex">
<p className='fw-bold mx-3'>name</p>
  {data.name}
</div>

<div className="d-flex">
<p className='fw-bold mx-3'>value</p>
  {data.value}
</div>

<div className="d-flex">
<p className='fw-bold mx-3'>value_ar</p>
  {data.value_ar}
</div>

<div className="d-flex">
<p className='fw-bold mx-3'>value_en</p>
  {data.value_en}
</div>
  </div>
  </>
}