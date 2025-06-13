import React from 'react'

const ProgressBar = ({currentStep}) => {

    const steps = [
        {id: 1, title: 'Box Details'},
        {id: 2, title: 'Payment Details'},
        {id: 3, title: 'Booking Summary'},
        {id: 4, title: 'Genrating Ticket'},
    ]

 return (
    <div className="w-full flex justify-center mt-8">
      <div className="flex items-center w-full max-w-3xl">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step.id} className="flex-1 flex items-center relative">
              {/* Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold z-10
                  ${isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-blue-500 text-white' :
                      'bg-gray-300 text-gray-700'}`}
              >
                {step.id}
              </div>

              {/* Label */}
              <div className="absolute top-10 text-xs text-center w-24 -ml-8 text-gray-700">
                {step.title}
              </div>

              {/* Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all duration-300 
                    ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar