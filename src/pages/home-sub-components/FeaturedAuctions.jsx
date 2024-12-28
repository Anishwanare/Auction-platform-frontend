import Card from '@/custom-components/Card';
import Spinner from '@/custom-components/Spinner';
import React from 'react';
import { useSelector } from 'react-redux';

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.Auction);

  // some method will check for condition and return true or false
  const hasFeaturedAuctions = allAuctions.some((auction) => auction.startingBid >= 8000);

  if (!hasFeaturedAuctions) {
    return null; // Return nothing if no auctions with starting bid >= 8000
  }

  return (
    <section className="max-w-6xl mx-auto py-20 px-5 text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Featured Auction Features</h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allAuctions
            .filter((auction) => auction.startingBid >= 8000) // Only show auctions with starting bid >= 8000
            .map((feature) => (
              <Card
                key={feature._id}
                imgSrc={feature.itemImage?.url}
                title={feature.title}
                startTime={feature.startTime}
                startingBid={feature.startingBid}
                endTime={feature.endTime}
                currentBid={feature.currentBid}
                id={feature._id}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedAuctions;
