import React, { useEffect, useState } from "react";
import { RiAuctionFill, RiInstagramFill, RiMessage3Fill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard, MdOutlineClose } from "react-icons/md";
import { FaEye, FaFacebook } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { BsInfoCircle, BsPersonFillCheck } from "react-icons/bs";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const SideDrawer = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    console.log(user?.role)

    console.log("check if user is authenticated", isAuthenticated)

    const handleLogout = () => {
        dispatch(logout(user));
        setShow(false); // Close the sidebar after logging out
        navigate("/")
    };

    const handleToggleDrawer = () => {
        setShow(!show); // Toggle drawer visibility
    };

    const handleCloseDrawer = () => {
        setShow(false); // Close the sidebar
    };



    return (
        <>
            {/* Hamburger Icon Button for Mobile */}
            <div className={`bg-gradient-to-b from-purple-600 to-pink-500 fixed w-full z-50 transition-all duration-300 `}>
                {/* Hamburger Icon Button for Mobile */}
                <div className="lg:hidden z-50 fixed">
                    <button
                        onClick={handleToggleDrawer}
                        className="fixed right-5 top-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xl p-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-200"
                    >
                        {!show ? <GiHamburgerMenu /> : <IoCloseSharp size={20} />}
                    </button>
                </div>
                <div className="fixed left-5 top-5 z-50 lg:hidden">
                    <Link to="/" className="block mb-8 " onClick={handleCloseDrawer}>
                        <h4 className="text-3xl font-bold text-purple-700">
                            Bid<span className="text-pink-500">Xpert</span>
                        </h4>
                    </Link>
                </div>
            </div>

            {/* Side Drawer */}
            <div
                onClick={handleCloseDrawer} // Close drawer when any area is clicked
                className={`w-full sm:w-[300px] bg-white h-full fixed top-0 shadow-lg z-50 ${show ? "left-0" : "-left-full"
                    } transition-all duration-300 p-6 flex flex-col justify-between border-r border-gray-300 lg:left-0`}
            >
                <div onClick={(e) => e.stopPropagation()} className="relative">
                    {/* Prevent drawer from closing when clicking inside */}
                    <Link to="/" className="block mb-8 " onClick={handleCloseDrawer}>
                        <h4 className="text-3xl font-bold text-purple-700">
                            Bid<span className="text-pink-500">Xpert</span>
                        </h4>
                    </Link>

                    {/* Sidebar Links */}
                    <ul className="space-y-6">
                        <li>
                            <Link
                                to="/leaderboardpage"
                                className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                onClick={handleCloseDrawer} // Close sidebar on clicking the link
                            >
                                <MdLeaderboard className="text-2xl mr-3" /> Leaderboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/auction-items"
                                className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                onClick={handleCloseDrawer}
                            >
                                <RiAuctionFill className="text-2xl mr-3" /> Auctions
                            </Link>
                        </li>

                        {isAuthenticated && user && user.role === "Auctioneer" && (
                            <>
                                <li>
                                    <Link
                                        to="/submit-commission"
                                        className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                        onClick={handleCloseDrawer}
                                    >
                                        <FaFileInvoiceDollar className="text-2xl mr-3" /> Pay Commission
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/create-auction"
                                        className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                        onClick={handleCloseDrawer}
                                    >
                                        <IoIosCreate className="text-2xl mr-3" /> Create Auction
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/my-auction"
                                        className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                        onClick={handleCloseDrawer}
                                    >
                                        <FaEye className="text-2xl mr-3" /> My Auctions
                                    </Link>
                                </li>
                            </>
                        )}

                        {isAuthenticated && user && user.role === "SuperAdmin" && (
                            <ul className="flex flex-col gap-6">
                                <Link
                                    to="/admin-dashboard"
                                    className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                    onClick={handleCloseDrawer}
                                >
                                    <MdDashboard className="text-2xl mr-3" /> Admin Dashboard
                                </Link>
                                <Link
                                    to="/admin-messages"
                                    className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                    onClick={handleCloseDrawer}
                                >
                                    <RiMessage3Fill className="text-2xl mr-3" /> Messages
                                </Link>
                                <Link
                                    to="/admin-bidders"
                                    className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                    onClick={handleCloseDrawer}
                                >
                                    <RiAuctionFill className="text-2xl mr-3" /> Bidders
                                </Link>
                                <Link
                                    to="/admin/auctioneers"
                                    className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                    onClick={handleCloseDrawer}
                                >
                                    <BsPersonFillCheck className="text-2xl mr-3" /> Auctioneers
                                </Link>
                                <Link
                                    to="/payments-proofs"
                                    className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                                    onClick={handleCloseDrawer}
                                >
                                    <BsPersonFillCheck className="text-2xl mr-3" /> Payment Proofs
                                </Link>

                            </ul>
                        )}

                        {/* profile link */}
                        {isAuthenticated && <Link
                            to={`/my-profile/${user._id}`}
                            className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200"
                            onClick={handleCloseDrawer}
                        >
                            <BsPersonFillCheck className="text-2xl mr-3" /> My profile
                        </Link>}


                    </ul>

                    {!isAuthenticated ? (
                        <div className="mt-8 flex gap-4">
                            <Link to="/login">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition-all duration-200"
                                    onClick={handleCloseDrawer}
                                >
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-all duration-200"
                                    onClick={handleCloseDrawer}
                                >
                                    Register
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="mt-8 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-all duration-200"
                        >
                            Logout
                        </button>
                    )}

                    <hr className="my-4 border-t-2 border-pink-200 w-full " />
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link
                                to="/how-it-works"
                                className="flex items-center text-lg font-semibold text-gray-700 hover:text-red-600 transition-all duration-200"
                                onClick={handleCloseDrawer}
                            >
                                <VscWorkspaceUnknown className="text-2xl mr-3" /> How it Works..
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/aboutus"
                                className="flex items-center text-lg font-semibold text-gray-700 hover:text-red-600 transition-all duration-200"
                                onClick={handleCloseDrawer}
                            >
                                <BsInfoCircle className="text-2xl mr-3" /> About us..
                            </Link>
                        </li>
                    </ul>

                    {show && (
                        <button
                            onClick={handleToggleDrawer}
                            className="md:hidden fixed right-5 top-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xl p-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-200"
                        >
                            <MdOutlineClose />
                        </button>
                    )}
                </div>

                {/* Social Links and Footer */}
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div className="flex justify-around items-center gap-5">
                            <Link
                                to="#"
                                className="text-blue-500 hover:text-blue-600 transition-all duration-200"
                            >
                                <FaFacebook className="text-2xl" />
                            </Link>
                            <Link
                                to="#"
                                className="text-pink-500 hover:text-[#d62976] transition-all duration-200"
                            >
                                <RiInstagramFill className="text-2xl" />
                            </Link>
                        </div>

                        {/* Contact */}
                        <div>
                            <Link
                                to="/contact"
                                className="text-indigo-600 hover:text-purple-800 font-semibold transition-colors duration-300"
                                onClick={handleCloseDrawer}
                            >
                                <p>Contact Us</p>
                            </Link>
                        </div>
                    </div>

                    <div className="top-5 flex flex-col justify-between">
                        <p className="flex gap-2 items-center">
                            &copy;{" "}
                            <span className="text-sm font-bold text-purple-700">
                                Bid<span className="text-pink-500">Xpert</span>
                            </span>
                        </p>
                        <p className="text-sm">
                            Designed and Developed by{" "}
                            <Link to={"#"} className="text-blue-700">
                                DWTECH PVT LMT
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideDrawer;

