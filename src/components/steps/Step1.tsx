import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddressSection from '../formSections/AddressSection';
import PersonalInformationSection from "@/components/formSections/PersonalInformationSection";

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
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
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
        },
        validationSchema: Yup.object({
            personal_firstName: Yup.string().required('First name is required'),
            personal_phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number').required('Phone number is required'),
            personal_occupation: Yup.string().required('Occupation is required'),
            personal_address_1: Yup.string().required('Address line 1 is required'),
            physical_city: Yup.string().required('City is required'),
            physical_state: Yup.string().required('State is required'),
            physical_zip_code: Yup.string().matches(/^[0-9]{5}$/, 'Must be a valid 5-digit zip code').required('ZIP code is required'),
            personal_ssn_part1: Yup.string().matches(/^\d{3}$/, 'Must be 3 digits').nullable(),
            personal_ssn_part2: Yup.string().matches(/^\d{2}$/, 'Must be 2 digits').nullable(),
            personal_ssn_part3: Yup.string().matches(/^\d{4}$/, 'Must be 4 digits').nullable(),
        }).test('ssn-complete', 'SSN is required', function (values) {
            const { personal_ssn_part1, personal_ssn_part2, personal_ssn_part3 } = values || {};
            return (
                personal_ssn_part1?.length === 3 &&
                personal_ssn_part2?.length === 2 &&
                personal_ssn_part3?.length === 4
            );
        }),
        onSubmit: (values) => {
            onNext(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="p-4 border rounded shadow-md">
            <PersonalInformationSection formik={formik} />
            <AddressSection formik={formik} statesList={statesList} />
        </form>
    );
};

export default Step1;
