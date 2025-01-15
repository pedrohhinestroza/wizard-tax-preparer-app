import React from 'react';
import {renderLabel} from "@/utils/common-utils";

interface AddressSectionProps {
    formik: any;
    statesList: string[];
}

const AddressSection: React.FC<AddressSectionProps> = ({ formik, statesList }) => {
    const isSameAsPhysicalAddress = formik.values.same_as_physical_address;

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Address Information</h3>
            <div className="grid grid-cols-2 gap-8">
                {/* Physical Address Section */}
                <div>
                    <h4 className="text-md font-medium mb-4">Physical Address</h4>
                    <div className="mb-4">
                        {renderLabel('Address Line 1', true, 'personal_address_1')}
                        <input
                            id="personal_address_1"
                            name="personal_address_1"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.personal_address_1}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                formik.touched.personal_address_1 && formik.errors.personal_address_1
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        />
                        {formik.touched.personal_address_1 && formik.errors.personal_address_1 && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.personal_address_1}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="personal_address_2" className="block text-sm font-medium text-gray-700">
                            Address Line 2
                        </label>
                        <input
                            id="personal_address_2"
                            name="personal_address_2"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.personal_address_2}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        {renderLabel('City', true, 'physical_city')}
                        <input
                            id="physical_city"
                            name="physical_city"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.physical_city}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                formik.touched.physical_city && formik.errors.physical_city
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        />
                        {formik.touched.physical_city && formik.errors.physical_city && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.physical_city}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        {renderLabel('State', true, 'physical_state')}
                        <select
                            id="physical_state"
                            name="physical_state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.physical_state}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                formik.touched.physical_state && formik.errors.physical_state
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        >
                            <option value="">Select a state</option>
                            {statesList.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        {formik.touched.physical_state && formik.errors.physical_state && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.physical_state}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        {renderLabel('ZIP Code', true, 'physical_zip_code')}
                        <input
                            id="physical_zip_code"
                            name="physical_zip_code"
                            type="text"
                            maxLength={5}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.physical_zip_code}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                formik.touched.physical_zip_code && formik.errors.physical_zip_code
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        />
                        {formik.touched.physical_zip_code && formik.errors.physical_zip_code && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.physical_zip_code}</div>
                        )}
                    </div>
                </div>

                {/* Postal Address Section */}
                <div>
                    <h4 className="text-md font-medium mb-4 flex items-center">
                        Postal Address
                        <input
                            id="same_as_physical_address"
                            name="same_as_physical_address"
                            type="checkbox"
                            onChange={formik.handleChange}
                            checked={formik.values.same_as_physical_address}
                            className="ml-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Same as physical address</span>
                    </h4>
                    <div className="mb-4">
                        {renderLabel('Address Line 1', true, 'postal_address_1')}
                        <input
                            id="postal_address_1"
                            name="postal_address_1"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                                isSameAsPhysicalAddress ? formik.values.personal_address_1 : formik.values.postal_address_1
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                formik.touched.postal_address_1 && formik.errors.postal_address_1
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-md shadow-sm ${
                                isSameAsPhysicalAddress
                                    ? 'bg-gray-100 cursor-not-allowed'
                                    : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        />
                        {formik.touched.postal_address_1 && formik.errors.postal_address_1 && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.postal_address_1}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postal_address_2" className="block text-sm font-medium text-gray-700">
                            Address Line 2
                        </label>
                        <input
                            id="postal_address_2"
                            name="postal_address_2"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                                isSameAsPhysicalAddress ? formik.values.personal_address_2 : formik.values.postal_address_2
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                                isSameAsPhysicalAddress
                                    ? 'bg-gray-100 cursor-not-allowed'
                                    : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        />
                    </div>
                    <div className="mb-4">
                        {renderLabel('City', true, 'postal_city')}
                        <input
                            id="postal_city"
                            name="postal_city"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                                isSameAsPhysicalAddress ? formik.values.physical_city : formik.values.postal_city
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                formik.touched.postal_city && formik.errors.postal_city
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-md shadow-sm ${
                                isSameAsPhysicalAddress
                                    ? 'bg-gray-100 cursor-not-allowed'
                                    : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        />
                        {formik.touched.postal_city && formik.errors.postal_city && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.postal_city}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        {renderLabel('State', true, 'postal_state')}
                        <select
                            id="postal_state"
                            name="postal_state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                                isSameAsPhysicalAddress ? formik.values.physical_state : formik.values.postal_state
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                formik.touched.postal_state && formik.errors.postal_state
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-md shadow-sm ${
                                isSameAsPhysicalAddress
                                    ? 'bg-gray-100 cursor-not-allowed'
                                    : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        >
                            <option value="">Select a state</option>
                            {statesList.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        {formik.touched.postal_state && formik.errors.postal_state && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.postal_state}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        {renderLabel('ZIP Code', true, 'postal_zip_code')}
                        <input
                            id="postal_zip_code"
                            name="postal_zip_code"
                            type="text"
                            maxLength={5}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                                isSameAsPhysicalAddress ? formik.values.physical_zip_code : formik.values.postal_zip_code
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                formik.touched.postal_zip_code && formik.errors.postal_zip_code
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-md shadow-sm ${
                                isSameAsPhysicalAddress
                                    ? 'bg-gray-100 cursor-not-allowed'
                                    : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        />
                        {formik.touched.postal_zip_code && formik.errors.postal_zip_code && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.postal_zip_code}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressSection;
