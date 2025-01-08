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

const UsersGraph = () => {
  const { allUsers } = useSelector((state) => state.SuperAdmin);

  // Initialize data arrays for Auctioneers and Bidders
  const monthlyAuctioneers = Array(12).fill(0);
  const monthlyBidders = Array(12).fill(0);

  // Iterate through users and classify by role and registration month
  allUsers?.forEach((user) => {
    const month = new Date(user.createdAt).getMonth();
    if (user.role === 'Auctioneer') {
      monthlyAuctioneers[month] += 1;
    } else if (user.role === 'Bidder') {
      monthlyBidders[month] += 1;
    }
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
        text: `Auctioneer and Bidder Registration Chart`,
        font: {
          size: 20,
        },
        color: "#a81cd2",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max:50,
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
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
        label: 'Auctioneers Registered',
        data: monthlyAuctioneers,
        borderColor: '#1c9e23',
        backgroundColor: 'rgba(28, 158, 35, 0.2)',
        tension: 0.4,
        pointBorderColor: '#1b9f14',
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'Bidders Registered',
        data: monthlyBidders,
        borderColor: '#1547a2',
        backgroundColor: 'rgba(21, 71, 162, 0.2)',
        tension: 0.4,
        pointBorderColor: '#1234af',
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700 mb-4 text-center">
          Auctioneers and Bidders Overview
        </h2>
        <div className="h-72 sm:h-80 md:h-96 lg:h-[500px]">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default UsersGraph;
