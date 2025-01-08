import Spinner from '@/custom-components/Spinner';
import { fetchAllPaymentsProofs, fetchAllUsers, fetchMessages, getMonthlyRevenue } from '@/store/slices/superAdminSlice';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PaymentGraph from './Graphs/PaymentGraph';
import BiddersGraph from './Graphs/BiddersGraph';
import AuctioneerGraph from './Graphs/AuctioneerGraph';
import UsersGraph from './Graphs/UsersGraph';

const AdminDashboard = () => {
    const { loading, monthlyRevenue, allUsers, paymentProofs, messages } = useSelector((state) => state.SuperAdmin);
    const { allAuctions } = useSelector((state) => state.Auction);
    const { isAuthenticated } = useSelector((state) => state.User)
    const dispatch = useDispatch();
    const navigate = useNavigate("/")
    const totalBidders = allUsers.filter((bidder) => bidder?.role === "Bidder")
    const totalAuctioneers = allUsers.filter((Auctioneer) => Auctioneer?.role === "Auctioneer")



    useEffect(() => {
        dispatch(fetchAllPaymentsProofs())
        dispatch(getMonthlyRevenue());
        dispatch(fetchAllUsers());
        dispatch(fetchAllPaymentsProofs());
        dispatch(fetchMessages());
    }, [dispatch]);

    if (!isAuthenticated) {
        return navigate("/")
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen px-5 py-10 bg-gray-50 lg:pl-[320px]">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your auction platform efficiently</p>
            </div>

            {/* Revenue and User Summary */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Monthly Revenue</h2>
                    <p className="mt-2 text-3xl font-bold text-green-500">
                        ${monthlyRevenue}
                    </p>
                </div>
                <Link to={"/admin/auctioneers"}>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">Total Auctioneers</h2>
                        <p className="mt-2 text-3xl font-bold text-blue-500">{totalAuctioneers?.length || 0}</p>
                    </div>
                </Link>
                <Link to={"/admin-bidders"}>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">Total Bidders</h2>
                        <p className="mt-2 text-3xl font-bold text-purple-500">{totalBidders?.length || 0}</p>
                    </div>
                </Link>
                <Link to={"/admin-messages"}>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">Total Messages</h2>
                        <p className="mt-2 text-3xl font-bold text-purple-500">{messages?.length}</p>
                    </div>
                </Link>
                <Link to={"/auction-items"}>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">Auction Items</h2>
                        <p className="mt-2 text-3xl font-bold text-purple-500">{allAuctions?.length || 0}</p>
                    </div>
                </Link>
                <Link to={"/payments-proofs"}>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">Auction Items</h2>
                        <p className="mt-2 text-3xl font-bold text-purple-500">{allAuctions?.length || 0}</p>
                    </div>
                </Link>
            </div>
            <PaymentGraph />
            <UsersGraph/>
            {/* <BiddersGraph/>
            <AuctioneerGraph/> */}
        </div>
    );
};

export default AdminDashboard;
