import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const StepTicketDetails = () => {
  return (
    <>    <div className="flex flex-col items-center justify-center min-h-screen py-0 px-4">
      {/* Success Card */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gradient-to-br from-green-100 via-emerald-50 to-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border border-emerald-200"
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
          className="text-gray-700 text-sm leading-relaxed"
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

      {/* Ticket Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 w-full max-w-3xl"
      >
      </motion.div>
    </div>
      <div className='flex justify-items-center flex-col'>
        <h3 className="text-xl font-semibold text-[#0C3B2E] mb-4">🎫 Your Ticket</h3>
        {/* 👉 Replace this with your actual ticket component */}
        <div className="text-gray-600 text-sm italic">Ticket content will appear here...</div>
      </div>
    </>

  );
};

export default StepTicketDetails;
