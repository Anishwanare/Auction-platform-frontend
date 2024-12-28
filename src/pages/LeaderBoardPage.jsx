import Spinner from '@/custom-components/Spinner';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LeaderBoardPage = () => {
  const { leaderBoard, loading, isAuthenticated } = useSelector((state) => state.User);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 results per page
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      toast.warning("Login to see leaderBoard ");
    }
  }, [isAuthenticated, navigate]);

  // Handle pagination and slice the data based on the current page
  const indexOfLastMember = currentPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const currentLeaderBoard = leaderBoard.slice(indexOfFirstMember, indexOfLastMember);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(leaderBoard.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen lg:pl-[360px]">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
            Top 100 Auction Leaders
          </h2>
          {leaderBoard && leaderBoard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-4 text-left text-lg font-medium text-gray-700">
                      Rank
                    </th>
                    <th className="py-3 px-4 text-left text-lg font-medium text-gray-700">
                      User
                    </th>
                    <th className="py-3 px-4 text-left text-lg font-medium text-gray-700">
                      Expenditure (₹)
                    </th>
                    <th className="py-3 px-4 text-left text-lg font-medium text-gray-700">
                      Auctions Won
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeaderBoard.map((member, index) => (
                    <tr
                      key={member._id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-800 font-semibold">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="py-4 px-4 flex items-center">
                        <img
                          src={member.profileImage?.url}
                          alt={member.userName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <span className="font-semibold text-gray-800">
                          {member.userName}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-800">
                        ₹{member.moneySpend.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-800">
                        {member.auctionWon}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-4">
              No auction leaders available yet. Participate to see your rank!
            </p>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-md mx-1`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderBoardPage;
