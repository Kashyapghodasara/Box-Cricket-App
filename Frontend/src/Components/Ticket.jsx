import React from "react";

const Ticket = () => {
  return (
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
              className="w-28 md:w-36 object-contain"
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
              536348974239
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
              2:00 PM – 4:00 PM
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-gray-500">
              Date
            </p>
            <p className="text-xl font-semibold text-[#0C3B2E]">
              17 June 2025
            </p>
            <p className="text-sm text-gray-600">
              Monday
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-gray-500">
              Box
            </p>
            <p className="text-xl font-semibold text-[#0C3B2E]">
              #BX002 – Small
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-gray-500">
              Price
            </p>
            <p className="text-3xl font-bold text-[#0C3B2E]">
              ₹ 500
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 px-6 md:px-10 py-4 text-md text-gray-600">
          <p>
            📍 Rajkot, Gujarat, India – 360005
          </p>
          <p>
            📞 123 456 7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;  