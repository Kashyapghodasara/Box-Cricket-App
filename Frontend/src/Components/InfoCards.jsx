import React from 'react';
import InfoCard from './InfoCard';
import { Link } from 'react-router-dom';
import useRegistration from '../Store/useRegistration.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const InfoCards = () => {

    const { isLoggedIn } = useRegistration();
    const navigate = useNavigate();

    const cardsData = [
        {
            id: '01',
            title: 'BX001',
            description: 'Small',
            capacity: "Around 7-8 Players",
            color: 'bg-[#145A45]',

        },
        {
            id: '03',
            title: 'BX003',
            description: 'Medium',
            capacity: "Around 10-12 Players",
            color: 'bg-[#145A45]',

        },
        {
            id: '05',
            title: 'BX005',
            description: 'Large',
            capacity: "Around 14-16 Players",
            color: 'bg-[#145A45]',
        },
        {
            id: '02',
            title: 'BX002',
            description: 'Small',
            capacity: "Around 7-8 Players",
            color: 'bg-[#6D9773]',

        },
        {
            id: '04',
            title: 'BX004',
            description: 'Medium',
            capacity: "Around 10-12 Players",
            color: 'bg-[#6D9773]',
        },
        {
            id: '06',
            title: 'BX006',
            description: 'Large',
            capacity: "Around 14-16 Players",
            color: 'bg-[#6D9773]',
        }
    ];

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

    const authCheckHandler = () => {
        if (isLoggedIn === false) {
            return toast.error("Please Login First", ErrorToastStyle);
        } else {
            navigate('/booking')
        }
    }
    return (
        <div className="px-4 md:px-12 py-10 bg-gray-50 min-h-screen">
            <section id='Slote'>
                {/* Heading - Centered */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0C3B2E] tracking-wide drop-shadow-md">
                        Select a Box
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Choose your preferred ground to check availability and book your slot</p>
                </div>

                {/* Cards Grid */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
                        {cardsData.map((card) => (

                            <InfoCard
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                capacity={card.capacity}
                                color={card.color}
                                icon={card.icon}
                            />
                        ))}
                    </div>
                </div>

                {/* Button Section */}
                <div className="flex justify-center mt-12">
                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl px-4">
                        <Link to="/availabel" className="w-full">
                            <button className="w-full bg-[#f7b722] hover:bg-[#ffb300] cursor-pointer text-[#0C3B2E] font-bold p-4 rounded-2xl text-lg tracking-wider shadow-md hover:shadow-lg transition-all duration-300">
                                Check Box Availability
                            </button>
                        </Link>

                        <button
                            onClick={authCheckHandler}
                            className="w-full bg-[#0C3B2E] hover:bg-[#022b20] cursor-pointer text-white font-semibold p-4 rounded-2xl text-lg tracking-wider shadow-md hover:shadow-lg transition-all duration-300">
                            Book Your Box
                        </button>

                    </div>
                </div>
            </section>
        </div>
    )
};

export default InfoCards;
