import React, { useEffect } from 'react';
import { FaChartLine, FaGavel, FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeaturedAuctions from './home-sub-components/FeaturedAuctions';
import UpcommingAuction from './home-sub-components/UpcommingAuction';
import LeaderBoard from './home-sub-components/LeaderBoard';

const Home = () => {
  const { isAuthenticated, user, leaderBoard } = useSelector((state) => state.User);

  console.log("LeaderBoard data from home:", leaderBoard);
  console.log("isAutheticated", isAuthenticated);

  

  const greetingText = isAuthenticated
    ? user?.role === "Auctioneer"
      ? `Welcome Back, ${user.userName}!`
      : `Hello, ${user.userName}!`
    : "Join Us Today";

  return (
    <div className="w-full min-h-screen bg-gray-50 lg:pl-[300px]">
      {/* Hero Section */}
      <section className="w-full px-5 py-16 bg-gradient-to-r from-[#7b1fa2] to-[#ffb74d] text-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center text-center lg:text-left">
          <div className="flex-1 mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-extrabold drop-shadow-md mb-6">
              Discover the Future of Bidding with BidXpert
            </h1>
            <p className="text-lg lg:text-xl mb-8">
              The ultimate platform for auctions, with real-time insights and an easy bidding experience.
            </p>
            <Link to="/login">
              <button
                disabled={isAuthenticated}
                className="bg-white text-[#7b1fa2] px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300 shadow-lg transform hover:scale-105"
              >
                {greetingText}
              </button>
            </Link>
          </div>
          {/* {user?.profileImage?.url && (
            <div className="flex-1 flex items-center justify-center">
              <img
                src={user.profileImage.url}
                alt={`${user.userName}'s profile`}
                className="w-80 h-auto md:max-h-52 object-contain"
              />
            </div>
          )} */}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-20 px-5 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Why Choose BidXpert?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaGavel className="text-5xl text-[#7b1fa2] mb-4 mx-auto" />,
              title: "Easy Bidding",
              description: "Enjoy seamless and easy bidding with our user-friendly interface."
            },
            {
              icon: <FaChartLine className="text-5xl text-[#7b1fa2] mb-4 mx-auto" />,
              title: "Real-Time Analytics",
              description: "Track auction performance with real-time analytics and insights."
            },
            {
              icon: <FaUsers className="text-5xl text-[#7b1fa2] mb-4 mx-auto" />,
              title: "Community Support",
              description: "Join a community of like-minded bidders and get the support you need."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-indigo-50 py-20 px-5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "Step 1: Sign Up",
                description: "Create your account to access live auctions and start bidding."
              },
              {
                step: "Step 2: Find Auctions",
                description: "Browse upcoming auctions and select the ones you’re interested in."
              },
              {
                step: "Step 3: Place Bids",
                description: "Join the live bidding and compete to win your desired items."
              }
            ].map((step, index) => (
              <div key={index} className="bg-white shadow-lg p-6 rounded-md">
                <h3 className="text-xl font-semibold text-[#7b1fa2] mb-2">{step.step}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto py-20 px-5 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "“BidXpert made my first auction experience smooth and enjoyable.”",
              name: "- Alex Smith"
            },
            {
              quote: "“Great platform with real-time insights, made bidding so much easier.”",
              name: "- Priya Kumar"
            },
            {
              quote: "“Fantastic community, and support is top-notch!”",
              name: "- David Wilson"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white shadow-lg p-6 rounded-md">
              <p className="text-gray-600 mb-4">{testimonial.quote}</p>
              <h3 className="text-lg font-semibold text-[#7b1fa2]">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Auction Features */}
      <FeaturedAuctions />
      <UpcommingAuction />
      <div className="p-4 sm:p-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen">
        <LeaderBoard />
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-6xl mx-auto px-5 text-center md:flex md:justify-between md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">BidXpert</h3>
            <p className="text-gray-400">Your trusted platform for easy, secure auctions.</p>
          </div>
          <div className="mt-8 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            <span className="mx-2">|</span>
            <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} BidXpert. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
