import MutliStepFormWrapper from './MutliStepFormWrapper';
import { Link } from 'react-router-dom';

const BoxBooking = () => {

  return (
    <>
      {/* Navbar */}
      <div className='flex justify-center m-2'>
        <div className='relative w-[90%] rounded-full p-2'>
          <nav className='flex items-center justify-center w-full'>
            {/* Website Name */}

            <div className='absolute left-2'>
              <Link to="/">
                <h1 className='text-4xl font-bold text-[#0C3B2E] cursor-pointer'
                  style={{ fontFamily: 'Gabarito' }}>
                  Criksy
                </h1>
              </Link>
            </div>

            {/* Nav Links Centered */}
            <div className='flex flex-row gap-[80px] text-[#0C3B2E] text-lg'>
              <Link to="/"> <button className="pointer">Home</button></Link>
              <Link to="/">
                <button
                  onClick={() => scrollToSection('Slote')}
                  className="pointer">
                  Slote
                </button>
              </Link>
              <Link to="/"><button className="pointer">Review</button></Link>
              <Link to="/"><button className="pointer">Contact</button></Link>
            </div>

            {/* Login Button Positioned Right */}
            <div className='absolute right-2'>
              <button className='bg-[#ffc53c] hover:bg-[#FFB70F] px-5 py-2 rounded-full cursor-pointer'>Login</button>
            </div>
          </nav>
        </div>
      </div>

      <MutliStepFormWrapper />
    </>
  )
}

export default BoxBooking

