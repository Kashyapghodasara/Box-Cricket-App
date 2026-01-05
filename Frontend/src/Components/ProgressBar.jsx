import React from 'react'

const ProgressBar = ({ currentStep }) => {

  const steps = [
    { id: 1, title: 'Box Details' },
    { id: 2, title: 'Payment Details' },
    { id: 3, title: 'Booking Summary' },
    { id: 4, title: 'Genrating Ticket' },
  ]

  return (
    <div className='w-full overflow-x-auto'>
      <div className="w-full flex justify-center mt-10 px-4">
        <div className="flex items-center w-full max-w-5xl justify-between min-w-[600px] sm:min-w-0">

          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isActive = index === currentStep

            return (
              <div key={step.id} className="flex-1 flex items-center relative">

                {/* Circle */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full
                  text-sm sm:text-lg font-bold z-10 shadow-md
                  ${isCompleted ? 'bg-green-600 text-white' :
                    isActive ? 'bg-blue-500 text-white' :
                      'bg-gray-300 text-gray-700'}`}
                >
                  {step.id}
                </div>

                {/* Label */}
                <div className="absolute top-12 sm:top-14 text-xs sm:text-sm font-medium
                                text-center w-24 sm:w-28 -ml-8 sm:-ml-10 text-gray-800">
                  {step.title}
                </div>

                {/* Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 sm:h-2 mx-2 rounded transition-all duration-300
                    ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`}
                  />
                )}
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default ProgressBar