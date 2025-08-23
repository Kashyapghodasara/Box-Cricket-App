import React from 'react'
import { useState, useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import usePaymentDetailStore from '../Store/usePaymentDetailStore';
import useBoxDetailStore from '../Store/useBoxDetailStore';
import useRegistration from '../Store/useRegistration';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const StepPaymentDetails = ({ onNext, onPrev }) => {

  const PaymentMethode = ["UPI", "Bank Transfer"]

  const [Fullname, setFullname] = useState('');
  const [Email, setEmail] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Zipcode, setZipcode] = useState('');
  const [UPI_id, setUPI_id] = useState('')
  const [TransactionId, setTransactionId] = useState('');
  const [Remark, setRemark] = useState('');
  const [Amount, setAmount] = useState('');
  const [Ac_name, setAc_name] = useState('');
  const [Ac_no, setAc_no] = useState('');
  const [Bankname, setBankname] = useState('');
  const [IFSC, setIFSC] = useState('');

  const [selectedPaymentMethode, setSelectedPaymentMethode] = useState(null)
  const [payment, setPayment] = useState('');
  const navigate = useNavigate()

  const { setPaymentDetails, paymentDetails } = usePaymentDetailStore();
  const { boxDetails } = useBoxDetailStore();
  const { isLoggedIn } = useRegistration()


  useEffect(() => {
    if (isLoggedIn === false) {
      toast.error("Please Login First", {
        style: toastStyle,
        iconTheme: toastIconTheme,
        duration: 4000,
      });
      navigate('/')
    }
  }, [isLoggedIn])


  const toastStyle = {
    background: "#212121",
    color: "#fff",
    fontSize: "17px",
    padding: "12px 20px",
    borderRadius: "10px",
    width: "100%",
    fontWeight: "300",
    textAlign: "center",
  };
  const toastIconTheme = {
    primary: "#f87171",
    secondary: "#1f2937",
  };


  const handleEmptyFieldLogic = (e) => {
    e.preventDefault();

    if (Fullname === "" || Email === "" || City === "" || State === "" || Zipcode === "") {
      toast.error("All fields are required", {
        style: toastStyle,
        iconTheme: toastIconTheme,
        duration: 4000,
      });
      return;
    }

    if (!selectedPaymentMethode) {
      toast.error("Please select a payment method", {
        style: toastStyle,
        iconTheme: toastIconTheme,
        duration: 4000,
      });
      return;
    }

    if (Zipcode.length !== 6) {
      toast.error("Zipcode must be 6 characters", {
        style: toastStyle,
        iconTheme: toastIconTheme,
        duration: 4000,
      });
      return;
    }

    if (selectedPaymentMethode === 'UPI') {
      if (UPI_id === "" || TransactionId === "" || Remark === "") {
        toast.error("All UPI fields are required", {
          style: toastStyle,
          iconTheme: toastIconTheme,
          duration: 4000,
        });
        return;
      }
    }

    if (selectedPaymentMethode === 'Bank Transfer') {
      if (Ac_name === "" || Ac_no === "" || Bankname === "" || IFSC === "") {
        toast.error("All Bank Transfer fields are required", {
          style: toastStyle,
          iconTheme: toastIconTheme,
          duration: 4000,
        });
        return;
      }

      if (IFSC.length !== 11) {
        toast.error("IFSC must be 11 characters", {
          style: toastStyle,
          iconTheme: toastIconTheme,
          duration: 4000,
        });
        return;
      }
    }

    // ✅ All validations passed
    handlePaymentDetails();
  };


  const handlePaymentDetails = () => {
    const commonDetails = {
      Fullname,
      Email,
      City,
      State,
      Zipcode,
      Amount: boxDetails.Price,
      paymentMethode: selectedPaymentMethode,
      User: [],
    };

    let finalPaymentDetails = {};

    if (selectedPaymentMethode === 'UPI') {
      // clear bank fields
      setAc_name('');
      setAc_no('');
      setBankname('');
      setIFSC('');

      finalPaymentDetails = {
        ...commonDetails,
        UPIid: UPI_id,
        Transactionid: TransactionId,
        Remark,
      };

    } else if (selectedPaymentMethode === 'Bank Transfer') {
      // clear UPI fields
      setUPI_id('');
      setTransactionId('');
      setRemark('');

      finalPaymentDetails = {
        ...commonDetails,
        acHolderName: Ac_name,
        acNumber: Ac_no,
        bankName: Bankname,
        IFSC,
      };
    }

    setPaymentDetails(finalPaymentDetails);
    /* console.log("Saved Payment Details: ", finalPaymentDetails); */
    onNext();
  };

  // Comman Details
  // finalPaymentDetails

  return (
    <>
      <div className='w-[100%]' style={{ overflow: 'hidden' }} >

        <div className='flex justify-center h-auto w-full overflow-x-hidden m-5 pt-5'>
          <div className='border-2 border-[#003828] h-auto m-6 rounded-xl w-full max-w-3xl p-8 shadow-lg bg-[#F4F1E1]'>
            <h1 className='text-4xl text-center font-bold text-[#0C3B2E] mb-2 '>Payment Details</h1>
            <h1 className='text-md text-center text-[#041913] mb-10'>Prototype Product - Please enter fake details</h1>

            <form onSubmit={handleEmptyFieldLogic}>

              {/* Fullname */}
              <div className='relative w-[90%] m-5 mb-5 mt-10'>
                <input
                  type="text"
                  id="Fullname"
                  name="Fullname"
                  value={Fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                />
                <label
                  htmlFor="Fullname"
                  className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                >
                  Fullname
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              {/* Email -City */}
              <div className='relative w-[90%] m-5 mb-5 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className="relative w-full mb-5 mt-10">
                  <label
                    htmlFor="Email"
                    className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    value={Email}
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12H8m8 0H8m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>


                <div className='relative w-full mb-5 mt-10'>
                  <input
                    type="text"
                    id="City"
                    value={City}
                    name='city'
                    onChange={(e) => setCity(e.target.value)}
                    className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                  />
                  <label
                    htmlFor="City"
                    className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
                top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
                peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                  >
                    City
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 12l4.243-4.243M6.343 7.343L10.586 12 6.343 16.657"
                    />
                  </svg>
                </div>
              </div>

              {/* State - Zipcode */}
              <div className='relative w-[90%] m-5 mb-5 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='relative w-full mb-5'>
                  <input
                    type="text"
                    id="State"
                    value={State}
                    name='state'
                    onChange={(e) => setState(e.target.value)}
                    className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                  />
                  <label
                    htmlFor="State"
                    className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
                top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
                peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                  >
                    State
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 1.343-3 3v4h6v-4c0-1.657-1.343-3-3-3z"
                    />
                  </svg>
                </div>

                <div className="relative w-full mb-5">
                  <label
                    htmlFor="Zipcode"
                    className="absolute left-1 -top-3 text-sm text-[#0C3B2E] px-1 z-10"
                  >
                    Zipcode
                  </label>
                  <input
                    type="number"
                    id="Zipcode"
                    value={Zipcode}
                    name='zipcode'
                    onChange={(e) => setZipcode(e.target.value)}
                    className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h2a1 1 0 011 1v6a1 1 0 001 1h10a1 1 0 001-1v-6a1 1 0 011-1h2"
                    />
                  </svg>
                </div>

              </div>

              {/* Box Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-5 gap-4 mt-6 w-full">
                {PaymentMethode.map((payment, index) => (
                  <div key={index} className="w-full">
                    <label className="relative cursor-pointer group block w-full">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        value={payment}
                        checked={payment === selectedPaymentMethode}
                        onChange={(e) => { e.target.checked ? setSelectedPaymentMethode(payment) && setPayment(payment) : setSelectedPaymentMethode(null) }}
                      />

                      <span className="flex text-2xl flex-col gap-2 items-center justify-center w-full h-full min-h-28 rounded-2xl border-2 border-gray-300 bg-gradient-to-br from-white via-white to-gray-50 text-gray-800 font-semibold shadow-lg transition-all duration-300 ease-in-out 
                peer-checked:border-blue-600 peer-checked:shadow-blue-400/50 peer-checked:shadow-md 
              peer-checked:text-blue-700 hover:border-blue-500 hover:shadow-md hover:scale-105">
                        {payment}
                      </span>
                      <span className="absolute top-2 left-2 w-6 h-6 rounded-full border-2 border-gray-300 bg-white opacity-0 scale-0 
                            peer-checked:scale-100 peer-checked:opacity-100 peer-checked:bg-blue-600 peer-checked:border-blue-600 
                            flex items-center justify-center text-white text-sm font-bold 
                             transition duration-300 ease-in-out shadow-md">
                        ✓
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              {selectedPaymentMethode === "UPI" && (
                <div>
                  {/* UPIID */}
                  <div className='relative w-[94%] m-5 mb-5 mt-10'>
                    <input
                      type="text"
                      id="UPIid"
                      value={UPI_id}
                      name='upiid'
                      onChange={(e) => setUPI_id(e.target.value)}
                      className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                    <label
                      htmlFor="UPIid"
                      className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
                        top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
                        peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                    >
                      UPI ID
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-2.21 0-4 1.79-4 4v5h8v-5c0-2.21-1.79-4-4-4zm0-5a2 2 0 00-2 2v1h4V5a2 2 0 00-2-2z"
                      />
                    </svg>

                  </div>

                  {/* transaction ID */}
                  <div className='relative w-[94%] m-5 mb-5 mt-10'>
                    <input
                      type="text"
                      id="TransactionId"
                      name='transactionid'
                      value={TransactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                    <label
                      htmlFor="TransactionId"
                      className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
                        top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
                        peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                    >
                      Transaction ID
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 14h6m-6-4h6m2 10H7a2 2 0 01-2-2V6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2z"
                      />
                    </svg>

                  </div>

                  {/* Remark - Amount */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-5 gap-4 mt-6 w-full'>
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
                        readOnly
                        value={boxDetails.Price}
                        className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                      />
                    </div>

                    <div className='relative w-[90%] m-5 mb-5 mt-10'>
                      <input
                        type="text"
                        id="Remark"
                        value={Remark}
                        name='remark'
                        onChange={(e) => setRemark(e.target.value)}
                        className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                      />
                      <label
                        htmlFor="Remark"
                        className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
                        top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
                        peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                      >
                        Remark
                      </label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h6m-6 4h8m1 4H5a2 2 0 01-2-2V5a2 2 0 012-2h10l4 4v13a2 2 0 01-2 2z"
                        />
                      </svg>

                    </div>
                  </div>

                </div>
              )}


              {selectedPaymentMethode === "Bank Transfer" && (
                <div>
                  {/* A/c Holder Name */}
                  <div className='relative w-[94%] m-5 mb-5 mt-10'>
                    <input
                      type="text"
                      id="A/c Holder name"
                      value={Ac_name}
                      name='ac_Holdername'
                      onChange={(e) => setAc_name(e.target.value)}
                      className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                    />
                    <label
                      htmlFor="A/c Holder name"
                      className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
                        top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
                        peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                    >
                      Account Holder Name
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A4 4 0 018 17h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                  </div>

                  {/* Bank Name - IFSC Code*/}
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-5 gap-4 mt-6 w-full'>
                    <div className='relative w-[90%] m-5 mb-5 mt-10'>
                      <input
                        type="text"
                        id="BankName"
                        value={Bankname}
                        name='bankname'
                        onChange={(e) => setBankname(e.target.value)}
                        className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                      />
                      <label
                        htmlFor="BankName"
                        className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
                        top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
                        peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                      >
                        Bank Name
                      </label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4m-2 0v6m-4-6v6m-4-6v6M3 20h18"
                        />
                      </svg>

                    </div>

                    <div className='relative w-[90%] m-5 mb-5 mt-10'>
                      <input
                        type="text"
                        id="IFSC"
                        value={IFSC}
                        name='ifsc'
                        onChange={(e) => { setIFSC(e.target.value) }}
                        className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                      />
                      <label
                        htmlFor="IFSC"
                        className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
                        top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
                        peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                      >
                        IFSC Code
                      </label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h1m3 0h1m3 0h1m3 0h1m3 0h1M4 10h16M4 14h16M4 18h1m3 0h1m3 0h1m3 0h1m3 0h1"
                        />
                      </svg>

                    </div>
                  </div>

                  {/* Amount - Account No*/}
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-5 gap-4 mt-6 w-full'>
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
                        readOnly
                        value={boxDetails.Price}
                        className="w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                      />
                    </div>

                    <div className='relative w-[90%] m-5 mb-5 mt-10'>
                      <input
                        type="text"
                        id="Ac_no"
                        value={Ac_no}
                        min={8}
                        name='ac_no'
                        onChange={(e) => setAc_no(e.target.value)}
                        className="peer w-full appearance-none border-b-2 border-gray-400 bg-transparent py-2 px-1 text-lg text-gray-800 focus:outline-none focus:border-[#0C3B2E]"
                      />
                      <label
                        htmlFor="Ac_no"
                        className="absolute left-1 text-gray-500 text-md px-1 transition-all duration-200
                        top-2 peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-[#0C3B2E]
                        peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-[#0C3B2E]"
                      >
                        Account Number
                      </label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-2 top-3 w-5 h-5 text-black pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5h18a2 2 0 012 2v3H1V7a2 2 0 012-2zm0 8h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4zm3 2h3m4 0h4"
                        />
                      </svg>

                    </div>
                  </div>
                </div>
              )}


              {/* Button Area */}
              <div className="flex justify-between mt-15">
                <div className='flex flex-row items-center cursor-pointer px-3 hover:bg-[#b3ffa0] rounded-md'>
                  <FaArrowLeft className='text-[#0C3B2E]' />

                  <button
                    onClick={onPrev}
                    className=' text-[#0C3B2E] font-semibold py-2 px-3 rounded-md '>
                    Previous
                  </button>
                </div>
                <button
                  type='submit'
                  className='bg-[#eba604] text-white cursor-pointer py-2 px-4 rounded-md hover:bg-[#ffb300]'>
                  Next Page
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default StepPaymentDetails