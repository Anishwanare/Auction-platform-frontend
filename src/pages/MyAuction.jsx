import Card from "@/custom-components/Card";
import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyAuction = () => {
    const { isAuthenticated, user } = useSelector((state) => state.User);
    const { loading, myAuctions } = useSelector((state) => state.Auction);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || user.role !== "Auctioneer") {
            navigate("/");
        }
        dispatch(getMyAuctionItems());
    }, [isAuthenticated, navigate, user.role, dispatch]);

    return (
        <div className="lg:pl-[320px] py-10 px-4 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    My Auctions
                </h1>

                {loading ? (
                    <Spinner />
                ) : myAuctions.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myAuctions.length > 0 && myAuctions.map((auction) => (
                            <CardTwo
                                key={auction._id}
                                imgSrc={auction.itemImage?.url}
                                title={auction.title}
                                startTime={auction?.startTime}
                                endTime={auction?.endTime}
                                startingBid={auction?.startingBid}
                                id={auction?._id}
                                category={auction.category}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600">
                        <p className="text-xl">No auctions found!</p>
                        <p className="mt-2">Create your first auction to see it here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAuction;
