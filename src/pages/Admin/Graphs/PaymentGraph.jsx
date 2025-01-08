import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.SuperAdmin);

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
        text: `Monthly Revenue Chart - ${new Date().getFullYear()}`,
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
          stepSize: 2000,
          color: "#1b9f14",
        },
        suggestedMax: Math.max(20000, ...(monthlyRevenue || [0])),
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
        label: 'Total Payment Received',
        data: monthlyRevenue || Array(12).fill(0),
        backgroundColor: '#1c9e23',
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700 mb-4 text-center">
          Payment Overview
        </h2>
        <div className="h-72 sm:h-80 md:h-96 lg:h-[500px]">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default PaymentGraph;
