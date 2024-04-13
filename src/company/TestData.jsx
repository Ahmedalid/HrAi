import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/Context";

const TestData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [allCV, setAllCV] = useState([]);
  const [downloadedAt, setDownloadedAt] = useState([]);
  let { Url} = useContext(UserContext)

  async function TestData() {
    try {
      const token = localStorage.getItem("UserToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const response = await axios.get(
        `${Url}companies/jobs/39/interview`,
        {
          headers: headers,
        }
      );
  
      setAllCV(response?.data?.data?.interviews);
    //   console.log(allCV.status);
    //   allCV.map((data)=>{
    //     console.log(data.status);
    //   })
  
      const downloadedAtData = response.data.data.cvs;
      if (Array.isArray(downloadedAtData)) {
        setDownloadedAt(downloadedAtData.map(data => data.downloaded_at));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    TestData();
  }, []); // Unconditionally call useEffect
  

};

export default TestData;
