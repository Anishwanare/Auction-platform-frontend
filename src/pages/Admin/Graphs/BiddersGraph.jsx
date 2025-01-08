import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const BiddersGraph = () => {
  const { allUsers } = useSelector((state) => state.SuperAdmin);

  // Preprocess the data to count the number of users registered per month
  const monthlyBidders = Array(12).fill(0); // Initialize an array for 12 months

  const bidders = allUsers.filter((bidder) => {
    return bidder?.role === "Bidder"
  })


  bidders?.forEach((user) => {
    const month = new Date(user.createdAt).getMonth(); // Assuming each user has a `createdAt` field
    monthlyBidders[month] += 1; // Increment the count for the corresponding month
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Bidders Chart`,
        font: {
          size: 20,
        },
        color: "#a81cd2",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
          },
          stepSize: 1,
          color: "#1b9f14",
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
          color: "#8f15a2",
        },
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Bidders Registered',
        data: monthlyBidders,
        borderColor: '#1c9e23',
        backgroundColor: 'rgba(28, 158, 35, 0.2)',
        tension: 0.4, // Smooth curves
        pointBorderColor: '#1b9f14',
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700 mb-4 text-center">
          Bidders Overview
        </h2>
        <div className="h-72 sm:h-80 md:h-96 lg:h-[500px]">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default BiddersGraph;
