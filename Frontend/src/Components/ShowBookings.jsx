import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import useRegistration from "../Store/useRegistration";
import useUserIdStore from "../Store/useUserIdStore";
import { USER_BACKEND_URL } from "../Constant";

const ShowBookings = () => {
  const { isLoggedIn, logout, isSignedUp } = useRegistration();
  const { loggedInUserId } = useUserIdStore();
  const [resData, setResData] = useState([]);

  const SuccessToastStyle = {
    style: {
      background: "#212121",
      color: "#fff",
      fontSize: "16px",
      padding: "12px 20px",
      borderRadius: "10px",
      fontWeight: "300",
      textAlign: "center",
    },
    iconTheme: { primary: "#39bf04", secondary: "#1f2937" },
    duration: 2000,
  };

  const ErrorToastStyle = {
    style: {
      background: "#212121",
      color: "#fff",
      fontSize: "16px",
      padding: "12px 20px",
      borderRadius: "10px",
      fontWeight: "300",
      textAlign: "center",
    },
    iconTheme: { primary: "#eb1410", secondary: "#1f2937" },
    duration: 2000,
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_BACKEND_URL}/logout`, {}, { withCredentials: true });
      if (res.data.success) {
        logout();
        toast.success(res.data.message, SuccessToastStyle);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed", ErrorToastStyle);
    }
  };

  const getAllBookingDetails = async () => {
    try {
      const res = await axios.get(
        `${USER_BACKEND_URL}/getBookingsDetails/${loggedInUserId}`,
        { withCredentials: true }
      );
      setResData(res.data.bookingData);
    } catch (error) {
      console.log("Error fetching bookings", error.message);
    }
  };

  useEffect(() => {
    getAllBookingDetails();
  }, []);

  const to12HourFormat = (time24) => {
    const [h, m] = time24.split(":");
    let hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${m} ${ampm}`;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#106851] via-[#1f8e6f] to-[#5db79e]">

      {/* ================= NAVBAR ================= */}
      <nav className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-4">
        
        {/* LOGO */}
        <h1
          className="text-4xl md:text-5xl font-bold text-emerald-50"
          style={{ fontFamily: "Gabarito" }}
        >
          Criksy
        </h1>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0 text-emerald-50 text-lg">
          <Link to="/">Home</Link>
          <Link to="/showBookings">Bookings</Link>
          <Link to="/">Contact</Link>
        </div>

        {/* AUTH BUTTONS */}
        <div className="mt-4 md:mt-0">
          {isLoggedIn ? (
            <button
              onClick={logoutHandler}
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-white"
            >
              Logout
            </button>
          ) : (
            <Link to="/registration">
              <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full">
                {isSignedUp ? "Login" : "Signup"}
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* ================= TITLE ================= */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-extrabold text-[#0C3B2E] text-center mt-6 mb-8"
      >
        Your Bookings
      </motion.h1>

      {/* ================= BOOKINGS ================= */}
      <div className="flex flex-col items-center gap-8 px-4 pb-12">
        {resData?.bookings?.length > 0 ? (
          resData.bookings.map((item, index) => {
            const payment = resData?.payments?.[index];

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden"
              >
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-[#0C3B2E] p-6 gap-6">
                  <div className="flex items-center gap-6">
                    <img
                      src="/Images/Logo-R.png"
                      alt="Logo"
                      className="w-28 md:w-40"
                    />
                    <div>
                      <h2 className="text-2xl md:text-3xl text-white font-bold">
                        Criksy Box Cricket
                      </h2>
                      <p className="text-white/70">Rajkot, Gujarat</p>
                    </div>
                  </div>
                  <p className="text-white font-mono tracking-widest">
                    Ticket: {item.ticket_no}
                  </p>
                </div>

                {/* BODY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 text-center">
                  <div>
                    <p className="text-gray-500 uppercase text-sm">Time</p>
                    <p className="font-semibold">
                      {to12HourFormat(item.start_time)} - {to12HourFormat(item.end_time)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase text-sm">Date</p>
                    <p className="font-semibold">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase text-sm">Box</p>
                    <p className="font-semibold">
                      {item.box_no} ({item.size})
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase text-sm">Price</p>
                    <p className="text-2xl font-bold text-[#0C3B2E]">
                      ₹ {item.price}
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-t text-gray-600">
                  <p>📍 Rajkot, Gujarat</p>
                  <p>💳 {payment?.paymentMethode || "Online Payment"}</p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-white text-lg">No bookings found</p>
        )}
      </div>
    </section>
  );
};

export default ShowBookings;