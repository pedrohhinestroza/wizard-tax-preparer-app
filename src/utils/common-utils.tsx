export const renderLabel = (label: string, isRequired: boolean = false, property= '') => (
    <label htmlFor={property} className="block text-sm font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
    </label>
);