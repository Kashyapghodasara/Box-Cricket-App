import React from 'react'
import { motion } from 'framer-motion'

const ShowBookings = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-start pt-4 px-2 bg-gradient-to-br from-[#106851] via-[#1f8e6f] to-[#5db79e] min-h-screen">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl font-extrabold text-[#0C3B2E] mb-5 text-center drop-shadow-lg"
                >
                    Your Bookings
                </motion.h1>

                {/* Booking Details - 1 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-5xl bg-white/10 border mb-3 border-emerald-100 rounded-xl backdrop-blur-xl shadow-[0_8px_32px_0_rgba(16,185,129,0.5)] p-4"
                >
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                        {/* Left Section */}
                        <section className="flex flex-col gap-2 text-white">
                            <div className="flex gap-2 text-xl">
                                <span className="font-semibold">📅 Date:</span>
                                <span className="text-emerald-100">20-06-2025</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Size:</span>
                                <span className="text-emerald-100">Large</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Duration:</span>
                                <span className="text-emerald-100">2 Hours</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Start Time:</span>
                                <span className="text-emerald-100">10:00 AM</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>End Time:</span>
                                <span className="text-emerald-100">12:00 PM</span>
                            </div>
                        </section>

                        {/* Right Section */}
                        <section className="flex flex-col gap-2 text-white text-right lg:items-end">
                            <div className="flex gap-2 text-2xl font-semibold">
                                <span>🎟️ Ticket No:</span>
                                <span className="text-emerald-100">123456789123</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Price:</span>
                                <span className="text-emerald-100">Rs. 900</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Payment:</span>
                                <span className="text-emerald-100">UPI</span>
                            </div>
                        </section>
                    </div>
                </motion.div>

                 {/* Booking Details - 2 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-5xl bg-white/10 border border-emerald-100 rounded-xl backdrop-blur-xl shadow-[0_8px_32px_0_rgba(16,185,129,0.5)] p-4"
                >
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                        {/* Left Section */}
                        <section className="flex flex-col gap-2 text-white">
                            <div className="flex gap-2 text-xl">
                                <span className="font-semibold">📅 Date:</span>
                                <span className="text-emerald-100">20-06-2025</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Size:</span>
                                <span className="text-emerald-100">Large</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Duration:</span>
                                <span className="text-emerald-100">2 Hours</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Start Time:</span>
                                <span className="text-emerald-100">10:00 AM</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>End Time:</span>
                                <span className="text-emerald-100">12:00 PM</span>
                            </div>
                        </section>

                        {/* Right Section */}
                        <section className="flex flex-col gap-2 text-white text-right lg:items-end">
                            <div className="flex gap-2 text-2xl font-semibold">
                                <span>🎟️ Ticket No:</span>
                                <span className="text-emerald-100">123456789123</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Price:</span>
                                <span className="text-emerald-100">Rs. 900</span>
                            </div>
                            <div className="flex gap-2 text-lg">
                                <span>Payment:</span>
                                <span className="text-emerald-100">UPI</span>
                            </div>
                        </section>
                    </div>
                </motion.div>

            </div>
        </>
    )
}

export default ShowBookings