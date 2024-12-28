import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AuctioneerAuctionItemDetail = () => {
  const { id } = useParams();
  const { isAuthenticated} = useSelector((state) => state.User);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [auctionDetails, setAuctionDetails] = useState(null);
  const [auctionBidders, setAuctionBidders] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAuctionDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/auction/details/${id}`,
        { withCredentials: true }
      );
      setAuctionDetails(response.data?.auctionItem || {});
      setAuctionBidders(response.data?.bidders || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load auction details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctionDetails();
    const interval = setInterval(fetchAuctionDetails, 1000);
    return () => clearInterval(interval);
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to place a bid.");
      navigate("/login");
      return;
    }
    if (amount <= 0) {
      toast.error("Bid amount must be greater than 0.");
      return;
    }
    if (Date.now() > new Date(auctionDetails.endTime)) {
      toast.error("The auction has ended. You cannot place a bid.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("amount", amount);

      dispatch(placebids(id, formData));
      setAmount("");
      fetchAuctionDetails();
    } catch (error) {
      toast.error("Failed to place bid. Please try again.");
    }
  };

  const rankedBidders = [...auctionBidders].sort(
    (a, b) => (b.amount || 0) - (a.amount || 0)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-700 animate-pulse">
          Loading auction details...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:pl-[320px]">
      {auctionDetails ? (
        <>
          {/* Auction Details Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row md:space-x-6">
            <div className="md:w-1/2">
              <img
                src={
                  auctionDetails.itemImage?.url ||
                  "https://via.placeholder.com/400"
                }
                alt={auctionDetails.title || "Auction Item"}
                className="w-full h-64 rounded-lg object-cover shadow-md"
              />
            </div>
            <div className="mt-6 md:mt-0 md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {auctionDetails.title || "Untitled Auction"}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {auctionDetails.description || "No description available."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Category :
                  </span>
                  <span className="ml-2 text-green-600">
                    {auctionDetails?.category}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Starting Bid:
                  </span>
                  <span className="ml-2 text-green-600">
                    ₹{auctionDetails.startingBid || 0}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="font-semibold text-gray-700">Condition:</span>
                  <span className="ml-2 text-orange-600">
                    {auctionDetails.condition || "Unknown"}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Auction Ends:
                  </span>
                  <span className="ml-2 text-red-600">
                    {auctionDetails.endTime
                      ? new Date(auctionDetails.endTime).toLocaleString()
                      : "No end time provided"}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bidders Section */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10">Bidders: {auctionBidders.length} </h2>
          {auctionBidders.length > 0 ? (
            <div className="bg-white shadow-lg rounded-lg p-6 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {rankedBidders.map((bidder, index) => (
                <div
                  key={bidder.userId || index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-around ">
                    <div className="flex items-center gap-5">

                      <p className={`${index + 1 === 1 || index + 2 === 2 || index + 3 === 3 ? "text-green-500 text-2xl font-bold" : "text-gray-500"}`}>{index + 1} )</p>
                      <img
                        src={
                          bidder.profileImage || "https://via.placeholder.com/40"
                        }
                        alt={bidder.userName || "Anonymous"}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold">
                        {bidder.userName || "Anonymous"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {bidder.createdAt
                          ? new Date(bidder.createdAt).toLocaleString()
                          : "Date not available"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-bold text-xl ${index === 0
                      ? "text-gold"
                      : index === 1
                        ? "text-silver"
                        : index === 2
                          ? "text-bronze"
                          : "text-gray-600"
                      }`}
                  >
                    ₹{bidder.amount}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6 text-center mt-4">
              <p className="text-gray-600">No bids yet!</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-lg text-gray-700">
          Failed to load auction details. Please try again later.
        </div>
      )}
    </div>
  );
};

export default AuctioneerAuctionItemDetail;


