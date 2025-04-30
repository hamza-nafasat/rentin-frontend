'use client';
import PropTypes from 'prop-types';

const Step = ({ step, index, currentStep, setCurrentStep, stepsLength }) => {
  const isCompleted = currentStep > index;
  const isActive = currentStep === index;
  const isClickable = isCompleted || index === currentStep + 1;

  return (
    <div className="relative flex-1">
      <div className="flex flex-col items-center">
        {/* Connector lines */}
        {index > 0 && (
          <div
            className={`xs:top-4 absolute top-3.5 right-[50%] left-[-50%] h-[1px] transition-colors duration-300 sm:top-4.5 sm:h-[2px] md:top-5 ${
              currentStep > index - 1 ? 'bg-primary' : 'bg-gray-200'
            }`}
            style={{ width: 'calc(100%)' }}
          />
        )}
        {index < stepsLength - 1 && (
          <div
            className={`xs:top-4 absolute top-3.5 right-[-50%] left-[50%] h-[1px] transition-colors duration-300 sm:top-4.5 sm:h-[2px] md:top-5 ${
              currentStep > index ? 'bg-primary' : 'bg-gray-200'
            }`}
            style={{ width: 'calc(100%)' }}
          />
        )}

        {/* Circle */}
        <div
          className={`xs:h-8 xs:w-8 relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 sm:h-9 sm:w-9 md:h-10 md:w-10 ${
            isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'
          } ${
            isCompleted
              ? 'bg-primary shadow-sm'
              : isActive
                ? 'xs:border-2 border-primary border-[1.5px] bg-white shadow-sm'
                : 'xs:border-2 border-[1.5px] border-gray-200 bg-white'
          }`}
          onClick={() => isClickable && setCurrentStep(index)}
        >
          {isCompleted ? (
            <svg
              className="xs:h-4 xs:w-4 h-3.5 w-3.5 text-white sm:h-4.5 sm:w-4.5 md:h-5 md:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span
              className={`xs:text-xs text-[10px] font-medium transition-colors duration-300 sm:text-[13px] md:text-sm ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {index + 1}
            </span>
          )}
        </div>

        {/* Label */}
        <span
          className={`xs:mt-1.5 xs:text-[11px] xs:max-w-[85px] mt-1 w-full max-w-[70px] truncate text-center text-[10px] transition-colors duration-300 sm:mt-2 sm:max-w-[110px] sm:text-xs md:max-w-[140px] md:text-sm lg:max-w-none ${
            isCompleted
              ? 'text-primary font-medium'
              : isActive
                ? 'text-textColor font-medium'
                : 'text-gray-400'
          }`}
        >
          {step}
        </span>
      </div>
    </div>
  );
};

Step.propTypes = {
  step: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  stepsLength: PropTypes.number.isRequired,
};

export default Step;
