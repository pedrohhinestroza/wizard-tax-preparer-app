import React, {useRef, useState} from 'react';
import FileUploader from './../../utils/FileUploader';
import SignatureCanvas from 'react-signature-canvas';
import {renderLabel} from "@/utils/common-utils";

interface AdditionalInformationProps {
    formik: any;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({ formik }) => {
    const [showSpouseSection, setShowSpouseSection] = useState(formik.values.spouse === 'yes');
    const [showIdMeFields, setShowIdMeFields] = useState(formik.values.id_me_check === 'yes');
    const [showSuriFields, setShowSuriFields] = useState(formik.values.suri_account_check === 'yes');
    const [showDependentsFields, setShowDependentsFields] = useState(formik.values.has_dependents === 'yes');
    const [numDependents, setNumDependents] = useState(0);

    const personalSignatureRef = useRef<SignatureCanvas | null>(null);
    const spouseSignatureRef = useRef<SignatureCanvas | null>(null);

    const handleClearSignature = (fieldName, ref) => {
        ref.current?.clear();
        formik.setFieldValue(fieldName, ''); // Set to empty string
        formik.setFieldTouched(fieldName, true, false); // Mark as touched
    };

    const handleSaveSignature = (fieldName, ref) => {
        if (ref.current?.isEmpty()) {
            alert('Please provide a signature before saving.');
        } else {
            const signatureData = ref.current.toDataURL();
            console.log(`Saving signature for ${fieldName}:`, signatureData); // Debug log
            formik.setFieldValue(fieldName, signatureData);
            formik.setFieldTouched(fieldName, true, false); // Mark as touched
        }
    };

    const handleNumDependentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setNumDependents(value);
    };

    const handleIdMeChange = (value: string) => {
        setShowIdMeFields(value === 'yes');
        formik.setFieldValue('id_me_check', value);
    };

    const handleDependentsChange = (value: string) => {
        setShowDependentsFields(value === 'yes');
        formik.setFieldValue('has_dependents', value);
    };

    const handleSuriChange = (value: string) => {
        setShowSuriFields(value === 'yes');
        formik.setFieldValue('suri_account_check', value);
    };

    const handleSpouseChange = (value: string) => {
        setShowSpouseSection(value === 'yes');
        formik.setFieldValue('spouse', value);
    };

