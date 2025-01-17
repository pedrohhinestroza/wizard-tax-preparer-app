import React, {FC, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AdditionalInformation from './../formSections/AdditionalInformation';
import {getMissingFields} from "@/utils/common-utils";

interface Step3Props {
    onNext: (data: Record<string, any>) => void;
    onPrev: () => void;
    initialValues: Record<string, any>;
}

const Step3: FC<Step3Props> = ({ onNext, onPrev, initialValues }) => {
    const [hovering, setHovering] = useState(false);
    const formik = useFormik({
        initialValues: {
            spouse: 'no',
            federal_return_check: 'no',
            state_return_check: 'no',
            loan_in_two_years: 'no',
            id_me_check: 'no',
            suri_account_check: 'no',
            has_dependents: 'no',
            num_dependents: '',
            personal_signature: '',
            spouse_signature: '',
            spouse_firstName: '',
            received_1099g_unemployment: 'no',
            received_1095a_obamacare: 'no',
            spouse_middleName: '',
            spouse_lastName: '',
            spouse_occupation: '',
            spouse_date_of_birth: '',
            spouse_phone: '',
            spouse_email: '',
            spouse_ssn_part1: '',
            spouse_ssn_part2: '',
            spouse_ssn_part3: '',
            how_pay_taxes: '',
            spouse_licence_photo: null,
            other_documents: null,
            w2_1099_photo: null,
            id_me_email: '',
            id_me_password: '',
            suri_username: '',
            suri_password: '',
            dependents_documents: null,
            dependents_documents_creditTax_earned_income: null,
            ...initialValues,
        },
        validateOnMount: true,
        validationSchema: Yup.object().shape({
            spouse_firstName: Yup.string().when('spouse', {
                is: 'yes', // Condition for when the spouse is present
                then: () => Yup.string().required('Spouse first name is required'),
                otherwise: () => Yup.string().nullable(), // Allow empty if no spouse
            }),
            spouse_phone: Yup.string().when('spouse', {
                is: 'yes',
                then: () => Yup.string()
                    .required('Phone number is required')
                    .matches(
                        /^(\+1\s\(\d{3}\)\s\d{3}-\d{4}|^\d{10}$)$/,
                        'Must be a valid US phone number (e.g., +1 (231) 231-2312 or 2312312312)')
            }),
            spouse_lastName: Yup.string().when('spouse', {
                is: 'yes', // Condition for when the spouse is present
                then: () => Yup.string().required('Spouse last name is required'),
                otherwise: () => Yup.string().nullable(), // Allow empty if no spouse
            }),
            spouse_ssn_part1: Yup.string()
                .matches(/^\d{3}$/, 'Must be 3 digits')
                .when('spouse', {
                    is: 'yes',
                    then: () => Yup.string().required('SSN part 1 is required'),
                }),
            how_pay_taxes: Yup.string()
                .required('You must select a payment method.')
                .notOneOf([''], 'Please select a valid payment method.'),
            spouse_ssn_part2: Yup.string()
                .matches(/^\d{2}$/, 'Must be 2 digits')
                .when('spouse', {
                    is: 'yes',
                    then: () => Yup.string().required('SSN part 2 is required'),
                }),
            spouse_ssn_part3: Yup.string()
                .matches(/^\d{4}$/, 'Must be 4 digits')
                .when('spouse', {
                    is: 'yes',
                    then: () => Yup.string().required('SSN part 3 is required'),
                }),
            id_me_email: Yup.string().when('id_me_check', {
                is: 'yes',
                then: () => Yup.string().email('Invalid email').required('ID.ME email is required'),
            }),
            id_me_password: Yup.string().when('id_me_check', {
                is: 'yes',
                then: () => Yup.string().required('ID.ME password is required'),
            }),
            suri_username: Yup.string().when('id_me_check', {
                is: 'yes',
                then: () => Yup.string().required('SURI-PR username is required'),
            }),
            suri_password: Yup.string().when('id_me_check', {
                is: 'yes',
                then: () => Yup.string().required('SURI-PR password is required'),
            }),
            personal_signature: Yup.string()
                .required('Personal signature is required')
                .test(
                    'is-base64',
                    'Invalid signature format',
                    (value) => !value || /^data:image\/\w+;base64,/.test(value)
                ),
            spouse_signature: Yup.string().when('spouse', {
                is: 'yes',
                then: () => Yup.string()
                    .required('Spouse signature is required')
                    .test(
                        'is-base64',
                        'Invalid signature format',
                        (value) => !value || /^data:image\/\w+;base64,/.test(value)
                    ),
            }),
        }),
        onSubmit: (values) => {
            onNext(values);
        },
    });

    const missingFields = getMissingFields(formik);

    return (
        <form onSubmit={formik.handleSubmit} className="p-4 border rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <AdditionalInformation formik={formik}/>
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
                >
                    Back
                </button>
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
                        Submit and Send
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

export default Step3;
