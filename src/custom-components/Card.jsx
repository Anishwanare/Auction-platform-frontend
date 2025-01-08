import { AdminDeleteAuctionItem } from '@/store/slices/auctionSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Card = ({ imgSrc, title, startTime, startingBid, currentBid, endTime, id, category }) => {

    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.User)


    const calculateTimeLeft = () => {
        const now = new Date();
        const startDifference = new Date(startTime) - now;
        const endDifference = new Date(endTime) - now;
        const timeLeft = {};

        if (startDifference > 0) {
            timeLeft.type = "Starts In:";
            timeLeft.days = Math.floor(startDifference / (1000 * 60 * 60 * 24));
            timeLeft.hours = Math.floor((startDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            timeLeft.minutes = Math.floor((startDifference % (1000 * 60 * 60)) / (1000 * 60));
            timeLeft.seconds = Math.floor((startDifference % (1000 * 60)) / 1000);
        } else if (endDifference > 0) {
            timeLeft.type = "Ends In:";
            timeLeft.days = Math.floor(endDifference / (1000 * 60 * 60 * 24));
            timeLeft.hours = Math.floor((endDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            timeLeft.minutes = Math.floor((endDifference % (1000 * 60)) / (1000 * 60));
            timeLeft.seconds = Math.floor((endDifference % (1000 * 60)) / 1000);
        } else {
            timeLeft.type = "Ended:";
            timeLeft.days = 0;
            timeLeft.hours = 0;
            timeLeft.minutes = 0;
            timeLeft.seconds = 0;
        }

        return timeLeft;
    };


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


    const handleDeleteAuctionByAdmin = (e) => {
        if (user?.role === "SuperAdmin" && isAuthenticated) {
            const isConfirm = window.confirm("Are you sure want to delete Auction?")
            if (!isConfirm) {
                return alert("Auction is safe..")
            }
            dispatch(AdminDeleteAuctionItem(id))
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
        const pads = (num) => String(num).padStart(2, '0');
        return `${days}d ${pads(hours)}h ${pads(minutes)}m ${pads(seconds)}s`;
    };

    return (
        <Link
            className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden group border border-gray-200"
        >
            <Link to={`/auction-items/details/${id}`}>
                <div className="relative group">
                    <img
                        src={imgSrc}
                        alt={title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Hover Text */}
                    <div className="group-hover:scale-110 absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-semibold">View Item</span>
                    </div>
                </div>
            </Link>

            <div className="p-4 space-y-3">
                <div className='flex items-center justify-between'>
                    <h5 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {title}
                    </h5>
                    {user?.role === "SuperAdmin" && isAuthenticated && <h5 className="text-xs bg-red-600 p-1 px-2 hover:bg-red-700 rounded-xl text-white" onClick={handleDeleteAuctionByAdmin}>
                        Delete Auction
                    </h5>}
                </div>

                {startingBid && (
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium text-gray-800">Starting Bid:</span>{" "}
                        <span className="text-green-600 font-bold">${startingBid}</span>
                    </p>
                )}
                {category && (
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium text-gray-800">Category:</span>{" "}
                        <span className="text-red-600 font-bold">{category}</span>
                    </p>
                )}
                <p className="text-sm text-gray-600">
                    <span
                        className={`font-bold ${timeLeft.type === "Ends In:" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {timeLeft.type}
                    </span>{" "}
                    {timeLeft && Object.keys(timeLeft).length > 1 ? (
                        <span className="font-medium text-gray-800">
                            {formatTimeLeft(timeLeft)}
                        </span>
                    ) : (
                        <span className="font-medium text-red-600">Time's up!</span>
                    )}
                </p>
            </div>
        </Link >
    );
};

export default Card;
