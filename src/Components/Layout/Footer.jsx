import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa"; // Run: npm install react-icons

const Footer = () => {
  return (
    <footer className="bg-brand  text-white py-12 px-6 md:px-20 font-sans">
      <div className="container mx-auto  grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6">MegaMart</h2>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex items-start gap-3">
              <FaWhatsapp className="mt-1 text-xl" />
              <div>
                <p className="text-sm">Whats App</p>
                <p className="text-sm font-medium">+1 202-918-2132</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-lg" />
              <div>
                <p className="text-sm">Call Us</p>
                <p className="text-sm font-medium">+1 202-918-2132</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="font-semibold mb-4">Download App</p>
            <div className="flex gap-3">
              <img
                src="/play.png"
                alt="App Store"
                className="h-10 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Column 2: Popular Categories */}
        <div>
          <h3 className="text-lg font-semibold inline-block border-b-2 border-white pb-1 mb-6">
            Most Popular Categories
          </h3>
          <ul className="list-disc list-inside space-y-3 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Staples
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Beverages
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Personal Care
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Home Care
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Baby Care
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Vegetables & Fruits
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Snacks & Foods
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Dairy & Bakery
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Customer Services */}
        <div>
          <h3 className="text-lg font-semibold inline-block border-b-2 border-white pb-1 mb-6">
            Customer Services
          </h3>
          <ul className="list-disc list-inside space-y-3 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                E-waste Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cancellation & Return Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm">
        <p>© 2022 All rights reserved. Reliance Retail Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
