import Card from '@/custom-components/Card';
import Spinner from '@/custom-components/Spinner';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AuctionItems = () => {
    const { allAuctions, loading } = useSelector((state) => state.Auction);
    const { user } = useSelector((state) => state.User);
    console.log("All Auctions", allAuctions);

    const auctionCategory = [
        "Electronic",
        "Furniture",
        "Art and Antiques",
        "Jewelry and Watches",
        "Automobile",
        "Real Estate",
        "Collectibles",
        "Fashion and Accessories",
        "Sport Memorabilia",
        "Books and Manuscripts",
    ];

    const [category, setCategory] = useState("");
    const [filter, setFilter] = useState("live");
    console.log(category)

    const now = Date.now();

    const filteredAuctions = allAuctions.filter((auction) => {
        const startTime = new Date(auction.startTime).getTime();
        const endTime = new Date(auction.endTime).getTime();

        const isCategoryMatch = category ? auction.category === category : true;
        const isLive = filter === "live" && startTime <= now && endTime >= now;
        const isUpcoming = filter === "upcomming" && startTime > now;
        const ended = filter === "Ended" && startTime < now;

        return isCategoryMatch && (isLive || isUpcoming || ended);
    });

    return (
        <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen lg:pl-[360px] pt-20">
            <div className="flex gap-5 mb-6">
                <div className="relative inline-block w-40">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>Filter Auctions</option>
                        <option value="live">Live Auctions</option>
                        <option value="upcomming">Upcoming Auctions</option>
                        <option value="Ended">Ended Auctions</option>
                    </select>
                </div>
                <div className="relative inline-block w-40">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">All Categories</option>
                        {auctionCategory.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold mb-8 md:mb-10 text-center text-indigo-800">
                {filter === "live" ? "Live Auctions" : "Upcoming Auctions"}
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            ) : (
                <div className={`grid gap-8 md:gap-10 sm:grid-cols-2 ${filteredAuctions.length > 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
                    {filteredAuctions.length > 0 ? (
                        filteredAuctions.map((auction) => (
                            <div key={auction._id}>
                                <Card
                                    imgSrc={auction.itemImage?.url}
                                    title={auction.title}
                                    startTime={auction.startTime}
                                    startingBid={auction.startingBid}
                                    endTime={auction.endTime}
                                    currentBid={auction.currentBid}
                                    id={auction._id}
                                    category={auction.category}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">
                                No {filter === "live" ? "live" : "upcoming"} auctions for the selected category.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AuctionItems;
