import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#0C3B2E] text-white py-10 mt-10 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand / Logo */}
                <div>
                    <h2 className="text-4xl font-bold mb-4">Criksy</h2>
                    <p className="text-sm text-gray-300">Book your box cricket slots with ease. Fast. Reliable. Hassle-Free.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-md text-gray-300">
                        <li><a href="/" className="hover:text-white transition">Home</a></li>
                        <li><a href="/book" className="hover:text-white transition">Book Now</a></li>
                        <li><a href="/about" className="hover:text-white transition">About</a></li>
                        <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <p className="text-md mb-2 text-gray-300">📞 +91 98765 43210</p>
                    <p className="text-md mb-2 text-gray-300">📧 support@criksy.in</p>
                    <p className="text-md mb-2 text-gray-300">🏠 Rajkot, Gujarat</p>
                </div>


                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <a href="#" className="hover:text-[#101010] transition text-md"><BsTwitterX /></a>
                        <a href="#" className="hover:text-[#4267B2] transition"><FaLinkedinIn /></a>
                        <a href="#" className="hover:text-[#C13584] transition text-md"><FaInstagram /></a>
                        <a href="#" className="hover:text-[#0077B5] transition"><FaFacebookSquare /></a>
                        <img src="./Images/Logo-R.png" alt="Logo" className="w-32 mt-6 relative left-[-54%]" />
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Criksy. All rights reserved.
            </div>
        </footer>

    )
}

export default Footer