import Spinner from '@/custom-components/Spinner';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const LeaderBoard = () => {
  const { leaderBoard, loading } = useSelector((state) => state.User);


  return (
    <div className="p-4 sm:p-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900">
        Auction Leaderboard
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : leaderBoard && leaderBoard.length > 0 ? (
        <div className="overflow-x-auto sm:overflow-hidden">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-2 sm:px-4 text-center text-sm sm:text-lg font-medium text-gray-700">
                  Rank
                </th>
                <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-lg font-medium text-gray-700">
                  User
                </th>
                <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-lg font-medium text-gray-700">
                  Expenditure (₹)
                </th>
                <th className="py-2 px-2 sm:px-4 text-center text-sm sm:text-lg font-medium text-gray-700">
                  Auctions Won
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderBoard.slice(0, 10).map((member, index) => (
                <tr
                  key={member._id}
                  className="border-b hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  <td className="py-2 px-2 sm:px-4 text-center font-medium text-gray-800">
                    {index + 1}.
                  </td>
                  <td className="py-2 px-2 sm:px-4 flex items-center">
                    <img
                      src={member.profileImage?.url}
                      alt={member.userName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-4"
                    />
                    <span className="font-semibold text-gray-800">{member.userName}</span>
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-gray-800">
                    ₹{member.moneySpend.toLocaleString()}/-
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-center text-gray-800">
                    {member.auctionWon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base lg:text-lg">
          Get ready to bid and rise on the leaderboard! 🌟
        </p>
      )}

      <div className="text-center pt-6">
        <Link
          to="/leaderboardpage"
          className="text-indigo-600 hover:underline hover:text-violet-600 text-sm sm:text-base lg:text-lg"
        >
          Go to Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default LeaderBoard;
