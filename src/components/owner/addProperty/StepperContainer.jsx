'use client';
import PropTypes from 'prop-types';
import Step from './Step';

const steps = ['Basic Info', 'Service Area', 'Commission Detail'];

export default function StepperContainer({ currentStep, setCurrentStep }) {
  return (
    <div className="xs:mt-2 mx-auto mt-1 w-full max-w-[900px] sm:mt-3 md:mt-4">
      <div className="xs:gap-1 xs:px-1 flex w-full flex-wrap items-center justify-between gap-0.5 px-0.5 sm:gap-2 sm:px-2 md:gap-4 md:px-4 lg:gap-8 lg:px-6">
        {steps.map((step, index) => (
          <Step
            key={step}
            step={step}
            index={index}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            stepsLength={steps.length}
          />
        ))}
      </div>
    </div>
  );
}

StepperContainer.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};
