import React from 'react';
import InfoCard from './InfoCard';
import { Monitor, Rocket, BarChart3, Search } from 'lucide-react';

const cardsData = [
    {
        id: '01',
        title: 'BX001',
        description: 'Small',
        capacity: "Around 7-8 Players",
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
        id: '03',
        title: 'BX003',
        description: 'Medium',
        capacity: "Around 10-12 Players",
        color: 'bg-[#145A45]',

    },
    {
        id: '04',
        title: 'BX004',
        description: 'Medium',
        capacity: "Around 10-12 Players",
        color: 'bg-[#6D9773]',
    },
    {
        id: '05',
        title: 'BX005',
        description: 'Large',
        capacity: "Around 14-16 Players",
        color: 'bg-[#145A45]',
    },
    {
        id: '06',
        title: 'BX006',
        description: 'Large',
        capacity: "Around 14-16 Players",
        color: 'bg-[#6D9773]',
    }
];

const InfoCards = () => {
    return (
        <div className="px-4 md:px-12">
            {/* Heading - Centered */}
            <div className="text-center mb-2 mt-8">
                <h1 className="text-4xl font-bold text-[#0C3B2E]">Select a Box</h1>
            </div>

            {/* Grid Wrapper - Centered */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                    {cardsData.map((card) => (
                        <InfoCard
                            key={card.id}
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
        </div>
    );
};

export default InfoCards;
