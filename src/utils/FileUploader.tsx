import React, { useState } from 'react';

const MAX_FILE_SIZE_MB = 5; // 5MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface FileUploaderProps {
    title: string;
    fieldName: string;
    formik: any;
    multiple?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ title, fieldName, formik, multiple = true }) => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]); // Preview URLs for display

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files ? Array.from(event.target.files) : [];
        processFiles(uploadedFiles);
    };

    const processFiles = (uploadedFiles: File[]) => {
        const validFiles = uploadedFiles.filter((file) => {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                alert(`File "${file.name}" exceeds the maximum size of ${MAX_FILE_SIZE_MB}MB.`);
                return false;
            }
            return ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
        });

        if (validFiles.length !== uploadedFiles.length) {
            alert(`Some files were not uploaded due to exceeding the size limit of ${MAX_FILE_SIZE_MB}MB.`);
        }

        const newFilePreviews = validFiles.map((file) => URL.createObjectURL(file)); // Create preview URLs
        setFilePreviews((prev) => (multiple ? [...prev, ...newFilePreviews] : newFilePreviews));

        // Pass only file metadata to Formik
        const fileMetadata = validFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
        }));

        const updatedFiles = multiple
            ? [...(formik.values[fieldName] || []), ...fileMetadata]
            : fileMetadata;

        formik.setFieldValue(fieldName, updatedFiles); // Store metadata, not raw files
    };

    const handleFileDelete = (index: number) => {
        const updatedPreviews = filePreviews.filter((_, i) => i !== index);
        setFilePreviews(updatedPreviews);

        const updatedMetadata = (formik.values[fieldName] || []).filter((_, i) => i !== index);
        formik.setFieldValue(fieldName, updatedMetadata);
    };

    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
            <div
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-100"
            >
                <p className="text-gray-600 mb-2">Drag and drop files here, or</p>
                <label
                    htmlFor={`file-upload-${fieldName}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md cursor-pointer inline-block"
                >
                    Browse Files
                </label>
                <input
                    id={`file-upload-${fieldName}`}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple={multiple}
                />
            </div>

            {/* File Previews */}
            <ul className="mt-4 space-y-2">
                {filePreviews.map((preview, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-gray-50 border border-gray-200 p-2 rounded-md shadow-sm"
                    >
                        <a
                            href={preview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline truncate"
                        >
                            {formik.values[fieldName][index].name}
                        </a>
                        <button
                            type="button"
                            onClick={() => handleFileDelete(index)}
                            className="text-red-500 hover:text-red-700 font-medium"
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileUploader;
