import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const StepTicketDetails = () => {

  const [display, setDisplay] = React.useState(false);

  const handleDisplayTicket = () => {
    // Button Disabled
    // Try-catch block to fetch data from backend
    // When data fetched successfully call setDisplay(true)
    // Button Inabled
  }

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
            <span className="font-medium">Ticket NO:</span> #TXN1234567890
          </motion.div>
        </motion.div>


      </div>

      <div className='flex flex-col items-center justify-center mt-[-100px]'>
        <button 
        onClick={handleDisplayTicket}
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

              style={{
                clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
                backgroundImage: 'url("/Images/Green4.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                transform: 'translateX(-5%) translateY(-25%)',
                zIndex: -5,
              }}

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
                    684612645587
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
                    <h2 className='text-lg'>9:00 pm - 11:00 pm</h2>
                  </div>
                </div>
                <div className='absolute flex justify-center text-center top-1/5 left-5/8 transform -translate-x-1/2 -translate-y-1/2'>
                  <div>
                    <h1 className='text-3xl font-bold text-[#ffffff]'>Date</h1>
                    <h2 className='text-lg'>10 - 06 - 2025  &nbsp; &nbsp; -  &nbsp; &nbsp; Tuesday</h2>
                  </div>
                </div>
                <div className='absolute flex justify-center text-center top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2'>
                  <div>
                    <h1 className='text-3xl font-bold text-[#ffffff]'>Box</h1>
                    <h2 className='text-lg'>#BX002 &nbsp; &nbsp; -  &nbsp; &nbsp; Small</h2>
                  </div>
                </div>
                <div className='absolute flex justify-center text-center top-1/2 left-5/8 transform -translate-x-1/2 -translate-y-1/2'>
                  <div className="bg-white/10 backdrop-blur-sm px-12 py-2 rounded-xl shadow-md border border-white/20">
                    <h1 className='text-2xl font-bold text-[#ffffff]'>Price</h1>
                    <h2 className='text-xl font-semibold text-[#FFD700] tracking-widest glow'>
                      ₹ 1000
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
