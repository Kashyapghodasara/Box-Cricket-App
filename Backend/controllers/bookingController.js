import User from '../models/userSchema.js'
import Booking from '../models/bookingSchema.js'


export const bookingBox = async (req, res) => {
    try {
        const { Boxid, Date, Start_time, End_time, Price, Size, Duration } = req.body  
        // This is Field Name not Actual DB Key's
        if (!Boxid || !Date || !Start_time || !End_time || !Price || !Size || !Duration) {
            return res.status(400).json({
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
        if(!findUser){
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
            success: true
        })

    } catch (error) {
        console.log("Error Occure in Booking", error.message)
    }

}