import React from "react";
import { FaUsers, FaBullseye, FaHandshake, FaRegLightbulb } from "react-icons/fa";
import HeadingTitle from "@/custom-components/HeadingTitle";

const AboutUs = () => {
  return (
    <section className="w-full min-h-screen px-5 py-20 bg-gray-50 lg:pl-[320px]">
      <span className="text-center">
        <HeadingTitle content={"About Us"} color="#b90eb4" />
      </span>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <FaUsers className="text-[#b90eb4] text-3xl" />
          <h2 className="text-gray-800 text-2xl font-bold">Who We Are</h2>
        </div>
        <p className="text-md text-gray-600">
          At BidXpert, we are passionate about connecting buyers and sellers through a transparent and efficient auction platform. Our mission is to create an inclusive community where everyone has the opportunity to participate in exciting bidding events and showcase their items.
        </p>

        <div className="flex items-center gap-2">
          <FaBullseye className="text-[#b90eb4] text-3xl" />
          <h2 className="text-gray-800 text-2xl font-bold">Our Vision</h2>
        </div>
        <p className="text-md text-gray-600">
          Our vision is to be the leading auction platform in the industry, known for our innovation, user-friendly experience, and unwavering commitment to customer satisfaction. We aim to empower individuals and businesses to sell and acquire items with ease and confidence.
        </p>

        <div className="flex items-center gap-2">
          <FaHandshake className="text-[#b90eb4] text-3xl" />
          <h2 className="text-gray-800 text-2xl font-bold">What We Offer</h2>
        </div>
        <ul className="list-disc list-inside text-md text-gray-600">
          <li>Secure and reliable auction platform.</li>
          <li>User-friendly interface for effortless navigation.</li>
          <li>Timely notifications and updates for bidders and auctioneers.</li>
          <li>Dedicated support team to assist you throughout your auction journey.</li>
        </ul>

        <div className="flex items-center gap-2">
          <FaRegLightbulb className="text-[#b90eb4] text-3xl" />
          <h2 className="text-gray-800 text-2xl font-bold">Join Us</h2>
        </div>
        <p className="text-md text-gray-600">
          Whether you're a bidder looking for great deals or an auctioneer ready to showcase your items, BidXpert is here for you. Join our growing community today and experience the thrill of bidding!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
