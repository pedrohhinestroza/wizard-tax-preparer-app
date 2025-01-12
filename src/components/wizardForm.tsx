import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { nextStep, prevStep, saveData } from '@/store/formSlice';
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
        dispatch(saveData(data));
        dispatch(nextStep());
    };

    const handlePrev = () => {
        dispatch(prevStep());
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 onNext={handleNext} />;
            case 2:
                return <Step2 onNext={handleNext} onPrev={handlePrev} />;
            case 3:
                return <Step3 onPrev={handlePrev} formData={formData} />;
            default:
                return <Step1 onNext={handleNext} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-md">
                {/* Step Indicator */}
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
                            <div
                                className={`mt-2 text-sm ${id === step ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}
                            >
                                {name}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Render Current Step */}
                <div>{renderStep()}</div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrev}
                        disabled={step === 1}
                        className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                            step === 1
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                        Back
                    </button>
                    <div className="relative group">
                        <button
                            onClick={() => handleNext({})}
                            disabled={!formData.isValid || !formData.isTouched}
                            className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                                formData.isValid
                                    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                    : 'bg-gray-400 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                        >
                            Next
                        </button>
                        {!formData.isValid && (
                            <div className="absolute top-[-2rem] left-0 w-full bg-gray-700 text-white text-xs rounded-md py-1 px-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                Please fill all the required fields
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WizardForm;
