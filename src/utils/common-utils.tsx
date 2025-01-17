export const renderLabel = (label: string, isRequired: boolean = false, property= '') => (
    <label htmlFor={property} className="block text-sm font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
    </label>
);

/**
 * Recursively extracts files from nested form data.
 * @param {Object} formData - The entire form data object.
 * @returns {Array} - An array of objects containing file property paths and their corresponding files.
 */
export const extractFilesFromFormData = (formData: Record<string, any>) => {
    const files: { path: string; files: any[] }[] = [];

    const recurse = (data: any, path: string) => {
        if (Array.isArray(data)) {
            // Check if the array contains file-like objects
            if (data.every((item) => item && typeof item === 'object' && 'name' in item && 'size' in item && 'type' in item)) {
                files.push({ path, files: data });
            }
        } else if (typeof data === 'object' && data !== null) {
            for (const key in data) {
                recurse(data[key], path ? `${path}.${key}` : key);
            }
        }
    };

    recurse(formData, '');
    return files;
};

export const getMissingFields = (formik: any) => {
    const errors = formik.errors;
    const touched = formik.touched;
    const missingFields = [];

    for (const key in errors) {
        if (!touched[key]) {
            missingFields.push(errors[key]);
        }
    }

    return missingFields;
};
