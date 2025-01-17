import React, { useEffect, FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getMissingFields, renderLabel} from "@/utils/common-utils";

interface Step2Props {
    onNext: (data: Record<string, any>) => void;
    onPrev: () => void;
    initialValues: Record<string, any>;
}

const Step2: FC<Step2Props> = ({ onNext, onPrev, initialValues }) => {
    const [hovering, setHovering] = useState(false);
    const formik = useFormik({
        initialValues: {
            bank_name: '',
            routing_number: '',
            account_number: '',
            ip_pin: '',
            ...initialValues,
        },
        validationSchema: Yup.object({
            bank_name: Yup.string().required('Bank name is required'),
            routing_number: Yup.string()
                .matches(/^\d{9}$/, 'Routing number must be exactly 9 digits')
                .required('Routing number is required'),
            account_number: Yup.string()
                .required('Account number is required'),
            ip_pin: Yup.string(),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            onNext(values);
        },
    });

    useEffect(() => {
        formik.setTouched({});
    }, [initialValues]);

    const missingFields = getMissingFields(formik);

    return (
        <form onSubmit={formik.handleSubmit} className="p-4 border rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Banking Information</h3>

            {/* Bank Name */}
            <div className="mb-4">
                {renderLabel('Bank Name', true)}
                <input
                    id="bank_name"
                    name="bank_name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bank_name}
                    className={`mt-1 block w-full px-3 py-2 border ${
                        formik.touched.bank_name && formik.errors.bank_name
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {formik.touched.bank_name && formik.errors.bank_name && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.bank_name}</div>
                )}
            </div>

            {/* Routing Number */}
            <div className="mb-4">
                {renderLabel('Routing Number', true, 'routing_number')}
                <input
                    id="routing_number"
                    name="routing_number"
                    type="text"
                    maxLength={9}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.routing_number}
                    className={`mt-1 block w-full px-3 py-2 border ${
                        formik.touched.routing_number && formik.errors.routing_number
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="9 digits"
                />
                {formik.touched.routing_number && formik.errors.routing_number && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.routing_number}</div>
                )}
            </div>

            {/* Account Number */}
            <div className="mb-4">
                {renderLabel('Account Number', true, 'account_number')}
                <input
                    id="account_number"
                    name="account_number"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.account_number}
                    className={`mt-1 block w-full px-3 py-2 border ${
                        formik.touched.account_number && formik.errors.account_number
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {formik.touched.account_number && formik.errors.account_number && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.account_number}</div>
                )}
            </div>

            {/* IP PIN */}
            <div className="mb-4">
                {renderLabel('IP PIN - Protection PIN (IRS Sends It)')}
                <input
                    id="ip_pin"
                    name="ip_pin"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ip_pin}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
            </div>

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

export default Step2;
