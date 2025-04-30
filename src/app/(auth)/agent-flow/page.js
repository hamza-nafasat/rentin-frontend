'use client';
import BasicInfo from '@/components/auth/BasicInfo';
import CommissionDetail from '@/components/auth/CommissionDetail';
import ServiceArea from '@/components/auth/ServiceArea';
import Step from '@/components/owner/addProperty/Step';
import { useMemo, useState } from 'react';
import AgentFlowLayout from './Layout';

function AgentFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = useMemo(() => ['Basic Info', 'Service Area', 'Commission Detail'], []);

  const stepComponents = useMemo(
    () => [
      <BasicInfo key="basic-info" setCurrentStep={setCurrentStep} />,
      <ServiceArea key="service-area" setCurrentStep={setCurrentStep} />,
      <CommissionDetail key="commission-detail" setCurrentStep={setCurrentStep} />,
    ],
    [setCurrentStep]
  );

  return (
    <AgentFlowLayout>
      <div className="shadow-custom w-full rounded-[10px] bg-white px-5 py-[30px] md:px-10">
        <h2 className="text-textColor text-center text-xl font-semibold md:text-[22px]">
          On Demand Service Onboarding Flow
        </h2>
        <div className="mx-auto mt-4 flex max-w-[900px] flex-wrap items-center justify-between gap-4 md:mt-5 md:gap-8">
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
        <div className="mt-4 md:mt-6 2xl:mt-8">{stepComponents[currentStep]}</div>
      </div>
    </AgentFlowLayout>
  );
}

export default AgentFlow;
