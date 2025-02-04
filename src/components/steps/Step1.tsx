import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddressSection from '../formSections/AddressSection';
import PersonalInformationSection from '@/components/formSections/PersonalInformationSection';
import FileUploader from '@/utils/FileUploader';
import {getMissingFields} from "@/utils/common-utils";

const statesList = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
    "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Armed Forces Americas",
    "Armed Forces Europe", "Armed Forces Pacific"
];

interface Step1Props {
    onNext: (data: Record<string, any>) => void;
    initialValues: Record<string, any>;
}

const Step1: React.FC<Step1Props> = ({ onNext, initialValues  }) => {
    const [hovering, setHovering] = useState(false);
    const formik = useFormik({
        initialValues: {
            personal_firstName: '',
            personal_middleName: '',
            personal_lastName: '',
            personal_ssn_part1: '',
            personal_ssn_part2: '',
            personal_ssn_part3: '',
            personal_phone: '',
            personal_occupation: '',
            personal_address_1: '',
            personal_address_2: '',
            physical_city: '',
            physical_state: '',
            physical_zip_code: '',
            postal_address_1: '',
            postal_address_2: '',
            postal_city: '',
            postal_state: '',
            postal_zip_code: '',
            same_as_physical_address: false,
            personal_date_of_birth: '',
            personal_email: '',
            personal_license_photo: [],
            ...initialValues,
        },
        validationSchema: Yup.object({
            personal_firstName: Yup.string().required('First name is required'),
            personal_phone: Yup.string()
                .required('Phone number is required')
                .matches(
                    /^(\+1\s\(\d{3}\)\s\d{3}-\d{4}|^\d{10}$)$/,
                    'Must be a valid US phone number (e.g., +1 (231) 231-2312 or 2312312312)'
                ),
            personal_occupation: Yup.string().required('Occupation is required'),
            personal_address_1: Yup.string().required('Address line 1 is required'),
            physical_city: Yup.string().required('City is required'),
            physical_state: Yup.string().required('State is required'),
            personal_date_of_birth: Yup.date().required('Date of birth is required'),
            personal_email: Yup.string().email('Invalid email format').required('Email is required'),
            physical_zip_code: Yup.string()
                .matches(/^[0-9]{5}$/, 'Must be a valid 5-digit zip code')
                .required('ZIP code is required'),
            personal_ssn_part1: Yup.string()
                .matches(/^\d{3}$/, 'Must be 3 digits')
                .required('SSN part 1 is required'),
            personal_ssn_part2: Yup.string()
                .matches(/^\d{2}$/, 'Must be 2 digits')
                .required('SSN part 2 is required'),
            personal_ssn_part3: Yup.string()
                .matches(/^\d{4}$/, 'Must be 4 digits')
                .required('SSN part 3 is required'),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            onNext(values); // Pass metadata to Redux
        },
    });

    useEffect(() => {
        formik.setTouched({}); // Reset touched state when initialValues change
    }, [initialValues]);

    const missingFields = getMissingFields(formik);

    return (
        <form onSubmit={formik.handleSubmit} className="p-4 border rounded shadow-md">
            <PersonalInformationSection formik={formik}/>
            <AddressSection formik={formik} statesList={statesList}/>
            <FileUploader
                title="License Photo"
                fieldName="personal_license_photo"
                formik={formik}
                multiple={false}
            />
            <div className="flex justify-end mt-4">
                <div
                    className="relative inline-block"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    <button
                        type="submit"
                        disabled={!formik.isValid}
                        className={`px-4 py-2 rounded shadow text-white ${
                            formik.isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Submit and Continue
                    </button>
                    {!formik.isValid && hovering && (
                        <div
                            className="absolute bottom-full mb-2 w-64 bg-white border border-gray-300 shadow-lg rounded p-2 z-10">
                            <p className="text-sm text-red-500 font-medium mb-1">Missing Fields:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {missingFields.map((field, index) => (
                                    <li key={index}>{field}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default Step1;
