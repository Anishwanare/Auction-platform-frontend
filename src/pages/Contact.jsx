import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import HeadingTitle from "@/custom-components/HeadingTitle";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/send-messages`, { name, email, message });
            toast.success(response.data?.message)
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false)
            setName("")
            setEmail("")
            setMessage("")
        }
    };

    return (
        <section className="w-full min-h-screen px-5 py-20 bg-gray-50 lg:pl-[320px]">
            <span className="text-center">
                <HeadingTitle content={"Contact Us"} color="#b90eb4" />
            </span>
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                <h2 className="text-gray-800 text-2xl font-bold">Get in Touch</h2>
                <p className="text-md text-gray-600">
                    We would love to hear from you! Please reach out with any questions, comments, or concerns.
                </p>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-[#b90eb4] text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold">Our Address</h3>
                            <p className="text-gray-600">123 Auction St, Bidding City, ABC 12345</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaPhone className="text-[#b90eb4] text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold">Phone Number</h3>
                            <p className="text-gray-600">+1 (234) 567-8901</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-[#b90eb4] text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold">Email Address</h3>
                            <p className="text-gray-600">support@bidxpert.com</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-gray-800 text-2xl font-bold">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#b90eb4]"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#b90eb4]"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#b90eb4]"
                        rows="4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[#b90eb4] text-white p-3 rounded-md hover:bg-[#a60ca2] transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Sending............" : "Send Message"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
