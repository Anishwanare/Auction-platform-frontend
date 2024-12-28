import Card from '@/custom-components/Card';
import Spinner from '@/custom-components/Spinner';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UpcommingAuction = () => {
  const { allAuctions, loading } = useSelector((state) => state.Auction);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set today's date to 00:00:00 to compare without the time component

  // Get auctions starting from today onwards
  const auctionStartinToday = allAuctions.filter((auction) => {
    const auctionStartDate = new Date(auction.startTime);
    auctionStartDate.setHours(0, 0, 0, 0); // Set auction start date to 00:00:00 to compare without the time component
    return auctionStartDate >= today;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 ">
      <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${auctionStartinToday.length > 0 ? "text-green-700 animate-pulse" : "text-red-700"}`}>
        {auctionStartinToday.length > 0 && "Upcoming Auctions"}
      </h2>

      {loading ? <Spinner /> :
        <>
          {auctionStartinToday.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctionStartinToday.slice(0, 6).map((auction) => (
                <Card
                  key={auction._id}
                  imgSrc={auction.itemImage?.url}
                  title={auction.title}
                  startTime={auction.startTime}
                  startingBid={auction.startingBid}
                  endTime={auction.endTime}
                  currentBid={auction.currentBid}
                  id={auction._id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No upcoming auctions at the moment.</p>
            </div>
          )}
        </>
      }
    </div>
  );
};

export default UpcommingAuction;
