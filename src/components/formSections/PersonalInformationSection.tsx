import React from 'react';
import { renderLabel } from "@/utils/common-utils";

interface PersonalInformationSectionProps {
    formik: any;
}

const PersonalInformationSection: React.FC<PersonalInformationSectionProps> = ({ formik }) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-12 gap-4 items-end mb-4">
                <div className="col-span-5">
                    {renderLabel('First Name', true, 'personal_firstName')}
                    <input
                        id="personal_firstName"
                        name="personal_firstName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.personal_firstName}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            formik.touched.personal_firstName && formik.errors.personal_firstName
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {formik.touched.personal_firstName && formik.errors.personal_firstName && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.personal_firstName}</div>
                    )}
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
                    {renderLabel('Last Name', true, 'personal_lastName')}
                    <input
                        id="personal_lastName"
                        name="personal_lastName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.personal_lastName}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            formik.touched.personal_lastName && formik.errors.personal_lastName
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {formik.touched.personal_lastName && formik.errors.personal_lastName && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.personal_lastName}</div>
                    )}
                </div>
            </div>

            <div className="mb-4">
                {renderLabel('SSN', true, 'personal_lastName')}
                <div className="flex items-center space-x-2">
                    <input
                        id="personal_ssn_part1"
                        name="personal_ssn_part1"
                        type="text"
                        maxLength={3}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.personal_ssn_part1}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            formik.touched.personal_ssn_part1 && formik.errors.personal_ssn_part1
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="XXX"
                    />
                    <span className="text-gray-600">-</span>
                    <input
                        id="personal_ssn_part2"
                        name="personal_ssn_part2"
                        type="text"
                        maxLength={2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.personal_ssn_part2}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            formik.touched.personal_ssn_part2 && formik.errors.personal_ssn_part2
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="XX"
                    />
                    <span className="text-gray-600">-</span>
                    <input
                        id="personal_ssn_part3"
                        name="personal_ssn_part3"
                        type="text"
                        maxLength={4}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.personal_ssn_part3}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            formik.touched.personal_ssn_part3 && formik.errors.personal_ssn_part3
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="XXXX"
                    />
                </div>
                {formik.touched.personal_ssn_part1 &&
                    (formik.errors.personal_ssn_part1 ||
                        formik.errors.personal_ssn_part2 ||
                        formik.errors.personal_ssn_part3) && (
                        <div className="text-red-500 text-sm mt-1">
                            {formik.errors.personal_ssn_part1 ||
                                formik.errors.personal_ssn_part2 ||
                                formik.errors.personal_ssn_part3}
                        </div>
                    )}
            </div>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    {renderLabel('Phone', true, 'personal_phone')}
                    <input
                        id="personal_phone"
                        name="personal_phone"
                        type="text"
                        maxLength={10}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.personal_phone}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            formik.touched.personal_phone && formik.errors.personal_phone
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="1234567890"
                    />
                    {formik.touched.personal_phone && formik.errors.personal_phone && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.personal_phone}</div>
                    )}
                </div>
                <div className="col-span-6">
                    {renderLabel('Occupation', true, 'personal_occupation')}
                    <input
                        id="personal_occupation"
                        name="personal_occupation"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.personal_occupation}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            formik.touched.personal_occupation && formik.errors.personal_occupation
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="Occupation"
                    />
                    {formik.touched.personal_occupation && formik.errors.personal_occupation && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.personal_occupation}</div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6">
                    {renderLabel('Date of Birth', true, 'personal_date_of_birth')}
                    <input
                        id="personal_date_of_birth"
                        name="personal_date_of_birth"
                        type="date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.personal_date_of_birth}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            formik.touched.personal_date_of_birth && formik.errors.personal_date_of_birth
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {formik.touched.personal_date_of_birth && formik.errors.personal_date_of_birth && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.personal_date_of_birth}</div>
                    )}
                </div>
                <div className="col-span-6">
                    {renderLabel('Email', true, 'personal_email')}
                    <input
                        id="personal_email"
                        name="personal_email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.personal_email}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            formik.touched.personal_email && formik.errors.personal_email
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="example@email.com"
                    />
                    {formik.touched.personal_email && formik.errors.personal_email && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.personal_email}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalInformationSection;
