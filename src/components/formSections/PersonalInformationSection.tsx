import React from 'react';

interface PersonalInformationSectionProps {
    formik: any;
}

const PersonalInformationSection: React.FC<PersonalInformationSectionProps> = ({ formik }) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-12 gap-4 items-end mb-4">
                <div className="col-span-5">
                    <label htmlFor="personal_firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        id="personal_firstName"
                        name="personal_firstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.personal_firstName}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="col-span-2">
                    <label htmlFor="personal_middleName" className="block text-sm font-medium text-gray-700">
                        Middle Name
                    </label>
                    <input
                        id="personal_middleName"
                        name="personal_middleName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.personal_middleName}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="col-span-5">
                    <label htmlFor="personal_lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        id="personal_lastName"
                        name="personal_lastName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.personal_lastName}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">SSN</label>
                <div className="flex items-center space-x-2">
                    <input
                        id="personal_ssn_part1"
                        name="personal_ssn_part1"
                        type="text"
                        maxLength={3}
                        onChange={formik.handleChange}
                        value={formik.values.personal_ssn_part1}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="XXX"
                    />
                    <span className="text-gray-600">-</span>
                    <input
                        id="personal_ssn_part2"
                        name="personal_ssn_part2"
                        type="text"
                        maxLength={2}
                        onChange={formik.handleChange}
                        value={formik.values.personal_ssn_part2}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="XX"
                    />
                    <span className="text-gray-600">-</span>
                    <input
                        id="personal_ssn_part3"
                        name="personal_ssn_part3"
                        type="text"
                        maxLength={4}
                        onChange={formik.handleChange}
                        value={formik.values.personal_ssn_part3}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="XXXX"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <label htmlFor="personal_phone" className="block text-sm font-medium text-gray-700">
                        Phone
                    </label>
                    <input
                        id="personal_phone"
                        name="personal_phone"
                        type="text"
                        maxLength={10}
                        onChange={formik.handleChange}
                        value={formik.values.personal_phone}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="1234567890"
                    />
                </div>
                <div className="col-span-6">
                    <label htmlFor="personal_occupation" className="block text-sm font-medium text-gray-700">
                        Occupation
                    </label>
                    <input
                        id="personal_occupation"
                        name="personal_occupation"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.personal_occupation}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Occupation"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInformationSection;
