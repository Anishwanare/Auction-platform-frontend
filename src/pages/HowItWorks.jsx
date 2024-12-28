import HeadingTitle from "@/custom-components/HeadingTitle";
import React from "react";
import {
    FaUser,
    FaGavel,
    FaEnvelope,
    FaDollarSign,
    FaFileInvoice,
    FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUser />,
            title: "User Registration",
            description:
                "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.",
            bgColor: "bg-blue-100",
            iconColor: "bg-blue-500",
        },
        {
            icon: <FaGavel />,
            title: "Role Selection",
            description:
                'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
            bgColor: "bg-green-100",
            iconColor: "bg-green-500",
        },
        {
            icon: <FaEnvelope />,
            title: "Winning Bid Notification",
            description:
                "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Easypaisa, and PayPal.",
            bgColor: "bg-yellow-100",
            iconColor: "bg-yellow-500",
        },
        {
            icon: <FaDollarSign />,
            title: "Commission Payment",
            description:
                "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent.",
            bgColor: "bg-orange-100",
            iconColor: "bg-orange-500",
        },
        {
            icon: <FaFileInvoice />,
            title: "Proof of Payment",
            description:
                "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.",
            bgColor: "bg-purple-100",
            iconColor: "bg-purple-500",
        },
        {
            icon: <FaRedo />,
            title: "Reposting Items",
            description:
                "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
            bgColor: "bg-pink-100",
            iconColor: "bg-pink-500",
        },
    ];

    return (
        <section className="w-full min-h-screen px-5 py-20 bg-gray-50 lg:pl-[320px]">
            <span className="text-center">

                <HeadingTitle content={"Discover How BidXpert Operates"} color="#b90eb4" />
            </span>
            <div className="grid md:grid-cols-2 gap-8 my-10 max-w-5xl mx-auto">
                {steps.map((element, index) => {
                    return (
                        <div
                            key={index}
                            className={`rounded-lg shadow-md transition-transform transform hover:scale-105 ${element.bgColor} p-6 flex flex-col items-start`}
                        >
                            <div className={`${element.iconColor} text-white p-4 text-2xl rounded-full`}>
                                {element.icon}
                            </div>
                            <h3 className="text-gray-800 text-xl font-semibold mt-4">
                                {element.title}
                            </h3>
                            <p className="text-md text-gray-600 mt-2">
                                {element.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HowItWorks;
