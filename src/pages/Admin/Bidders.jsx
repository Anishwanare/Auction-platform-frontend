import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/custom-components/Spinner";
import { deleteBidders, fetchAllUsers } from "@/store/slices/superAdminSlice";
import { toast } from "react-toastify";

const Bidders = () => {
  const [bidders, setBidders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Show 6 bidders per page

  const { allUsers, loading } = useSelector((state) => state.SuperAdmin);
  const dispatch = useDispatch();

  // Memoize filtered bidders to avoid re-computation on every render
  const filterBidders = useMemo(() => allUsers.filter((user) => user?.role === "Bidder"), [allUsers]);

  useEffect(() => {
    setBidders(filterBidders);
  }, [filterBidders]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Handle pagination and slice the array based on current page
  const indexOfLastBidder = currentPage * itemsPerPage;
  const indexOfFirstBidder = indexOfLastBidder - itemsPerPage;
  const currentBidders = bidders.slice(indexOfFirstBidder, indexOfLastBidder);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteBidder = (id) => {
    console.log(id)

    const wannaDelete = window.confirm("Are you sure want to remove this bidder?");
    if (!wannaDelete) {
      return toast.success("Bidder is safe")
    }
    dispatch(deleteBidders(id))
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const totalPages = Math.ceil(bidders.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen lg:pl-[320px]">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Bidders List</h2>

      {bidders.length === 0 ? (
        <p className="text-lg text-gray-500">No bidders found.</p>
      ) : (
        <div className="space-y-4">
          {currentBidders.map((bidder) => (
            <div
              key={bidder.id}
              className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium text-gray-800">{bidder.userName}</h3>
                  <p className="text-gray-600">{bidder.email}</p>
                  <p className="text-gray-600">Auction Won: {bidder.auctionWon}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => console.log(`Update bidder with ID: ${bidder._id}`)}
                    className="text-yellow-600 hover:text-yellow-700 font-semibold"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteBidder(bidder._id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => console.log(`View auctions for bidder with ID: ${bidder.id}`)}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    View Win Auctions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md mr-2 ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700"
            }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md mx-1 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ml-2 ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Bidders;
