import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import useBoxDetailStore from '../Store/useBoxDetailStore'
import usePaymentDetailStore from '../Store/usePaymentDetailStore'
import axios from "axios"
import useRegistration from '../Store/useRegistration';
import { USER_BACKEND_URL } from '../Constant';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* { boxDetails }	req.body.boxDetails
boxDetails (raw object)	req.body */

// TODO
// -> Dynamic Change BG according to size of the box
// -> Dynamic Change Data
// -> Random Generated Ticket NO
// -> Send Ticket info to Mail
// -> Loading Skeleton

const StepPreviewDetails = ({ onNext, onPrev }) => {

  const { boxDetails } = useBoxDetailStore();
  const { paymentDetails } = usePaymentDetailStore();
  const { isLoggedIn } = useRegistration()
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn === false) {
      toast.error("Please Login First", {
        style: ErrorToastStyle,
      });
      navigate('/')
    }
  }, [isLoggedIn])

  const SuccessToastStyle = {
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
      primary: "#39bf04", // red-400 (error icon color)
      secondary: "#1f2937", // gray-800
    },
    duration: 4000, // Optional: auto-close duration
  }
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

  const handleBookingGatway = async (e) => {
    e.preventDefault()

    try {
      // If you don’t set withCredentials: true → cookies are not sent → backend sees no token.

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      };
      const res = await axios.post(`${USER_BACKEND_URL}/bookings`, boxDetails, config)
      console.log(res)
      if (res.data.success === true) {
        toast.success(res.data.message, SuccessToastStyle);
      }
      const bookedSloteID = res.data.box_id
      handlePaymentDetailGatway(bookedSloteID)

    } catch (error) {
      if (error.response.data.message === false) {
        toast.error(error.response.data.message, ErrorToastStyle);
      } else {
        toast.error(error.response.data.message, ErrorToastStyle);
      }
    }

    onNext();
  }

  const handlePaymentDetailGatway = async (bookedSloteID) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      };

      const res = await axios.post(`${USER_BACKEND_URL}/createpayment/${bookedSloteID}`, paymentDetails, config)
      if(res.data.message === true) {
        toast.success(res.data.message, SuccessToastStyle)
      }

    } catch (error) {
      if (error.response.data.message === false) {
        toast.error(error.response.data.message, ErrorToastStyle);
      } else {
        toast.error(error.response.data.message, ErrorToastStyle);
      }
    }
  }

  return (
    <div className='w-[100%]' style={{ overflow: 'hidden' }} >

      {/* Form Section */}
      <div className='flex justify-center h-auto w-full overflow-x-hidden m-5 pt-5'>
        <div className='border-2 border-[#003828] h-auto m-6 rounded-xl w-full max-w-3xl p-8 shadow-lg bg-[#F4F1E1]'>
          <h1 className='text-4xl text-center font-bold text-[#0C3B2E] mb-5'>Details Preview</h1>


          <form methode='POST'>
            <h2 className='text-2xl text-center font-semibold text-[#03573f] mt-2'>━━ Box Details ━━</h2>
            {/* Date - Box ID */}
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="Date"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="Date"
                  value={boxDetails.Date}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>

              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="Boxid"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  Box ID
                </label>
                <input
                  type="text"
                  id="Boxid"
                  value={boxDetails.Boxid}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>
            </div>

            {/* Start Time - End Time */}
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="StartTime"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="StartTime"
                  value={boxDetails.Start_time}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>

              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="EndTime"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="EndTime"
                  value={boxDetails.End_time}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>
            </div>

            {/* Price - Size */}
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="Price"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="Price"
                  value={boxDetails.Price}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>

              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="Size"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  Size
                </label>
                <input
                  type="text"
                  id="Size"
                  value={boxDetails.Size}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>
            </div>

            {/* Payment Status */}
            <div className='relative w-[90%] m-5 mb-5 mt-10'>
              <label
                htmlFor="PaymentStatus"
                className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
              >
                Payment Status
              </label>
              <input
                type="text"
                id="PaymentStatus"
                value={boxDetails.Payment_status}
                readOnly
                className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
              />
            </div>


            <h2 className='text-2xl text-center font-semibold text-[#03573f] mt-15 mb-5'>━━ Payment Details ━━</h2>

            {/* Fullname */}
            <div className='relative w-[90%] m-5 mb-5 mt-10'>
              <label
                htmlFor="Fullname"
                className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
              >
                Fullname
              </label>
              <input
                type="text"
                id="Fullname"
                value={paymentDetails.Fullname}
                readOnly
                className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
              />
            </div>

            {/* Email - City */}
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="Email"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  value={paymentDetails.Email}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>

              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="City"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  City
                </label>
                <input
                  type="text"
                  id="City"
                  value={paymentDetails.City}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>
            </div>

            {/* State - Zipcode */}
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="State"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  State
                </label>
                <input
                  type="text"
                  id="State"
                  value={paymentDetails.State}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>

              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <label
                  htmlFor="Zipcode"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  Zipcode
                </label>
                <input
                  type="number"
                  id="Zipcode"
                  value={paymentDetails.Zipcode}
                  readOnly
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
              </div>
            </div>

            {/* Payment Methode */}
            <div className='relative w-[90%] m-5 mb-5 mt-10'>
              <label
                htmlFor="PaymentMethode"
                className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
              >
                Payment Methode
              </label>
              <input
                type="text"
                id="PaymentMethode"
                value={paymentDetails.paymentMethode}
                readOnly
                className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
              />
            </div>


            {paymentDetails.paymentMethode === "UPI" && (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <label
                      htmlFor="UPIid"
                      className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                    >
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="UPIid"
                      value={paymentDetails.UPIid}
                      readOnly
                      className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                  </div>

                  <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <label
                      htmlFor="TransactionID"
                      className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                    >
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      id="TransactionID"
                      value={paymentDetails.Transactionid}
                      readOnly
                      className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <label
                      htmlFor="Amount"
                      className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      id="Amount"
                      value={boxDetails.Price}
                      readOnly
                      className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                  </div>

                  <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <label
                      htmlFor="Remark"
                      className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                    >
                      Remark
                    </label>
                    <input
                      type="text"
                      id="Remark"
                      readOnly
                      value={paymentDetails.Remark}
                      className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                  </div>
                </div>
              </>

            )}

            {paymentDetails.paymentMethode === "Bank Transfer" && (
              <>
                {/* A/c Holder Name */}
                <div className='relative w-[90%] m-5 mb-5 mt-10'>
                  <label
                    htmlFor="A/cHoldername"
                    className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                  >
                    A/c Holder Name
                  </label>
                  <input
                    type="text"
                    id="A/cHoldername"
                    value={paymentDetails.acHolderName}
                    readOnly
                    className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                  />
                </div>

                {/* Bank Name - IFSC Code */}
                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <label
                      htmlFor="BankName"
                      className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="BankName"
                      value={paymentDetails.bankName}
                      readOnly
                      className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                  </div>

                  <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <label
                      htmlFor="IFSC"
                      className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                    >
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      id="IFSC"
                      value={paymentDetails.IFSC}
                      readOnly
                      className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                  </div>
                </div>

                {/* Amount - A/c Number */}
                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <label
                      htmlFor="Amount"
                      className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      id="Amount"
                      value={boxDetails.Price}
                      readOnly
                      className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                  </div>

                  <div className='relative w-[90%] m-5 mb-5 mt-10'>
                    <label
                      htmlFor="A/c Number"
                      className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                    >
                      A/c Number
                    </label>
                    <input
                      type="text"
                      id="A/c Number"
                      value={paymentDetails.acNumber}
                      readOnly
                      className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                  </div>
                </div>
              </>
            )}


            {/* Button Area */}
            <div className="flex justify-between mt-15">
              <div className='flex flex-row cursor-pointer items-center px-3 hover:bg-[#b3ffa0] rounded-md'>
                <FaArrowLeft className='text-[#0C3B2E]' />

                <button
                  onClick={onPrev}
                  className=' text-[#0C3B2E]  font-semibold py-2 px-3 rounded-md '>
                  Previous
                </button>
              </div>
              <button
                type='submit'
                onClick={handleBookingGatway}
                className='bg-[#eba604] cursor-pointer text-white py-2 px-12 rounded-md hover:bg-[#ffb300]'>
                Proceed to Pay
              </button>
            </div>

          </form>
        </div>
      </div >
    </div >
  )
}

export default StepPreviewDetails