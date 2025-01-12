import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Step2Props {
    onNext: (data: Record<string, any>) => void;
}

const Step2: React.FC<Step2Props> = ({ onNext }) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
        }),
        onSubmit: (values) => {
            onNext(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="p-4 border rounded shadow-md">
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {formik.errors.firstName ? (
                    <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                </label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {formik.errors.lastName ? (
                    <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                ) : null}
            </div>
        </form>
    );
};
export default Step2;
