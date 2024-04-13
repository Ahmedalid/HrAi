import React, { useContext, useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { UserContext } from '../../Context/Context';
import axios from 'axios';
import { RotateLoader } from 'react-spinners';
const ChartContainer = () => {
  const chartRef = useRef(null);
  const { Url } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchSettings() {
      try {
        const token = localStorage.getItem('UserToken');
        const response = await axios.get(`${Url}companies/statistics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response?.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const chartData = {
    labels: ['CV', 'Hired', 'Rejected', 'jobs'],
    datasets: [{
      label: 'cv',
      data: [data.cvs, data.opened_cvs, data.download_cvs, data.jobs],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', `#259995`],
      hoverOffset: 4,
      barThickness: 40,
    }],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'end',
        offset: -10,
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        display: 'auto',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
  };
  

  useEffect(() => {
    if (!isLoading && chartRef.current) { // Only create chart if data is loaded
      chartRef.current.destroy();

      const ctx = document.getElementById('your-chart');

      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: options,
        });
      }
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [isLoading, chartData, options]);

  return (
    <div>
      {isLoading ? (
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
        <Bar data={chartData} height={250} width={1000} />
      )}
    </div>
  );
};
export default ChartContainer;

