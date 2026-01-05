import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRegistration from '../Store/useRegistration';
import usePaymentDetailStore from '../Store/usePaymentDetailStore';
import usePaymentIdStore from '../Store/usePaymentIdStore';
import axios from 'axios';
import { USER_BACKEND_URL } from '../Constant';
import toast from 'react-hot-toast';

const StepTicketDetails = () => {

  const [display, setDisplay] = React.useState(false);
  const [ticketNo, setTicketNo] = React.useState("");
  const [boxData, setBoxData] = React.useState({});
  const [paymentData, setPaymentData] = React.useState({});

  const navigate = useNavigate();
  const { isLoggedIn } = useRegistration();

  const paymentId = usePaymentIdStore((state) => state.paymentId);

  const ErrorToastStyle = {
    style: {
      background: "#212121", // dark mode black background
      color: "#fff",
      fontSize: "17px",     // white text
      padding: "12px 20px",
      borderRadius: "10px",
      width: "100%",
      fontWeight: "300",
      textAlign: "center",
    },
    iconTheme: {
      primary: "#eb1410", // red-400 (error icon color)
      secondary: "#1f2937", // gray-800
    },
    duration: 4000, // Optional: auto-close duration
  }

  const smallBoxBGImage = {
    clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
    backgroundImage: 'url("/Images/Orange4.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    transform: 'translateX(-5%) translateY(-25%)',
    zIndex: -5,
  }
  const mediumBoxBGImage = {
    clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
    backgroundImage: 'url("/Images/Blue2.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    transform: 'translateX(-5%) translateY(-25%)',
    zIndex: -5,
  }
  const largeBoxBGImage = {
    clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
    backgroundImage: 'url("/Images/Green4.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    transform: 'translateX(-5%) translateY(-25%)',
    zIndex: -5,
  }

  useEffect(() => {
    if (isLoggedIn === false) {
      toast.error("Please Login First", {
        style: ErrorToastStyle,
      });
      navigate('/')
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (!paymentId) {
      toast.error("Payment ID not found", ErrorToastStyle);
      return;
    }

    const fetchTicketDetails = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        const res = await axios.get(
          `${USER_BACKEND_URL}/getPayment/${paymentId}`,
          config
        );
        setBoxData(res.data.boxData)
        setPaymentData(res.data.paymentData)

        if (res.data.success === true) {
          setTicketNo(res.data.boxData.ticket_no);
        }
      } catch (error) {
        if (error.response?.data?.success === false) {
          toast.error(error.response.data.message, ErrorToastStyle);
        } else {
          toast.error(error.message, ErrorToastStyle);
        }
      }
    };

    fetchTicketDetails();
  }, [paymentId]);

  const to12HourFormat = (time24) => {
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // convert 0 -> 12
    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen mt-[-100px] py-0 px-4">
        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-gradient-to-br from-green-300 via-emerald-100 to-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border border-emerald-200"
        >
          {/* Icon Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="text-green-600 flex justify-center mb-4"
          >
            <CheckCircle2 size={72} strokeWidth={1.5} />
          </motion.div>

          {/* Main Success Message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-[#065f46] mb-3"
          >
            Payment Successful!
          </motion.h2>

          {/* Sub Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-700 text-md leading-relaxed"
          >
            We’ve received your payment securely.<br />
            A confirmation has been sent to your registered email. <br />
            Below is your ticket with all the details. <br />
            Wishing you a great experience ahead!
          </motion.p>

          {/* Transaction ID */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-sm text-gray-500"
          >
            {ticketNo && (
              <>
                <span className="font-semibold">Ticket NO:</span>
                <h1 className='text-[#065f46] text-xl font-semibold'>{ticketNo}</h1>
              </>
            )}
          </motion.div>
        </motion.div>


      </div>

      <div className='flex flex-col items-center justify-center mt-[-100px]'>
        <button
          onClick={(e) => { setDisplay(true) }}
          className='bg-[#065f46] hover:bg-[#0C3B2E] text-white font-bold py-2 px-4 rounded-md'>
          Generate Your Ticket
        </button>
      </div>

      {display === true && (
        <div className="min-h-screen bg-[#F4F1E1] flex flex-col items-center py-10 px-4">

          <h1 className="text-3xl md:text-4xl font-bold text-[#0C3B2E] mb-8">
            Your Ticket
          </h1>

          {/* Ticket Card */}
          <div className="w-full max-w-5xl bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-[#0C3B2E] px-6 md:px-10 py-6">
              <div className="flex items-center gap-6">
                <img
                  src="/Images/Logo-R.png"
                  alt="Criksy Logo"
                  className="w-32 md:w-40 object-contain"
                />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Criksy Box Cricket
                  </h2>
                  <p className="text-white/80 text-md md:text-base">
                    Rajkot, Gujarat, India
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 text-center md:text-right">
                <p className="text-xs uppercase tracking-widest text-white/70">
                  Ticket ID
                </p>
                <p className="font-mono text-lg md:text-xl tracking-widest text-white">
                  {ticketNo}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-10 py-8 text-center">

              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500">
                  Time
                </p>
                <p className="text-xl font-semibold text-[#0C3B2E]">
                  {to12HourFormat(boxData.start_time)} – {to12HourFormat(boxData.end_time)}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500">
                  Date
                </p>
                <p className="text-xl font-semibold text-[#0C3B2E]">
                  {new Date(boxData.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(boxData.date).toLocaleDateString("en-US", { weekday: "long" })}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500">
                  Box
                </p>
                <p className="text-xl font-semibold text-[#0C3B2E]">
                  #{boxData.box_id} – {boxData.size}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500">
                  Price
                </p>
                <p className="text-3xl font-bold text-[#0C3B2E]">
                  ₹ {boxData.price}
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 px-6 md:px-10 py-4 text-md text-gray-600">
              <p>
                📍 Criksy Box Cricket, Rajkot – 123456
              </p>
              <p>
                📞 123 456 7890
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StepTicketDetails;
