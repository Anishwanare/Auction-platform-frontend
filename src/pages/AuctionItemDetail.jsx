import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { placebids } from "@/store/slices/bidSlice";
import { deleteMyAuction } from "@/store/slices/auctionSlice";
import { MdDelete } from "react-icons/md";

const AuctionItemDetail = () => {
    const { id } = useParams();
    const { isAuthenticated, user } = useSelector((state) => state.User);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(user?.role)

    const [auctionDetails, setAuctionDetails] = useState(null);
    const [auctionBidders, setAuctionBidders] = useState([]);
    console.log(auctionBidders)
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);

    const handleAdminAuctionDelete = (id) => {
        window.confirm("Are you sure want to delete!!!!")
        dispatch(deleteMyAuction(id))
    }

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
        // const interval = setInterval(() => {
        //     fetchAuctionDetails();
        // }, 1000);
        // return () => clearInterval(interval);
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
            setAmount(""); // Clear input field
            fetchAuctionDetails(); // Fetch updated bids
        } catch (error) {
            toast.error("Failed to place bid. Please try again.");
            console.error("Error placing bid:", error);
        }
    };

    // console.log(user?.role)

    const rankedBidders = [...auctionBidders].sort(
        (a, b) => (b.amount || 0) - (a.amount || 0)
    );

    if (loading) {
        return <div className="text-center text-lg text-gray-700">Loading auction details...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6 lg:px-20 lg:pl-[360px] mt-10 md:mt-0">
            {auctionDetails ? (
                <>
                    {/* Auction Item Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 md:flex md:space-x-6">
                        <div className="md:w-1/2">
                            <img
                                src={
                                    auctionDetails.itemImage?.url ||
                                    "https://via.placeholder.com/400"
                                }
                                alt={auctionDetails.title || "Auction Item"}
                                className="w-full rounded-lg object-cover"
                            />
                        </div>
                        <div className="mt-6 md:mt-0 md:w-1/2">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {auctionDetails.title || "Untitled Auction"}
                            </h1>

                            {/* delete icon for admin */}
                            {user?.role === "SuperAdmin" &&
                                <div onClick={() => handleAdminAuctionDelete(id)}>
                                    <MdDelete className="text-red-600" />
                                </div>
                            }


                            <p className="text-lg text-gray-600 mt-4">
                                {auctionDetails.description || "No description available."}
                            </p>
                            <p className="text-lg text-gray-600 mt-4">
                                <span style={{ fontWeight: "bold" }}>Category:      </span>
                                {auctionDetails.category || "No description available."}
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <span className="font-semibold text-gray-700">Starting Bid:</span>{" "}
                                    <span className="text-green-600">
                                        ₹{auctionDetails.startingBid || 0}
                                    </span>
                                </li>
                                <li>
                                    <span className="font-semibold text-gray-700">Condition:</span>{" "}
                                    <span className="text-orange-600">
                                        {auctionDetails.condition || "Unknown"}
                                    </span>
                                </li>
                                <li>
                                    <span className="font-semibold text-gray-700">Auction Ends:</span>{" "}
                                    <span className="text-red-600">
                                        {auctionDetails.endTime
                                            ? new Date(auctionDetails.endTime).toLocaleString()
                                            : "No end time provided"}
                                    </span>
                                </li>
                            </ul>
                            {isAuthenticated && user?.role === "Bidder" && Date.now() < new Date(auctionDetails.endTime) && (
                                <form onSubmit={handleBidSubmit} className="mt-6">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter your bid amount"
                                        className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
                                    >
                                        Place Bid
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Bidders Section */}
                    <h2 className="text-xl font-bold text-gray-800 mt-10">Bids</h2>
                    {auctionBidders.length > 0 ? (
                        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
                            {rankedBidders.map((bidder, index) => (
                                <div
                                    key={bidder.userId || index}
                                    className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-md mb-3 hover:bg-gray-100 transition duration-300"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={
                                                bidder.profileImage || "https://via.placeholder.com/40"
                                            }
                                            alt={bidder.userName || "Anonymous"}
                                            className="w-10 h-10 rounded-full mr-4"
                                        />
                                        <div>
                                            <p className="text-gray-800 font-semibold">
                                                {bidder.userName || "Anonymous"}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                {bidder.createdAt
                                                    ? bidder.createdAt
                                                    : "Date not available"}
                                            </p>
                                        </div>
                                    </div>
                                    <p
                                        className={`font-bold text-2xl ${index < 3 ? "text-green-600" : "text-gray-600"
                                            }`}
                                    >
                                        #{index + 1}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center mt-4">
                            <p className="text-gray-600">Be the first to place a bid!</p>
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

export default AuctionItemDetail;
