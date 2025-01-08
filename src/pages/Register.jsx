import HeadingTitle from "@/custom-components/HeadingTitle";
import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaUpload } from 'react-icons/fa';
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankIFSCCode, setBankIFSCCode] = useState("");
    const [razorpayAccountNumber, setRazorpayAccountNumber] = useState("");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [previewProfileImage, setPreviewProfileImage] = useState("");
    const [superAdminPin, setSuperAdminPin] = useState("");


    const { isAuthenticated, loading, error } = useSelector((state) => state.User);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();



    // show password
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // SuperAdmin PIN validation
        if (role === "SuperAdmin" && superAdminPin !== "9172") {
            toast.error("Invalid SuperAdmin PIN.");
            return;
        }

        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("role", role);
        formData.append("password", password);
        formData.append("profileImage", profileImage);

        if (role === "Auctioneer") {
            formData.append("accountNumber", accountNumber);
            formData.append("bankName", bankName);
            formData.append("bankIFSCCode", bankIFSCCode);
            formData.append("razorpayAccountNumber", razorpayAccountNumber);
            formData.append("paypalEmail", paypalEmail);
        }
        console.log(formData)
        dispatch(register(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo("/");
        }
        if (error) {
            toast.error(error);
        }
    }, [isAuthenticated, loading, error, dispatch, navigateTo]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setProfileImage(file);
            // console.log("set profile image",file)
            setPreviewProfileImage(reader?.result);
            // console.log("found baby", reader?.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        else {
            console.log("file not found", file);
        }
    };

    return (
        <section className="bg-gray-200 w-full min-h-screen py-20 lg:pl-[320px] flex flex-col items-center">
            <div className="bg-white max-w-3xl shadow-lg mx-auto w-full h-auto px-8 py-8 flex flex-col gap-6 rounded-lg">
                <div className="flex items-center justify-center">
                    <HeadingTitle content={"Register"} color="#d62b2b" />
                </div>
                <form className="flex flex-col gap-6" onSubmit={handleRegister}>

                    {/* profile photo */}
                    <div className="flex flex-col items-center">
                        <div className="relative">

                            {/* this is only for preview image */}
                            {!profileImage ? (
                                <FaUserCircle className="text-9xl text-gray-300" />
                            ) : (
                                <img
                                    src={previewProfileImage}
                                    alt="Profile"
                                    className="max-h-[200px] rounded-full object-cover border-2 border-gray-300 shadow-md"
                                />
                            )}

                            {/* this for upload image */}
                            <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <FaUpload className="text-2xl text-red-400 mt-32 rounded border border-red-500" />
                            </label>
                        </div>
                    </div>

                    <p className="font-semibold text-xl md:text-2xl ">Personal Details</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-[16px]">Full Name:</label>
                            <input
                                type="text"
                                name="userName"
                                value={userName}
                                placeholder="Full Name"
                                onChange={(e) => { setUserName(e.target.value); console.log(e.target.value) }}
                                className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[16px]">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email Address"
                                onChange={(e) => { setEmail(e.target.value); console.log(e.target.value) }}
                                className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[16px]">Phone:</label>
                            <input
                                type="text"
                                placeholder="phone number"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[16px]">Address:</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[16px]">Select Role:</label>
                            <select
                                value={role}
                                name="role"

                                onChange={(e) => setRole(e.target.value)}
                                className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500 cursor-pointer"
                                required
                            >
                                <option value="" disabled>Select role</option>
                                <option value="Auctioneer">Auctioneer</option>
                                <option value="Bidder">Bidder</option>
                                <option value="SuperAdmin">SuperAdmin</option>
                            </select>
                        </div>
                        {role === "SuperAdmin" && (
                            <div className="flex flex-col">
                                <label className="text-[16px]">PIN:</label>
                                <input
                                    type="password"
                                    name="pin"
                                    value={superAdminPin}
                                    placeholder="hint wanare number"
                                    onChange={(e) => setSuperAdminPin(e.target.value)}
                                    className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500"
                                />
                            </div>
                        )}
                        <div className="flex flex-col ">
                            <label className="text-[16px] font-medium">Password:</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className=" border-b-2 outline-none text-lg py-2 px-4 rounded-md w-full transition-all duration-300 focus:border-red-500"
                                    placeholder="Enter your password"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                                </span>
                            </div>
                        </div>
                    </div>

                    {role === "Auctioneer" && (
                        <div className="flex flex-col gap-6 p-4">
                            <p className="font-semibold md:text-2xl text-xl  text-gray-800">Bank Details</p>

                            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-[16px] font-medium mb-2 text-gray-700">Account Number:</label>
                                    <input
                                        type="number"
                                        value={accountNumber}
                                        onChange={(e) => { setAccountNumber(e.target.value); console.log(e.target.value) }}
                                        className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500 hover:border-blue-300  "
                                        placeholder="Enter Account Number"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[16px] font-medium mb-2 text-gray-700">Bank Name:</label>
                                    <select
                                        value={bankName}
                                        onChange={(e) => { setBankName(e.target.value); console.log(e.target.value) }}
                                        className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500 hover:border-blue-300  "
                                    >
                                        <option value="" disabled>Select a Bank</option>
                                        <option value="State Bank of India">State Bank of India (SBI)</option>
                                        <option value="HDFC Bank">HDFC Bank</option>
                                        <option value="ICICI Bank">ICICI Bank</option>
                                        <option value="Axis Bank">Axis Bank</option>
                                        <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                                        <option value="Bank of Baroda">Bank of Baroda</option>
                                        {/* Add remaining bank options */}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[16px] font-medium mb-2 text-gray-700">IFSC Code:</label>
                                    <input
                                        type="text"
                                        value={bankIFSCCode}
                                        onChange={(e) => { setBankIFSCCode(e.target.value); console.log(e.target.value) }}
                                        className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500 hover:border-blue-300  "
                                        placeholder="Enter IFSC Code"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="flex flex-col">
                                    <label className="text-[16px] font-medium mb-2 text-gray-700">Razorpay Account Number:</label>
                                    <input
                                        type="number"
                                        value={razorpayAccountNumber}
                                        onChange={(e) => { setRazorpayAccountNumber(e.target.value); console.log(e.target.value) }}
                                        className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500 hover:border-blue-300  "
                                        placeholder="Enter Razorpay Account Number"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[16px] font-medium mb-2 text-gray-700">Paypal Email:</label>
                                    <input
                                        type="email"
                                        value={paypalEmail}
                                        onChange={(e) => { setPaypalEmail(e.target.value); console.log(e.target.value) }}
                                        className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-red-500 hover:border-blue-300  "
                                        placeholder="Enter PayPal Email"
                                    />
                                </div>
                            </div>
                        </div>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 text-white text-lg py-2 rounded-md hover:bg-red-700 transition duration-300"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Register;
