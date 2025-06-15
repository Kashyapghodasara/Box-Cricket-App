import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import StepPaymentDetails from './StepPaymentDetails';
import StepBoxDetails from './StepBoxDetails';
import StepPreviewDetails from './StepPreviewDetails';
import StepTicketDetails from './StepTicketDetails';

const MutliStepFormWrapper = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextPage = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const prevPage = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    // Determine which component to render
    let renderComponent;
    switch (currentStep) {
        case 0:
            renderComponent = <StepBoxDetails onNext={nextPage} />;
            break;
        case 1:
            renderComponent = <StepPaymentDetails onNext={nextPage} onPrev={prevPage} />;
            break;
        case 2:
            renderComponent = <StepPreviewDetails onNext={nextPage} onPrev={prevPage} />;
            break;
        case 3:
            renderComponent = <StepTicketDetails onPrev={prevPage} />;
            break;
        default:
            renderComponent = null;
    }

    return (
        <>
            <div>
                <ProgressBar currentStep={currentStep} />
            </div>
            <div>{renderComponent}</div>
        
        </>
    );
};

export default MutliStepFormWrapper;
