import React from 'react';

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
                {/* Personal Address Section */}
                <div>
                    <h4 className="text-md font-medium mb-4">Physical Address</h4>
                    <div className="mb-4">
                        <label htmlFor="personal_address_1" className="block text-sm font-medium text-gray-700">
                            Address Line 1
                        </label>
                        <input
                            id="personal_address_1"
                            name="personal_address_1"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.personal_address_1}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
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
                        <label htmlFor="physical_city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            id="physical_city"
                            name="physical_city"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.physical_city}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="physical_state" className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <select
                            id="physical_state"
                            name="physical_state"
                            onChange={formik.handleChange}
                            value={formik.values.physical_state}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="">Select a state</option>
                            {statesList.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="physical_zip_code" className="block text-sm font-medium text-gray-700">
                            ZIP Code
                        </label>
                        <input
                            id="physical_zip_code"
                            name="physical_zip_code"
                            type="text"
                            maxLength={5}
                            onChange={formik.handleChange}
                            value={formik.values.physical_zip_code}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
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
                        <label htmlFor="postal_address_1" className="block text-sm font-medium text-gray-700">
                            Address Line 1
                        </label>
                        <input
                            id="postal_address_1"
                            name="postal_address_1"
                            type="text"
                            onChange={formik.handleChange}
                            value={
                                isSameAsPhysicalAddress ? formik.values.personal_address_1 : formik.values.postal_address_1
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                                isSameAsPhysicalAddress ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        />
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
                            value={
                                isSameAsPhysicalAddress ? formik.values.personal_address_2 : formik.values.postal_address_2
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                                isSameAsPhysicalAddress ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postal_city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            id="postal_city"
                            name="postal_city"
                            type="text"
                            onChange={formik.handleChange}
                            value={
                                isSameAsPhysicalAddress ? formik.values.physical_city : formik.values.postal_city
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                                isSameAsPhysicalAddress ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postal_state" className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <select
                            id="postal_state"
                            name="postal_state"
                            onChange={formik.handleChange}
                            value={
                                isSameAsPhysicalAddress ? formik.values.physical_state : formik.values.postal_state
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                                isSameAsPhysicalAddress ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        >
                            <option value="">Select a state</option>
                            {statesList.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postal_zip_code" className="block text-sm font-medium text-gray-700">
                            ZIP Code
                        </label>
                        <input
                            id="postal_zip_code"
                            name="postal_zip_code"
                            type="text"
                            maxLength={5}
                            onChange={formik.handleChange}
                            value={
                                isSameAsPhysicalAddress ? formik.values.physical_zip_code : formik.values.postal_zip_code
                            }
                            disabled={isSameAsPhysicalAddress}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                                isSameAsPhysicalAddress ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-blue-500 focus:border-blue-500'
                            } sm:text-sm`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressSection;
