import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8 lg:pl-[320px]">
            {/* Logo */}
            <Link to="/" className="block mb-8">
                <h4 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-700">
                    Bid<span className="text-pink-500">Xpert</span>
                </h4>
            </Link>

            {/* Emoji */}
            <div className="text-7xl sm:text-8xl lg:text-9xl mb-4">😔</div>

            {/* 404 Error Code */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-red-600 mb-4 drop-shadow-lg">404</h1>

            {/* Error Message */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-red-700 text-center mb-4">
                Oops! Page Not Found
            </h2>

            {/* Description */}
            <p className="text-black mt-2 max-w-lg text-center text-sm sm:text-base md:text-lg">
                It looks like the page you're searching for doesn't exist or has been removed. Please check the URL or return to the homepage.
            </p>

            {/* Back to Home Button */}
            <Link
                to="/"
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-transform duration-200 transform hover:scale-105"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
