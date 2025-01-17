import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { nextStep, prevStep, saveStepData, resetForm } from "@/store/formSlice";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import {handleStep3Submit} from "@/utils/formSubmitHandler";

const WizardForm: React.FC = () => {
    const dispatch = useDispatch();
    const { step, formData } = useSelector((state: RootState) => state.form);
    const { step1 = {}, step2 = {}, step3 = {} } = formData;

    const steps = [
        { id: 1, name: "Personal Information" },
        { id: 2, name: "Banking Information" },
        { id: 3, name: "Additional Information" },
        { id: 4, name: "Confirmation" },
    ];

    const handleNext = (data: Record<string, any>) => {
        dispatch(saveStepData({ step, data }));
        dispatch(nextStep());
    };

    const handleSubmit = async (data: Record<string, any>) => {
        handleStep3Submit(formData, data, dispatch);
    };

    const handlePrev = () => {
        dispatch(prevStep());
    };

    const handleRestart = () => {
        dispatch(resetForm());
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 onNext={handleNext} initialValues={step1} />;
            case 2:
                return <Step2 onNext={handleNext} onPrev={handlePrev} initialValues={step2} />;
            case 3:
                return <Step3 onNext={handleSubmit} onPrev={handlePrev} initialValues={step3} />;
            case 4:
                return <Step4 onRestart={handleRestart} />;
            default:
                return <Step1 onNext={handleNext} initialValues={step1} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-md">
                {/* Updated Step Progress Indicator */}
                <div className="flex justify-center items-center mb-16">
                    {steps.map(({id, name}, index) => (
                        <div key={id} className="flex items-center">
                            {/* Step Bar */}
                            <div
                                className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium
                                ${
                                    id === step
                                        ? 'bg-blue-500 text-white shadow-lg' // Current step
                                        : id < step
                                            ? 'bg-green-100 text-green-800' // Completed steps
                                            : 'bg-gray-300 text-gray-700' // Incomplete steps
                                }
                                transition duration-300 ease-in-out`}
                                style={{minWidth: '120px', textAlign: 'center'}}
                            >
                                {name}
                            </div>

                            {/* Arrow Divider */}
                            {index !== steps.length - 1 && (
                                <div className="flex items-center mx-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-6 h-6 ${
                                            id < step ? 'text-green-500' : 'text-gray-400'
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Render the current step */}
                <div>{renderStep()}</div>
            </div>
        </div>
    );
};

export default WizardForm;
