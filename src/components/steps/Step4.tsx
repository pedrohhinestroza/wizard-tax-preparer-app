import React from 'react';

interface Step4Props {
    onRestart: () => void; // Function to restart the form
}

const Step4: React.FC<Step4Props> = ({ onRestart }) => {
    return (
        <div className="p-6 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Form Submitted Successfully!</h2>
            <p className="text-gray-700 mb-4">Your information has been saved</p>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
                <button
                    onClick={onRestart}
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                >
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default Step4;
