import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { nextStep, prevStep, saveStepData } from '@/store/formSlice';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';

const WizardForm: React.FC = () => {
    const dispatch = useDispatch();
    const { step, formData } = useSelector((state: RootState) => state.form);

    const steps = [
        { id: 1, name: 'Personal Information' },
        { id: 2, name: 'Banking Information' },
        { id: 3, name: 'Additional Information' },
    ];

    const handleNext = (data: Record<string, any>) => {
        dispatch(saveStepData({ step, data }));
        dispatch(nextStep());
    };

    const handlePrev = () => {
        dispatch(prevStep());
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 onNext={handleNext} initialValues={formData.step1} />;
            case 2:
                return <Step2 onNext={handleNext} onPrev={handlePrev} initialValues={formData.step2} />;
            case 3:
                return <Step3 onPrev={handlePrev} onNext={handleNext} initialValues={formData.step3} />;
            default:
                return <Step1 onNext={handleNext} initialValues={formData.step1} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center mb-16">
                    {steps.map(({ id, name }) => (
                        <div key={id} className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                                    id === step ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-black border-gray-300'
                                }`}
                            >
                                {id}
                            </div>
                            <div className={`mt-2 text-sm ${id === step ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}>
                                {name}
                            </div>
                        </div>
                    ))}
                </div>
                <div>{renderStep()}</div>
            </div>
        </div>
    );
};

export default WizardForm;