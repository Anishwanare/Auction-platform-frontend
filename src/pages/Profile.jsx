import React from 'react';
import { useSelector } from 'react-redux';

const ProfileCard = () => {
    const { user } = useSelector((state) => state.User);

    return (
        <div className="lg:pl-[320px] p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Left Section */}
                <div className="w-full md:w-1/3 bg-blue-200 p-6 flex flex-col items-center">
                    <img
                        className="w-96 h-64 border-4 border-gray-300 shadow-md"
                        src={user?.profileImage?.url}
                        alt="Profile"
                    />
                    <h2 className="text-2xl font-bold text-black mt-4">{user?.userName || 'User Name'}</h2>
                    <p className="text-sm text-gray-600 italic mt-1">{user?.role || 'Role not specified'}</p>
                </div>

                {/* Right Section with Navbar */}
                <div className="w-full md:w-2/3 p-6">


                    <div id="personal-info" className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Email:</p>
                                <p className="text-gray-800 font-medium">{user?.email || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone:</p>
                                <p className="text-gray-800 font-medium">{user?.phone || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Address:</p>
                                <p className="text-gray-800 font-medium">{user?.address || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div id="financial-info" className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Financial Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Total Money Spent:</p>
                                <p className="text-gray-800 font-medium">${user?.moneySpend || 0}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Unpaid Commission:</p>
                                <p className="text-gray-800 font-medium">${user?.unpaidCommission || 0}</p>
                            </div>
                        </div>
                    </div>

                    {user.role === "Auctioneer" && <div id="payment-methods" className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Payment Methods</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Bank:</p>
                                <p className="text-gray-800 font-medium">{user?.paymentMethods?.bankTransfer?.bankName || 'N/A'}</p>
                                <p className="text-sm text-gray-500">Account Number:</p>
                                <p className="text-gray-800 font-medium">{user?.paymentMethods?.bankTransfer?.accountNumber || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">PayPal:</p>
                                <p className="text-gray-800 font-medium">{user?.paymentMethods?.paypal?.paypalEmail || 'N/A'}</p>
                                <p className="text-sm text-gray-500">Razorpay:</p>
                                <p className="text-gray-800 font-medium">{user?.paymentMethods?.razorpay?.razorpayAccountNumber || 'N/A'}</p>
                            </div>
                        </div>
                    </div>}

                    <div id="account-info" className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Account Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Member Since:</p>
                                <p className="text-gray-800 font-medium">{new Date(user?.createdAt).toLocaleDateString() || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Auction Won:</p>
                                <p className="text-gray-800 font-medium">{user?.auctionWon || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
