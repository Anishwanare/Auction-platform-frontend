import { deleteMyAuction, republishMyAuction } from '@/store/slices/auctionSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const CardTwo = ({ imgSrc, title, startTime, startingBid, endTime, currentBid, id ,category}) => {

    const [openDrawer, setOpenDrawer] = useState(false)

    const calculateTimeLeft = () => {
        const now = new Date();
        const startDifference = new Date(startTime) - now;
        const endDifference = new Date(endTime) - now;

        if (startDifference > 0) {
            return {
                type: "Starts At:",
                days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((startDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((startDifference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((startDifference % (1000 * 60)) / 1000),
            };
        } else if (endDifference > 0) {
            return {
                type: "Ends In:",
                days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((endDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((endDifference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((endDifference % (1000 * 60)) / 1000),
            };
        } else {
            return null; // Auction is over
        }
    };


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000); // Update every second

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
        const pads = (num) => String(num).padStart(2, '0');
        return `(${days} Days) ${pads(hours)}:${pads(minutes)}:${pads(seconds)}`;
    };

    const dispatch = useDispatch();
    const handleDeleteAuction = (id) => {
        const check = window.confirm("Are you sure want to delete item!")
        if (check) {
            dispatch(deleteMyAuction(id))
            location.reload()
        }
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
            <img
                src={imgSrc}
                alt={title}
                className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h5>
                <div className="flex justify-between mb-2">
                    {startingBid && (
                        <p className="text-sm text-gray-600">
                            <span className="font-bold text-blue-600">Starting Bid:</span> {startingBid}
                        </p>
                    )}
                    {category && (
                        <p className="text-sm text-gray-600">
                            <span className="font-bold text-green-600">Category:</span> {category}
                        </p>
                    )}
                </div>
                <p className="text-sm">
                    {timeLeft ? (
                        <>
                            <span
                                className={`font-bold ${timeLeft.type === "Ended At:" ? "text-red-500" : "text-green-500"
                                    }`}
                            >
                                {timeLeft.type}
                            </span>{" "}
                            <span className="ml-1 font-medium text-gray-700">
                                {formatTimeLeft(timeLeft)}
                            </span>
                        </>
                    ) : (
                        <span className="ml-1 font-medium text-red-600">Time's up :)</span>
                    )}
                </p>


                <div className="flex flex-col gap-3 mt-4">
                    {/* View Auction */}
                    <Link
                        to={`/auctioneer/auction-items/details/${id}`}
                        className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        View Auction
                    </Link>

                    {/* Delete Auction */}
                    <button
                        onClick={() => handleDeleteAuction(id)}
                        className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Delete Auction
                    </button>

                    {/* Republish Auction */}
                    <button
                        disabled={new Date(endTime) > Date.now()}
                        className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors ${new Date(endTime) > Date.now()
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                        onClick={() => setOpenDrawer(true)}
                    >
                        Republish Auction
                    </button>
                </div>
                <Drawer openDrawer={openDrawer} id={id} setOpenDrawer={setOpenDrawer} itemName={title} />
            </div>
        </div>
    );
};

export default CardTwo;

export const Drawer = ({ openDrawer, setOpenDrawer, id, itemName }) => {
    const dispatch = useDispatch()
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const { loading } = useSelector((state) => state.Auction)

    console.log("open", openDrawer)

    const handleRepublishAuction = (id) => {
        const formData = new FormData()
        formData.append("startTime", startTime)
        formData.append("endTime", endTime)
        dispatch(republishMyAuction(id, formData))
        setOpenDrawer(false);
    }

    return (
        <section
            className={`lg:pl-[300px] fixed ${openDrawer ? "bottom-0" : "-bottom-full"} left-0 w-full transition-all duration-300 h-full bg-black bg-opacity-70 flex items-end`}
        >
            <div className="bg-white h-fit w-full p-6">
                <h3 className="text-red-500 text-3xl font-semibold text-center mb-4">Republish Auction</h3>
                <form onSubmit={(e) => {
                    e.preventDefault(); // Prevent default form submission
                    handleRepublishAuction(id);
                }}>
                    <div className="mb-4">
                        <p className='md:text-2xl py-5'>{itemName}</p>
                        <label className="block text-gray-700 mb-2">Start Time:</label>
                        <input
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">End Time:</label>
                        <input
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                    >
                        {loading ? "Republishing...." : "Republish"}
                    </button>
                </form>
                <button
                    onClick={() => setOpenDrawer(false)}
                    className="w-full bg-red-700 text-white py-2 px-4 rounded-md mt-2 hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </section>
    )
}
