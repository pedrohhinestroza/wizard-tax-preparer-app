import React, { useState } from 'react';

interface FileUploaderProps {
    title: string;
    fieldName: string;
    formik: any;
    multiple?: boolean; // Allow multiple files or single file
}

const FileUploader: React.FC<FileUploaderProps> = ({ title, fieldName, formik, multiple = true }) => {
    const [files, setFiles] = useState<File[]>(formik.values[fieldName] || []);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files ? Array.from(event.target.files) : [];
        processFiles(uploadedFiles);
    };

    const processFiles = (uploadedFiles: File[]) => {
        const validFiles = uploadedFiles.filter(file =>
            ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)
        );

        if (validFiles.length !== uploadedFiles.length) {
            alert('Only PDF and image files are allowed.');
        }

        const newFiles = multiple ? [...files, ...validFiles] : validFiles;

        setFiles(newFiles);
        formik.setFieldValue(fieldName, newFiles);
    };

    const handleFileDelete = (fileIndex: number) => {
        const updatedFiles = files.filter((_, index) => index !== fileIndex);
        setFiles(updatedFiles);
        formik.setFieldValue(fieldName, updatedFiles);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const uploadedFiles = Array.from(event.dataTransfer.files);
        processFiles(uploadedFiles);
    };

    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
            <div
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-100`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
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

            {/* File List */}
            <ul className="mt-4 space-y-2">
                {files.map((file, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-gray-50 border border-gray-200 p-2 rounded-md shadow-sm"
                    >
                        <span className="text-sm text-gray-700">{file.name}</span>
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