    return (
        <>
            {/* Spouse and Returns Radio Buttons */}
            <div className="grid grid-cols-12 gap-4 mb-6">
                <div className="col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Do you have a spouse?</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="spouse"
                                value="yes"
                                onChange={() => handleSpouseChange('yes')}
                                checked={formik.values.spouse === 'yes'}
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="spouse"
                                value="no"
                                onChange={() => handleSpouseChange('no')}
                                checked={formik.values.spouse === 'no'}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                    {formik.touched.spouse && formik.errors.spouse && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.spouse}</div>
                    )}
                </div>

                {/* Federal Return Radio */}
                <div className="col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Federal Return</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="federal_return_check"
                                value="yes"
                                onChange={formik.handleChange}
                                checked={formik.values.federal_return_check === 'yes'}
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="federal_return_check"
                                value="no"
                                onChange={formik.handleChange}
                                checked={formik.values.federal_return_check === 'no'}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                    {formik.touched.federal_return_check && formik.errors.federal_return_check && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.federal_return_check}</div>
                    )}
                </div>

                {/* State Return Radio */}
                <div className="col-span-4">
                    <label className="block text-sm font-medium text-gray-700">State Return</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="state_return_check"
                                value="yes"
                                onChange={formik.handleChange}
                                checked={formik.values.state_return_check === 'yes'}
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="state_return_check"
                                value="no"
                                onChange={formik.handleChange}
                                checked={formik.values.state_return_check === 'no'}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                    {formik.touched.state_return_check && formik.errors.state_return_check && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.state_return_check}</div>
                    )}
                </div>
            </div>

            {/* Loan in Two Years Radio */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                    Are you thinking of buying a home or requesting a loan in the next 2 years?
                </label>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="loan_in_two_years"
                            value="yes"
                            onChange={formik.handleChange}
                            checked={formik.values.loan_in_two_years === 'yes'}
                            className="mr-2"
                        />
                        Yes
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="loan_in_two_years"
                            value="no"
                            onChange={formik.handleChange}
                            checked={formik.values.loan_in_two_years === 'no'}
                            className="mr-2"
                        />
                        No
                    </label>
                </div>
                {formik.touched.loan_in_two_years && formik.errors.loan_in_two_years && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.loan_in_two_years}</div>
                )}
            </div>

            {/* Spouse Information Section */}
            {showSpouseSection && (
                <div className="border-t pt-4 mt-4">
                    <h4 className="text-md font-semibold mb-4">Spouse Information</h4>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            {renderLabel('First Name', true, 'spouse_firstName')}
                            <input
                                id="spouse_firstName"
                                name="spouse_firstName"
                                onBlur={formik.handleBlur}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.spouse_firstName || ''}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    formik.touched.spouse_firstName && formik.errors.spouse_firstName
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            />
                            {formik.touched.spouse_firstName && formik.errors.spouse_firstName && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.spouse_firstName}</div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="spouse_middleName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Middle Name
                            </label>
                            <input
                                id="spouse_middleName"
                                name="spouse_middleName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values[`spouse_middleName`] || ''}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            {renderLabel('Last Name', true, 'spouse_lastName')}
                            <input
                                id="spouse_lastName"
                                name="spouse_lastName"
                                onBlur={formik.handleBlur}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.spouse_lastName || ''}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    formik.touched.spouse_lastName && formik.errors.spouse_lastName
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            />
                            {formik.touched.spouse_lastName && formik.errors.spouse_lastName && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.spouse_lastName}</div>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="spouse_occupation" className="block text-sm font-medium text-gray-700">
                            Spouse Occupation
                        </label>
                        <input
                            id="spouse_occupation"
                            name="spouse_occupation"
                            onBlur={formik.handleBlur}
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.spouse_occupation}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {formik.touched.spouse_occupation && formik.errors.spouse_occupation && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.spouse_occupation}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        {renderLabel('Spouse SSN', true)}
                        <div className="flex items-center space-x-2">
                            <input
                                id="spouse_ssn_part1"
                                name="spouse_ssn_part1"
                                type="text"
                                maxLength={3}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.spouse_ssn_part1}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    formik.touched.spouse_ssn_part1 && formik.errors.spouse_ssn_part1
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                placeholder="XXX"
                            />
                            <span className="text-gray-600">-</span>
                            <input
                                id="spouse_ssn_part2"
                                name="spouse_ssn_part2"
                                type="text"
                                maxLength={2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.spouse_ssn_part2}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    formik.touched.spouse_ssn_part2 && formik.errors.spouse_ssn_part2
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                placeholder="XX"
                            />
                            <span className="text-gray-600">-</span>
                            <input
                                id="spouse_ssn_part3"
                                name="spouse_ssn_part3"
                                type="text"
                                maxLength={4}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.spouse_ssn_part3}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    formik.touched.spouse_ssn_part3 && formik.errors.spouse_ssn_part3
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                placeholder="XXXX"
                            />
                        </div>
                        {formik.touched.spouse_ssn_part1 &&
                            (formik.errors.spouse_ssn_part1 ||
                                formik.errors.spouse_ssn_part2 ||
                                formik.errors.spouse_ssn_part3) && (
                                <div className="text-red-500 text-sm mt-1">
                                    {formik.errors.spouse_ssn_part1 ||
                                        formik.errors.spouse_ssn_part2 ||
                                        formik.errors.spouse_ssn_part3}
                                </div>
                            )}
                    </div>

                    {/* Remaining fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            {renderLabel('Spouse Date of Birth', true, 'spouse_date_of_birth')}
                            <input
                                id="spouse_date_of_birth"
                                name="spouse_date_of_birth"
                                type="date"
                                onChange={formik.handleChange}
                                value={formik.values.spouse_date_of_birth}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="spouse_phone" className="block text-sm font-medium text-gray-700">
                                Spouse Phone
                            </label>
                            <input
                                id="spouse_phone"
                                name="spouse_phone"
                                type="text"
                                maxLength={10}
                                onChange={formik.handleChange}
                                value={formik.values.spouse_phone}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="spouse_email" className="block text-sm font-medium text-gray-700">
                            Spouse Email
                        </label>
                        <input
                            id="spouse_email"
                            name="spouse_email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.spouse_email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {formik.touched.spouse_email && formik.errors.spouse_email && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.spouse_email}</div>
                        )}
                    </div>

                    <FileUploader
                        title="Spouse License Photo"
                        fieldName="spouse_licence_photo"
                        formik={formik}
                        multiple={false}
                    />
                </div>
            )}

            {/* How to Pay Taxes Dropdown */}
            <div className="mb-6">
                <label htmlFor="how_pay_taxes" className="block text-sm font-medium text-gray-700">
                    {renderLabel('How do you want to pay your taxes?', true, 'how_pay_taxes')}
                </label>
                <select
                    id="how_pay_taxes"
                    name="how_pay_taxes"
                    value={formik.values.how_pay_taxes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`mt-1 block w-full px-3 py-2 border ${
                        formik.touched.how_pay_taxes && formik.errors.how_pay_taxes
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                >
                    <option value="">Select a payment method</option>
                    <option value="FROM YOUR FEDERAL REFUND (Additional Fee of $99)">
                        FROM YOUR FEDERAL REFUND (Additional Fee of $99)
                    </option>
                    <option value="ATHMOVIL BUSINESS / ZELLE / PAYPAL">ATHMOVIL BUSINESS / ZELLE / PAYPAL</option>
                    <option value="CREDIT OR DEBIT CARD">CREDIT OR DEBIT CARD</option>
                </select>
                {formik.touched.how_pay_taxes && formik.errors.how_pay_taxes && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.how_pay_taxes}</div>
                )}
            </div>

            {/* ID.ME and SURI-PR Radios */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Do you have an ID.ME account?</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="id_me_check"
                                value="yes"
                                onChange={() => handleIdMeChange('yes')}
                                checked={formik.values.id_me_check === 'yes'}
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="id_me_check"
                                value="no"
                                onChange={() => handleIdMeChange('no')}
                                checked={formik.values.id_me_check === 'no'}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                    {formik.touched.id_me_check && formik.errors.id_me_check && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.id_me_check}</div>
                    )}
                </div>

                <div className="flex-1 ml-8">
                    <label className="block text-sm font-medium text-gray-700">Do you have a SURI-PR account?</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="suri_account_check"
                                value="yes"
                                onChange={() => handleSuriChange('yes')}
                                checked={formik.values.suri_account_check === 'yes'}
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="suri_account_check"
                                value="no"
                                onChange={() => handleSuriChange('no')}
                                checked={formik.values.suri_account_check === 'no'}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                    {formik.touched.suri_account_check && formik.errors.suri_account_check && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.suri_account_check}</div>
                    )}
                </div>
            </div>

            {/* Dynamic Fields for ID.ME */}
            {showIdMeFields && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label htmlFor="id_me_email" className="block text-sm font-medium text-gray-700">
                            ID.ME Email
                        </label>
                        <input
                            id="id_me_email"
                            name="id_me_email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.id_me_email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {formik.touched.id_me_email && formik.errors.id_me_email && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.id_me_email}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="id_me_password" className="block text-sm font-medium text-gray-700">
                            ID.ME Password
                        </label>
                        <input
                            id="id_me_password"
                            name="id_me_password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.id_me_password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {formik.touched.id_me_password && formik.errors.id_me_password && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.id_me_password}</div>
                        )}
                    </div>
                </div>
            )}

            {/* Dynamic Fields for SURI-PR */}
            {showSuriFields && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label htmlFor="suri_username" className="block text-sm font-medium text-gray-700">
                            SURI-PR Username
                        </label>
                        <input
                            id="suri_username"
                            name="suri_username"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.suri_username}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {formik.touched.suri_username && formik.errors.suri_username && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.suri_username}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="suri_password" className="block text-sm font-medium text-gray-700">
                            SURI-PR Password
                        </label>
                        <input
                            id="suri_password"
                            name="suri_password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.suri_password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {formik.touched.suri_password && formik.errors.suri_password && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.suri_password}</div>
                        )}
                    </div>
                </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <FileUploader
                    title="W2/1099 Photo"
                    fieldName="w2_1099_photo"
                    formik={formik}
                    multiple={false}
                />
            </div>
            <div className="mb-6">
                {/* 1099G - UNEMPLOYMENT */}
                <label className="block text-sm font-medium text-gray-700">
                    Did you receive 1099G-UNEMPLOYMENT?
                </label>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="received_1099g_unemployment"
                            value="yes"
                            onChange={formik.handleChange}
                            checked={formik.values.received_1099g_unemployment === 'yes'}
                            className="mr-2"
                        />
                        Yes
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="received_1099g_unemployment"
                            value="no"
                            onChange={formik.handleChange}
                            checked={formik.values.received_1099g_unemployment === 'no'}
                            className="mr-2"
                        />
                        No
                    </label>
                </div>
                {formik.touched.received_1099g_unemployment && formik.errors.received_1099g_unemployment && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.received_1099g_unemployment}</div>
                )}
            </div>

            <div className="mb-6">
                {/* 1095A - OBAMA CARE */}
                <label className="block text-sm font-medium text-gray-700">
                    Did you receive 1095A-OBAMA CARE (United States)?
                </label>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="received_1095a_obamacare"
                            value="yes"
                            onChange={formik.handleChange}
                            checked={formik.values.received_1095a_obamacare === 'yes'}
                            className="mr-2"
                        />
                        Yes
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="received_1095a_obamacare"
                            value="no"
                            onChange={formik.handleChange}
                            checked={formik.values.received_1095a_obamacare === 'no'}
                            className="mr-2"
                        />
                        No
                    </label>
                </div>
                {formik.touched.received_1095a_obamacare && formik.errors.received_1095a_obamacare && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.received_1095a_obamacare}</div>
                )}
            </div>

            {/* Dependents Radio Button */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Do you have any dependents?</label>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="has_dependents"
                            value="yes"
                            onChange={() => handleDependentsChange('yes')}
                            checked={formik.values.has_dependents === 'yes'}
                            className="mr-2"
                        />
                        Yes
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="has_dependents"
                            value="no"
                            onChange={() => handleDependentsChange('no')}
                            checked={formik.values.has_dependents === 'no'}
                            className="mr-2"
                        />
                        No
                    </label>
                </div>
                {formik.touched.has_dependents && formik.errors.has_dependents && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.has_dependents}</div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <FileUploader
                    title="Other Documents"
                    fieldName="other_documents"
                    formik={formik}
                    multiple={true}
                />

                {showDependentsFields && (
                    <>
                        <FileUploader
                            title="Dependents Documents"
                            fieldName="dependents_documents"
                            formik={formik}
                            multiple={true}
                        />
                    </>
                )}
            </div>
            {/* Dependents File Uploads */}
            {showDependentsFields && (
                <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <FileUploader
                            title="Dependents Documents (Child Tax Credit and Earned Income Tax Credit)"
                            fieldName="dependents_documents_creditTax_earned_income"
                            formik={formik}
                            multiple={true}
                        />
                    </div>
                </>
            )}
            {/* Number of Dependents */}
            {formik.values.has_dependents === 'yes' && (
                <div className="mb-6">
                    <label htmlFor="num_dependents" className="block text-sm font-medium text-gray-700">
                        How many dependents do you have?
                    </label>
                    <input
                        id="num_dependents"
                        type="number"
                        name="num_dependents"
                        min="1"
                        value={numDependents}
                        onChange={handleNumDependentsChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
            )}

            {/* Dependent Sections */}
            {Array.from({length: numDependents}, (_, index) => (
                <div key={index} className="mb-6 border-t pt-4">
                    <h4 className="text-md font-semibold mb-4">Dependent #{index + 1}</h4>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label
                                htmlFor={`dependent_${index + 1}_firstName`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                First Name
                            </label>
                            <input
                                id={`dependent_${index + 1}_firstName`}
                                name={`dependent_${index + 1}_firstName`}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values[`dependent_${index + 1}_firstName`] || ''}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor={`dependent_${index + 1}_middleName`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                Middle Name
                            </label>
                            <input
                                id={`dependent_${index + 1}_middleName`}
                                name={`dependent_${index + 1}_middleName`}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values[`dependent_${index + 1}_middleName`] || ''}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor={`dependent_${index + 1}_lastName`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                Last Name
                            </label>
                            <input
                                id={`dependent_${index + 1}_lastName`}
                                name={`dependent_${index + 1}_lastName`}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values[`dependent_${index + 1}_lastName`] || ''}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* SSN Fields */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">SSN</label>
                        <div className="flex items-center space-x-2">
                            <input
                                id={`dependent_${index + 1}_ssn_part1`}
                                name={`dependent_${index + 1}_ssn_part1`}
                                type="text"
                                maxLength={3}
                                onChange={formik.handleChange}
                                value={formik.values[`dependent_${index + 1}_ssn_part1`] || ''}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="XXX"
                            />
                            <span className="text-gray-600">-</span>
                            <input
                                id={`dependent_${index + 1}_ssn_part2`}
                                name={`dependent_${index + 1}_ssn_part2`}
                                type="text"
                                maxLength={2}
                                onChange={formik.handleChange}
                                value={formik.values[`dependent_${index + 1}_ssn_part2`] || ''}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="XX"
                            />
                            <span className="text-gray-600">-</span>
                            <input
                                id={`dependent_${index + 1}_ssn_part3`}
                                name={`dependent_${index + 1}_ssn_part3`}
                                type="text"
                                maxLength={4}
                                onChange={formik.handleChange}
                                value={formik.values[`dependent_${index + 1}_ssn_part3`] || ''}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="XXXX"
                            />
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-4">
                        <label
                            htmlFor={`dependent_${index + 1}_date_of_birth`}
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date of Birth
                        </label>
                        <input
                            id={`dependent_${index + 1}_date_of_birth`}
                            name={`dependent_${index + 1}_date_of_birth`}
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values[`dependent_${index + 1}_date_of_birth`] || ''}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
            ))}
            {/* Signatures Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Personal Signature */}
                <div>
                    {renderLabel('Personal Signature', true, 'personal_signature')}
                    <div className="border border-gray-300 rounded-md p-4">
                        <SignatureCanvas
                            ref={personalSignatureRef}
                            penColor="black"
                            canvasProps={{
                                width: 500,
                                height: 200,
                                className: 'signature-canvas',
                            }}
                        />
                        <div className="mt-2 flex space-x-4">
                            <button
                                type="button"
                                onClick={() => handleClearSignature('personal_signature', personalSignatureRef)}
                                className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSaveSignature('personal_signature', personalSignatureRef)}
                                className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                            >
                                Save Signature
                            </button>
                        </div>
                    </div>
                    {formik.errors.personal_signature && (
                        <div className="text-red-500 text-sm mt-2">{formik.errors.personal_signature}</div>
                    )}
                </div>

                {/* Spouse Signature */}
                {showSpouseSection && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Spouse Signature</label>
                        <div className="border border-gray-300 rounded-md p-4">
                            <SignatureCanvas
                                ref={spouseSignatureRef}
                                penColor="black"
                                canvasProps={{
                                    width: 500,
                                    height: 200,
                                    className: 'signature-canvas',
                                }}
                            />
                            <div className="mt-2 flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => handleClearSignature('spouse_signature', spouseSignatureRef)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
                                >
                                    Clear
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSaveSignature('spouse_signature', spouseSignatureRef)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                                >
                                    Save Signature
                                </button>
                            </div>
                        </div>
                        {formik.errors.spouse_signature && (
                            <div className="text-red-500 text-sm mt-2">{formik.errors.spouse_signature}</div>
                        )}
                    </div>
                )}
            </div>
            <div className="mb-6">
                <label htmlFor="referal" className="block text-sm font-medium text-gray-700">
                    Who referred you to me?
                </label>
                <input
                    id="referal"
                    name="referal"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.referal}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {formik.touched.referal && formik.errors.referal && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.referal}</div>
                )}
            </div>
        </>
    );
};

export default AdditionalInformation;
