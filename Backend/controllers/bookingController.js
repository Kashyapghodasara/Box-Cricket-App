import User from '../models/userSchema.js'
import Booking from '../models/bookingSchema.js'


export const bookingBox = async (req, res) => {
    try {
        const { Boxid, Date, Start_time, End_time, Price, Size, Duration } = req.body
        // This is Field Name not Actual DB Key's
        if (!Boxid || !Date || !Start_time || !End_time || !Price || !Size || !Duration) {
            return res.status(401).json({
                message: "Please fill all the fields",
                success: false
            })
        }
        // Fix Later
        const randomTicketNumber = Math.floor(Math.random() * 1000000000000);

        const findBooking = await Booking.findOne({
            box_id: Boxid,
            date: Date,
            start_time: Start_time,
            end_time: End_time
        });
        if (findBooking) {
            return res.status(400).json({
                message: "Slot is already booked!",
                success: false
            });
        }

        const newBooking = await Booking.create({
            box_id: Boxid,
            user_id: req.user._id,  // LoggedIN user ID
            date: Date,
            start_time: Start_time,
            end_time: End_time,
            duration: Duration,
            ticket_no: randomTicketNumber,
            size: Size,
            price: Price,
            user: req.user
        })

        const findUser = await User.findById(req.user._id)
        if (!findUser) {
            return res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }
        findUser.bookings.push(newBooking._id)
        findUser.ticket_no.push(randomTicketNumber)
        await findUser.save()

        return res.status(200).json({
            message: "Box Booked Successfully",
            success: true,
            box_id: newBooking._id
        })

    } catch (error) {
        console.log("Error Occure in Booking", error.message)
    }

}

export const getBookingDetails = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }

        const findUser = await User.findById(userId)
            .populate("bookings") // assuming you want all fields in bookings
            .populate({
                path: "payments",
                select: "-paymentDetails"
            })
            .select("-password");

        if (!findUser) {
            return res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }

        return res.status(200).json({
            message: "User Bookings Fetched Successfully",
            success: true,
            bookingData: findUser
        })

    } catch (error) {
        console.log("Error Occure in getBookingDetails", error.message)
    }
}

export const bookedSloteChecking = async (req, res) => {
    try {
        /*  console.log(req.body) */ 
        const userId = req.params.userId;
        const { getDate } = req.body

        if(!getDate){
            return res.status(404).json({
                message: "Date Not Found",
                success: false
            })
        }

        if (!userId) {
            return res.status(404).json({
                message: "User Id Not Found",
                success: false
            })
        }

        const findUser = await User.findById(userId)
            .populate({
                path: "bookings",
                select: "-paymentInfo"
            })
            .select("-password -ticket_no -payments");

        if (!findUser) {
            return res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }

        const min = new Date(new Date(getDate).setUTCHours(0, 0, 0, 0));
        const max = new Date(new Date(getDate).setUTCHours(23, 59, 59, 999));
        const getSetDate = new Date(new Date(getDate).setUTCHours(0, 0, 0, 0));

        const bookedSlotsToday = findUser.bookings.filter((booked) => {    // filter only return true or false
            return booked.date >= min && booked.date <= max;
        });

        return res.status(200).json({
            message: "Booked Slote Details Fetched",
            success: true,
            bookedSloteData: bookedSlotsToday
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

