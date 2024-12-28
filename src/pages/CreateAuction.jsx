import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaUpload, FaImage } from "react-icons/fa";
import { createAuction } from "@/store/slices/auctionSlice";
import { useNavigate } from "react-router-dom";

const CreateAuction = () => {
    const { loading } = useSelector((state) => state.Auction);
    const { isAuthenticated, user } = useSelector((state) => state.User)
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [itemImage, setItemImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [startingBid, setStartingBid] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [condition, setCondition] = useState("");

    const conditions = ["New", "Used", "Refurbished"];
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!itemImage) {
            toast.error("Please upload an image for the item.");
            return;
        }

        const formattedStartTime = new Date(startTime).toString();
        const formattedEndTime = new Date(endTime).toString();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("startingBid", startingBid);
        formData.append("startTime", formattedStartTime);
        formData.append("endTime", formattedEndTime);
        formData.append("condition", condition);
        formData.append("itemImage", itemImage);

        dispatch(createAuction(formData));
        setItemImage("")
        setPreviewImage("")
        setTitle("")
        setDescription("")
        setCategory("")
        setStartingBid(""),
         setStartTime("")
         setEndTime("")
         setCondition("")

        // console.log("Form Data:", Object.fromEntries(formData));
    };

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        if (image) {
            const validTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!validTypes.includes(image.type)) {
                toast.error("Invalid file type. Please upload a JPEG or PNG image.");
                return;
            }

            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result);
            reader.onerror = () => toast.error("Failed to load image preview.");
            reader.readAsDataURL(image);

            setItemImage(image);
        } else {
            toast.error("No file selected.");
        }
    };

    useEffect(() => {
        if (!isAuthenticated || user.role !== "Auctioneer") {
            navigate("/")
        }
    }, [isAuthenticated, navigate, user.role])

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-16 flex items-center justify-center lg:pl-[320px]">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl px-8 py-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Auction
                </h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    {/* Image Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            {!previewImage ? (
                                <FaImage className="text-9xl text-gray-300" />
                            ) : (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                                />
                            )}
                            <label className="absolute bottom-0 right-0 cursor-pointer bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition">
                                <FaUpload />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <span className="text-gray-600 mt-2">Upload Item Image</span>
                    </div>

                    {/* Form Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">
                                Item Name
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter item name"
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description"
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {auctionCategory.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">
                                Starting Bid
                            </label>
                            <input
                                type="number"
                                value={startingBid}
                                onChange={(e) => setStartingBid(e.target.value)}
                                placeholder="Enter starting bid"
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">
                                Start Time
                            </label>
                            <input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">
                                End Time
                            </label>
                            <input
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">
                                Condition
                            </label>
                            <select
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Select Condition</option>
                                {conditions.map((cond, index) => (
                                    <option key={index} value={cond}>
                                        {cond}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 text-white rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition ${loading && "opacity-50 cursor-not-allowed"
                            }`}
                    >
                        {loading ? "Uploading..." : "Create Auction"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateAuction;
