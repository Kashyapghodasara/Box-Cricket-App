import React from 'react';

const InfoCard = ({ id, title, description, color, capacity}) => {
  return (
    <div className="relative mt-10 w-[90%] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
      {/* Number Tab */}
      <div
        className={`absolute -top-0 -left-0 ${color} text-white font-bold 
                    w-12 h-12 flex items-center justify-center rounded-tl-md rounded-br-md
                    shadow-md z-10`}
      >
        {id}
      </div>

      {/* Card Body */}
      <div className="relative cursor-pointer bg-[#D1A374] rounded-lg shadow-md p-6 pl-8 transition-all duration-300 overflow-hidden">
        <div className="flex flex-col ml-8 h-full">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-semibold text-gray-900">#{title}</span>
          </div>
          <p className="text-gray-900 text-lg">
            <span className='text-lg font-bold'>Size : </span>
            {description}
          </p>
          <p className="text-gray-900 text-lg mb-4">
            <span className='text-lg font-bold'>Capacity : </span>
            {capacity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
