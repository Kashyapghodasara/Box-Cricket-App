import React from "react";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 1, title: "Box Details" },
    { id: 2, title: "Payment Details" },
    { id: 3, title: "Booking Summary" },
    { id: 4, title: "Generating Ticket" },
  ];

  return (
    /* Wrapper aligned with form */
    <div className="w-full flex justify-center px-4 mt-10 overflow-hidden">
      
      {/* Same max width as your form (max-w-3xl) */}
      <div className="w-full max-w-3xl">

        {/* Progress container */}
        <div className="flex items-center justify-between relative">

          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center flex-1 relative"
              >
                {/* LINE (except first) */}
                {index !== 0 && (
                  <div
                    className={`absolute top-5 -left-1/2 w-full h-1 z-0
                    ${isCompleted ? "bg-green-600" : "bg-gray-300"}`}
                  />
                )}

                {/* CIRCLE */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                  rounded-full font-bold text-sm sm:text-lg z-10 shadow-md
                  ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {step.id}
                </div>

                {/* TITLE */}
                <p className="mt-3 text-xs sm:text-sm text-center font-medium text-gray-800">
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
