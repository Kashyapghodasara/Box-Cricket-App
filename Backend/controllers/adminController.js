import Admin from "../models/adminSchema.js"
import User from "../models/userSchema.js"
import Booking from "../models/bookingSchema.js"
import Payment from "../models/paymentSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv, { decrypt } from "dotenv"
import crypto from "crypto"
import { Error, set } from "mongoose"

dotenv.config({ path: "../.env" })

function decryptText(encrypted) {

    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 bytes
    const ALGORITHM = process.env.ALGO;

    if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
        throw new Error("ENCRYPTION_KEY must be exactly 32 characters long");
    }

    let data = encrypted;

    // if somehow still string, parse it — but skip if already object
    if (typeof encrypted === "string") {
        try {
            data = JSON.parse(encrypted);
        } catch {
            throw new Error("Invalid JSON in encrypted string");
        }
    }

    const iv = Buffer.from(data.iv, 'hex');
    const content = Buffer.from(data.content, 'hex');

    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        Buffer.from(ENCRYPTION_KEY),
        iv
    );

    let decrypted = decipher.update(content);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}


export const adminLogin = async (req, res) => {
    try {
        const { name, username, email, password, secret_string } = req.body


        if (!username || !name || !email || !password || !secret_string) {
            return res.status(401).json("Please fill all the fields")
        }

        const findAdmin = await Admin.findOne({ email, username })
        if (!findAdmin) {
            return res.status(400).json({ message: "Admin not found", success: false })
        }

        const decryptString = await decryptText(findAdmin.secret_string)

        if (decryptString !== secret_string) {
            return res.status(400).json({
                message: "Admin Credentials doesn't match",
                success: false
            })
        }

        const hashPW = findAdmin.password
        const comparePW = await bcrypt.compare(password, hashPW)
        /* console.log(comparePW)   */// return TRUE

        if (!comparePW) {
            return res.status(401).json({
                message: "Password doesn't match in Admin Login Process",
                success: false
            })
        }

        const tokenData = {
            id: findAdmin._id
        }

        const token = jwt.sign(tokenData, process.env.ADMIN_JWT_SECRET, { expiresIn: "1d" })
        const findAdminWithToken = await Admin.findOne({ email, username }).select('-password -secret_string')

        return res.cookie("adminToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }).status(200).json({
            message: "Admin logged in successfully",
            username: `Welcome ${findAdminWithToken.username}`,
            admin: findAdminWithToken,
            success: true
        });


    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const totalBalance = async (req, res) => {
    try {
        const findBookings = await Booking.find({}).populate("paymentInfo");

        if (!findBookings || findBookings.length === 0) {
            return res.status(404).json({
                message: "No bookings found",
                success: false
            });
        }

        let totalAmount = findBookings.reduce((total, booking) => {
            return total + booking.price;
        }, 0);

        /* console.log(totalAmount); */

        return res.status(200).json({
            message: "Total balance fetched successfully",
            totalBalance: totalAmount,
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const adminLogout = async (req, res) => {
    try {
        res.cookie("adminToken", " ", { expires: new Date(0), httpOnly: true }).status(200).json({
            message: "Admin Logged out successfully",
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const todayBookedSlots = async (req, res) => {
    try {
        const formattedDate = new Date().toLocaleDateString('en-CA');
        /* console.log(formattedDate); */

        const findBookedSlote = await Booking.countDocuments({ date: formattedDate })
        /* console.log(findBookedSlote) */

        if (findBookedSlote === 0) {
            return res.status(200).json({
                message: "No bookings found for today",
                success: false,
                bookedSlotes: 0
            });
        }

        return res.status(200).json({
            message: "Today's booked slots fetched successfully",
            success: true,
            bookedSlotes: findBookedSlote
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const todayRevenue = async (req, res) => {
    try {
        const formattedDate = new Date().toLocaleDateString('en-CA');

        const findBookings = await Booking.find({ date: formattedDate }).populate("paymentInfo");

        if (!findBookings || findBookings.length === 0) {
            return res.status(200).json({
                message: "No bookings found for Today",
                success: false
            });
        }

        const todayRevenue = findBookings.reduce((total, booking) => {
            return total + booking.price;
        }, 0);

        return res.status(200).json({
            message: "Today's revenue fetched successfully",
            success: true,
            todayRevenue
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const getBookedBoxStat = async (req, res) => {
    try {
        const smallCount = await Booking.countDocuments({ size: "Small" })
        const mediumCount = await Booking.countDocuments({ size: "Medium" })
        const largeCount = await Booking.countDocuments({ size: "Large" })

        if (smallCount === 0 && mediumCount === 0 && largeCount === 0) {
            return res.status(200).json({
                message: "No bookings found for the specified sizes",
                success: true,
                boxCount: {
                    Small: smallCount,
                    Medium: mediumCount,
                    Large: largeCount
                }
            });
        }

        return res.status(200).json({
            message: "Box Booking Statistics fetched successfully",
            success: true,
            boxCount: {
                Small: smallCount,
                Medium: mediumCount,
                Large: largeCount
            }
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const getPaymentMethodStat = async (req, res) => {
    try {
        const UPI_Count = await Payment.countDocuments({ paymentMethode: "UPI" });
        const BankTransfer_Count = await Payment.countDocuments({ paymentMethode: "Bank Transfer" });

        if (UPI_Count === 0 && BankTransfer_Count === 0) {
            return res.status(200).json({
                message: "No payments found for the specified methods",
                success: true,
                paymentMethodCount: {
                    UPI: UPI_Count,
                    BankTransfer: BankTransfer_Count
                }
            });
        }

        return res.status(200).json({
            message: "Payment Method Statistics fetched successfully",
            success: true,
            paymentMethodCount: {
                UPI: UPI_Count,
                BankTransfer: BankTransfer_Count
            }
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const tomorrowBookingDetails = async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-CA');
        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-CA');

        const findTomorrowBookings = await Booking.countDocuments({ date: tomorrow })
        const findTomorrowRevenue = await Booking.find({ date: tomorrow }).select("-paymentInfo")

        if (findTomorrowBookings === 0 && findTomorrowRevenue.length === 0) {
            return res.status(200).json({
                message: "No bookings found for tomorrow",
                success: true,
                tomorrowBookings: findTomorrowBookings,
                tomorrowRevenue: findTomorrowRevenue
            });
        }

        const tomorrowRevenue = findTomorrowRevenue.reduce((total, booking) => {
            return total + booking.price;
        }, 0)

        return res.status(200).json({
            message: "Tomorrow's Booking Details fetched successfully",
            success: true,
            tomorrowBookings: findTomorrowBookings,
            tomorrowRevenue
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const overmorrowBookingDetails = async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-CA');
        const overmorrow = new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString('en-CA');

        const findovermorrowBookings = await Booking.countDocuments({ date: overmorrow })
        const findovermorrowRevenue = await Booking.find({ date: overmorrow }).select("-paymentInfo")

        if (findovermorrowBookings === 0 && findovermorrowRevenue.length === 0) {
            return res.status(200).json({
                message: "No bookings found for tomorrow",
                success: true,
                tomorrowBookings: findovermorrowBookings,
                tomorrowRevenue: findovermorrowRevenue
            });
        }

        const overmorrowRevenue = findovermorrowRevenue.reduce((total, booking) => {
            return total + booking.price;
        }, 0)

        return res.status(200).json({
            message: "Tomorrow's Booking Details fetched successfully",
            success: true,
            overmorrowBookings: findovermorrowBookings,
            overmorrowRevenue
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const monthlyBookingStat = async (req, res) => {
    try {
        const givenYear = 2025;

        const monthlyBookings = await Booking.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(`${givenYear}-01-01`),
                        $lt: new Date(`${givenYear + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$date" }, // Use "date" from schema
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: {
                        $arrayElemAt: [
                            [
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ],
                            { $subtract: ["$_id", 1] }
                        ]
                    },
                    count: 1
                }
            },
            {
                $sort: { month: 1 }
            }
        ]);

        /* console.log(monthlyBookings); */

        if (monthlyBookings.length === 0) {
            return res.status(200).json({
                message: "No bookings found for the specified months",
                success: true,
                monthlyBookings: []
            });
        }

        return res.status(200).json({
            message: "Monthly Booking Statistics fetched successfully",
            success: true,
            monthlyBookings
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const yesterdayBookingDetails = async (req, res) => {
    try {
        const today = new Date();
        const yesterday = new Date(today).setDate(today.getDate() - 1);
        const formattedDate = new Date(yesterday).toLocaleDateString('en-CA')
        /* console.log(formattedDate); */

        const findYesterDayBookings = await Booking.countDocuments({ date: formattedDate })
        const findYesterDayRevenue = await Booking.find({ date: formattedDate }).select("-paymentInfo")

        if (findYesterDayBookings === 0 && findYesterDayRevenue === 0) {
            return res.status(200).json({
                message: "No bookings found for yesterday",
                success: true,
                yesterDayBookings: findYesterDayBookings,
                yesterDayRevenue: findYesterDayRevenue
            });
        }

        const yesterDayRevenue = findYesterDayRevenue.reduce((total, booking) => {
            return total + booking.price;
        }, 0)

        return res.status(200).json({
            message: "Yesterday's Booking Details fetched successfully",
            success: true,
            yesterDayBookings: findYesterDayBookings,
            yesterDayRevenue: yesterDayRevenue
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const lastWeekBookingDetails = async (req, res) => {
    try {
        const today = new Date();
        const todayDate = new Date(today).toLocaleDateString('en-CA');
        /* console.log(todayDate); */
        const lastWeekDate = new Date(today).setDate(today.getDate() - 7);
        /* console.log(new Date(lastWeekDate).toLocaleDateString('en-CA')); */

        const findLastWeekBookings = await Booking.countDocuments({
            date: {
                $gte: lastWeekDate,
                $lt: todayDate
            }
        }).select("-paymentInfo")

        const findLastWeekRevenue = await Booking.find({
            date: {
                $gte: lastWeekDate,
                $lt: todayDate
            }
        }).select("-paymentInfo")

        /* console.log(findLastWeekRevenue); */

        const lastWeekRevenue = findLastWeekRevenue.reduce((total, item) => {
            return total + item.price;
        }, 0)

        /* console.log(lastWeekRevenue); */


        if (!findLastWeekBookings === 0 && findLastWeekRevenue.length === 0) {
            return res.status(200).json({
                message: "No bookings found for last week",
                success: true,
                lastWeekBookings: 0
            })
        }

        return res.status(200).json({
            message: "Last Week's Booking Details fetched successfully",
            success: true,
            lastWeekBookings: findLastWeekBookings,
            lastWeekRevenue: lastWeekRevenue
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const lastMonthBookingDetails = async (req, res) => {
    try {
        const today = new Date();
        const todayDate = new Date(today).toLocaleDateString('en-CA');
        const givenYear = today.getFullYear();
        const givenMonth = today.getMonth(); // 0-11


        const lastMonthBookings = await Booking.countDocuments({
            date: {
                $gte: new Date(`${givenYear}-${givenMonth}-01`),
                $lt: new Date(`${givenYear}-${givenMonth + 1}-01`)
            }
        })

        const lastMonthRevenueDetails = await Booking.find({
            date: {
                $gte: new Date(`${givenYear}-${givenMonth}-01`),
                $lt: new Date(`${givenYear}-${givenMonth + 1}-01`)
            }
        }).select("-paymentInfo")


        const lastMonthRevenue = lastMonthRevenueDetails.reduce((total, item) => {
            return total + item.price;
        }, 0)

        /* console.log(lastMonthRevenueAmount); */

        if (lastMonthBookings === 0 && lastMonthRevenue.length === 0) {
            return res.status(200).json({
                message: "No bookings found for last month",
                success: true,
                lastMonthBookings,
                lastMonthRevenue
            })
        }

        console.log(lastMonthRevenue)

        return res.status(200).json({
            message: "Last Month's Booking Details fetched successfully",
            success: true,
            lastMonthBookings,
            lastMonthRevenue
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const lastYearBookingDetails = async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-CA');
        const givenYear = new Date(today).getFullYear();
        const pastYear = new Date(today);
        pastYear.setFullYear(pastYear.getFullYear() - 1);
        /* console.log(pastYear.getFullYear()); */

        const lastYearBookingDetails = await Booking.countDocuments({
            date: {
                $gte: new Date(`${pastYear.getFullYear()}-01-01`),
                $lt: new Date(`${givenYear}-01-01`),
            }
        })

        const lastYearRevenueDetails = await Booking.find({
            date: {
                $gte: new Date(`${pastYear.getFullYear()}-01-01`),
                $lt: new Date(`${givenYear}-01-01`),
            }
        })

        /*  console.log(lastYearBookingDetails)
         console.log(lastYearRevenueDetails) */

        if (lastYearBookingDetails === 0 && lastYearRevenueDetails.length === 0) {
            return res.status(200).json({
                message: "No bookings found for last year",
                success: true,
                lastYearBookings: lastYearBookingDetails,
                lastYearRevenue: 0
            })
        }

        const lastYearRevenue = lastYearRevenueDetails.reduce((total, item) => {
            return total + item.price;
        }, 0)

        return res.status(200).json({
            message: "Last Year's Booking Details fetched successfully",
            success: true,
            lastYearBookings: lastYearBookingDetails,
            lastYearRevenue
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const fetchTransactionDetails = async (req, res) => {
    try {
        const findAllTransactions = await Payment.find({}).populate("bookedBoxInfo").select("-createdAt -updatedAt -__v -paymentDetails").sort({ createdAt: -1 });  // Newest document first

        if (!findAllTransactions || findAllTransactions.length === 0) {
            return res.status(400).json({
                message: "No transactions found",
                success: false,
                transactions: []
            })
        }
        return res.status(200).json({
            message: "All Transactions fetched successfully",
            success: true,
            transactions: findAllTransactions
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}