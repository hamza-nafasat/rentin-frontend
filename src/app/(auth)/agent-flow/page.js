'use client';
import BasicInfo from '@/components/auth/BasicInfo';
import CommissionDetail from '@/components/auth/CommissionDetail';
import ServiceArea from '@/components/auth/ServiceArea';
import Step from '@/components/owner/addProperty/Step';
import { useCallback, useMemo, useState } from 'react';
import AgentFlowLayout from './Layout';

function AgentFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState([{}, {}, { basePrice: '', inspectionPrice: '' }]);

  const updateField = useCallback((index, field, value) => {
    setFormData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }, []);

  // const updateField = useCallback((index, field, value) => {
  //   const updated = [...formData];
  //   updated[index] = { ...updated[index], [field]: value };
  //   setFormData(updated);
  // }, []);

  const steps = useMemo(() => ['Basic Info', 'Service Area', 'Commission Detail'], []);

  const stepComponents = useMemo(
    () => [
      <BasicInfo
        index={0}
        data={formData[0]}
        formData={formData}
        setFormData={setFormData}
        key="basic-info"
        setCurrentStep={setCurrentStep}
      />,
      <ServiceArea
        index={1}
        formData={formData[1]}
        setFormData={setFormData}
        key="service-area"
        setCurrentStep={setCurrentStep}
      />,
      <CommissionDetail
        index={2}
        data={formData[2]}
        formData={formData}
        updateField={updateField}
        setFormData={setFormData}
        key="commission-detail"
        setCurrentStep={setCurrentStep}
      />,
    ],
    [setCurrentStep]
  );

  return (
    <AgentFlowLayout>
      <div className="shadow-custom w-full rounded-[10px] bg-white px-5 py-[10px] md:px-10">
        <h2 className="text-textPrimary text-center text-xl font-semibold md:text-[22px]">
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
        <div className="scroll-0 mt-4 h-[calc(100vh-325px)] overflow-x-hidden overflow-y-scroll md:mt-2 2xl:mt-8 2xl:h-[calc(100vh-485px)]">
          {stepComponents[currentStep]}
        </div>
      </div>
    </AgentFlowLayout>
  );
}

export default AgentFlow;
