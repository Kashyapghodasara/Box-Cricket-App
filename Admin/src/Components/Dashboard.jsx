import React from 'react'
import Avatar from 'react-avatar';

const Dashboard = () => {
    return (
        <>
            <div className='w-[81%] h-screen mx-5 rounded-2xl shadow-lg'>
                <section className='mt-6 flex justify-between'>
                    <div>
                        <h1 className='text-[#d7fff4] text-xl sm:text-3xl md:text-xl font-medium tracking-wide'>
                            Welcome,&nbsp;
                            <span
                                style={{ fontFamily: 'Bruno Ace, sans-serif' }}
                                className='text-2xl sm:text-4xl md:text-3xl font-extrabold text-[#d7fff4] drop-shadow-[0_1.5px_1px_rgba(215,255,244,0.2)]'
                            >
                                Kashyap
                            </span>
                        </h1>
                        <p className='text-[#a3b9b1] text-xs md:text-sm mt-1'>
                            Let’s get productive today. Everything you need is right here.
                        </p>
                    </div>

                    <div className='border border-[#2e2f2f] bg-[#1a1b1b] rounded-xl p-2 shadow-sm cursor-pointer hover:shadow-md hover:bg-[#2e2f2f] transition-all duration-300 w-fit'>
                        <div className='flex items-center gap-2'>
                            <Avatar
                                name='Kashyap'
                                src='../public/batman.png'
                                size='40'
                                round='10px'
                                className='shadow-md'
                            />
                            <div className='flex flex-col justify-center'>
                                <h1 className='text-[#d7fff4] text-md font-medium leading-tight tracking-wide'>
                                    Kashyap
                                </h1>
                                <p className='text-[#9db3ac] text-sm leading-snug font-light tracking-normal'>
                                    kashyappatel816@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>


                </section>
            </div>
        </>
    )
}

export default Dashboard