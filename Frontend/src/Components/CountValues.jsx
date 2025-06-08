import React from 'react';
import CountUp from './Animation/CountUp';

const CountValues = () => {
    return (
        <div className='m-12'>
            <div className='flex justify-center mb-8'>
                <h1 className='text-4xl md:text-4xl text-[#0C3B2E] font-extrabold tracking-wide'>
                    Statistics
                </h1>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 text-center'>
                <div className='bg-[#6D9773] shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300'>
                    <CountUp
                        from={0}
                        to={5}
                        separator=","
                        direction="up"
                        duration={1}
                        className="text-[#082a21] font-bold text-4xl"
                    />
                    <p className="mt-2 text-lg font-medium text-gray-700">Cities</p>
                </div>

                <div className='bg-[#6D9773] shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300'>
                    <div className="text-[#082a21] font-bold text-4xl flex justify-center items-center gap-1">
                        <CountUp
                            from={0}
                            to={300}
                            separator=","
                            direction="up"
                            duration={1}
                        />
                        +
                    </div>
                    <p className="mt-2 text-lg font-medium text-gray-700">Members</p>
                </div>


                <div className='bg-[#6D9773] shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300'>
                    <CountUp
                        from={0}
                        to={6}
                        separator=","
                        direction="up"
                        duration={1}
                        className="text-[#082a21] font-bold text-4xl"
                    />
                    <p className="mt-2 text-lg font-medium text-gray-700">Boxes</p>
                </div>
            </div>
        </div>
    );
};

export default CountValues;
