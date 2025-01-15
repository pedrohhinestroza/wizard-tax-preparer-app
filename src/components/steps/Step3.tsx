import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AdditionalInformation from './../formSections/AdditionalInformation';

interface Step3Props {
    onNext: (data: Record<string, any>) => void;
    onPrev: () => void;
    initialValues: Record<string, any>;
}

const Step3: FC<Step3Props> = ({ onNext, onPrev, initialValues }) => {
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
            dependents_documents: Yup.array().of(Yup.mixed()).when('has_dependents', {
                is: 'yes',
                then: () => Yup.array().min(1, 'At least one dependents document is required'),
            }),
            dependents_documents_creditTax_earned_income: Yup.array()
                .of(Yup.mixed())
                .when('has_dependents', {
                    is: 'yes',
                    then: () =>Yup.array().min(
                        1,
                        'At least one child tax or earned income tax document is required'
                    ),
                }),
            num_dependents: Yup.number()
                .integer('Number of dependents must be an integer')
                .when('has_dependents', {
                    is: 'yes',
                    then: () => Yup.number().min(1, 'Must have at least one dependent'),
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
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        disabled={!formik.isValid}
                        className={`px-4 py-2 rounded shadow text-white ${
                            formik.isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Submit and Send
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Step3;
