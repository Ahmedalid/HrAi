import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/Context";
import axios from "axios";
import { RotateLoader } from "react-spinners";
import { toast } from 'react-toastify';
import {Helmet} from "react-helmet";
import { useTranslation } from "react-i18next";

export default function Employees() {
  const { Url } = useContext(UserContext);
  const { t } = useTranslation();

  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribedItemId, setSubscribedItemId] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const token = localStorage.getItem("UserToken");
        const response = await axios.get(`${Url}companies/packages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setdata(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSettings();
  }, []);

  const handleSubscribe = async (id) => {
    try {
      const token = localStorage.getItem("UserToken");
      const response = await axios.post(
        `${Url}companies/subscribes`,
        { package_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.data.status == true){
        toast.success(   response.data.message  , {
          position: 'top-center'
        })
      }

      console.log("Subscription successful:", response.data);

      // Set the subscribed item's ID
      setSubscribedItemId(id);

      // Optionally, you can reset the subscribed item's ID after a certain time
      setTimeout(() => {
        setSubscribedItemId(null);
      }, 5000); // 5000 milliseconds (5 seconds)
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <>

<Helmet>
                <meta charSet="utf-8" />
                <title>{t("allpackages")}  </title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>

      <div className="container">
        <div className="row">
          {loading ? (
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
            data?.map((item, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={item.id}>
                <div className=" border-defalte h-100">
                  <div className="text-center">
                    <div className="pt-3 d-center flex-column pb-3">
                      <p className="">{item.name_en}</p>
                      <p className="fw-bold w-50 d-center buttonbtn text-white">
                        Yearly {item.price}$
                      </p>
                      <p className="">Number Of Cv's {item.cvs}</p>
                      <p className="">Number Of jobs {item.jobs}</p>

                      <button
                        className="btn btn-dark "
                        onClick={() => handleSubscribe(item.id)}
                      >
                        {t("language")}
                      </button>

                      {subscribedItemId === item.id && (
                        <div className="mt-2 text-success">
                        {
                             toast.success(data.message, {
                              position: 'top-center'
                            })
                        }
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
