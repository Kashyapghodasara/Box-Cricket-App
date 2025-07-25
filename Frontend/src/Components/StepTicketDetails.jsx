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
        <>
          {/* Ticket Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className=" mt-[-0px] w-full max-w-3xl"
          >
          </motion.div>

          <div id="ticket" className="flex flex-col items-center justify-center min-h-screen">
            {/* Ticket 2 */}
            <div
              className="w-[60%] h-[300px]  m-5 shadow-lg relative"
              style={
                boxData.size === "Small"
                  ? smallBoxBGImage
                  : boxData.size === "Medium"
                  ? mediumBoxBGImage
                  : largeBoxBGImage
              }

            >
              <div>
                <div class="line"></div>

                <div className='flex flex-col gap-2 text-center top-[39%] right-0 absolute rotate-270'>
                  <h2 className='text-md font-semibold'
                    style={{ fontFamily: 'Roboto Mono, monospace' }}
                  >Ticket ID</h2>
                  <h1 className='text-2xl font-semibold font-mono tracking-widest text-[#ffffff]'
                    style={{ fontFamily: 'Roboto Mono, monospace' }}
                  >
                    {ticketNo}
                  </h1>
                </div>


                <div className="relative w-full h-full">
                  <img src="/Images/Logo-R.png" alt="Logo" className="image" />
                  <div>
                  </div>
                </div>

                <div className='absolute flex justify-center text-center top-1/5 left-4/12 transform -translate-x-1/2 -translate-y-1/2'>
                  <div>
                    <h1 className='text-3xl font-bold text-[#ffffff]'>Time</h1>
                    <h2 className='text-lg'>{to12HourFormat(boxData.start_time)} - {to12HourFormat(boxData.end_time)}</h2>
                  </div>
                </div>
                <div className='absolute flex justify-center text-center top-1/5 left-5/8 transform -translate-x-1/2 -translate-y-1/2'>
                  <div>
                    <h1 className='text-3xl font-bold text-[#ffffff]'>Date</h1>
                    <h2 className='text-lg'>{new Date(boxData.date).toLocaleDateString()}</h2>
                  </div>
                </div>
                <div className='absolute flex justify-center text-center top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2'>
                  <div>
                    <h1 className='text-3xl font-bold text-[#ffffff]'>Box</h1>
                    <h2 className='text-lg'>#{boxData.box_id} &nbsp; &nbsp; -  &nbsp; &nbsp; {boxData.size}</h2>
                  </div>
                </div>
                <div className='absolute flex justify-center text-center top-1/2 left-5/8 transform -translate-x-1/2 -translate-y-1/2'>
                  <div className="bg-white/10 backdrop-blur-sm px-12 py-2 rounded-xl shadow-md border border-white/20">
                    <h1 className='text-2xl font-bold text-[#ffffff]'>Price</h1>
                    <h2 className='text-xl font-semibold text-[#FFD700] tracking-widest glow'>
                      ₹ {boxData.price}
                    </h2>
                  </div>
                </div>


                {/* Address */}
                <div className='absolute flex justify-center text-start top-[88%]  left-4/11 transform -translate-x-1/2 -translate-y-1/2'>
                  <div>
                    <p className='font-mono text-[13px] text-[#ffffff]'
                      style={{ fontFamily: 'Roboto Mono, monospace' }}
                    >
                      14th Street, Criksy Box Cricket, Near Pilson Intersection,
                      South Prickle Pine, Las Venturas, San Andreas - 1524207
                    </p>
                    <h3 className='m-1 ml-0 text-sm text-[#ffffff]'>Ph - 123 456 7890</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

    </>

  );
};

export default StepTicketDetails;
