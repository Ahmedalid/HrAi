import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/Context';
import Cancel from './Cancel';
import { RotateLoader } from 'react-spinners';
import { Helmet } from "react-helmet";

export default function Subscription() {
  const { Url } = useContext(UserContext);
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Define fetchSettings outside useEffect
  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('UserToken');
      const response = await axios.get(`${Url}companies/subscribes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setdata(response.data.data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [Url]); // Depend on Url to trigger re-fetch when it changes

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Subscriptions </title>
      </Helmet>

      {isLoading ? (
        <div className='d-center mt-5'>
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
        <div className="row">
          {data?.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={item.id}>
              <div className=" border-defalte     position-relative h-100">
                <div className="text-center mt-3">
                  <div className="pt-3 d-center flex-column pb-3">
                    <p className="mx-3">{item?.package?.name_en}</p>
                    <p className=" w-50 d-center buttonbtn text-white">
                      Yearly {item?.package?.price}$
                    </p>
                    <p className="">Number Of Cv's {item?.cvs}</p>
                    <p className="">Number Of jobs {item?.jobs}</p>
                    <div className="mt-2">
                      <p>
                        Start Date{' '}
                        <span className="fw-bold">{item?.start}</span>
                      </p>
                      <p>
                        End Date <span className="fw-bold">{item?.end}</span>
                      </p>
                    </div>
                  </div>
                  <div className='position-absolute top-0 mx-3 mt-2'>
                    <Cancel iid={item?.id} onUpdateData={fetchSettings} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
