import axios from "axios";
import { extractFilesFromFormData } from "@/utils/common-utils"; // Assuming this is where the function is located
import { AppDispatch } from "@/store/store"; // Adjust the import based on your Redux setup
import { nextStep } from "@/store/formSlice";

// Merge step3 data with existing formData
export const mergeStep3Data = (formData: Record<string, any>, step3Data: Record<string, any>) => {
    return { ...formData, step3: { ...formData.step3, ...step3Data } };
};

// Upload a single file to S3
const uploadFileToS3 = async (file: File) => {
    const fileData = new FormData();

    // Recreate the File object if necessary
    const blob = new Blob([file], { type: file.type });
    const reconstructedFile = new File([blob], file.name, { type: file.type });

    fileData.append("file", reconstructedFile);

    try {
        const response = await axios.post("http://localhost:5000/api/upload", fileData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.fileUrl; // S3 URL
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("File upload failed");
    }
};

// Upload multiple files and map their URLs to their paths
const uploadFiles = async (filesToUpload: { path: string; files: File[] }[]) => {
    return Promise.all(
        filesToUpload.map(async ({ path, files }) => {
            const uploadedUrls = await Promise.all(files.map(uploadFileToS3));
            return { path, urls: uploadedUrls };
        })
    );
};

// Update the form data with uploaded file URLs
export const updateFormDataWithFileUrls = (
    formData: Record<string, any>,
    uploadedFileData: { path: string; urls: string[] }[]
) => {
    const updatedFormData = JSON.parse(JSON.stringify(formData)); // Deep clone formData

    uploadedFileData.forEach(({ path, urls }) => {
        const keys = path.split(".");
        let target = updatedFormData;

        for (let i = 0; i < keys.length - 1; i++) {
            // Ensure intermediate objects are mutable
            target[keys[i]] = { ...target[keys[i]] };
            target = target[keys[i]];
        }

        // Update the target field with uploaded file URLs
        target[keys[keys.length - 1]] = urls;
    });

    return updatedFormData;
};

// Handle form submission
export const handleStep3Submit = async (
    formData: Record<string, any>,
    step3Data: Record<string, any>,
    dispatch: AppDispatch
) => {
    const finalData = mergeStep3Data(formData, step3Data);

    const filesToUpload = extractFilesFromFormData(finalData);

    try {
        const uploadedFileData = await uploadFiles(filesToUpload);
        const updatedFormData = updateFormDataWithFileUrls(finalData, uploadedFileData);

        // Save the updated form data
        const response = await axios.post("http://localhost:5000/api/forms", updatedFormData);
        console.log("Form data saved successfully:", response.data);

        dispatch(nextStep()); // Move to confirmation step
    } catch (error) {
        console.error("Error uploading files or saving form data:", error);
        alert("Failed to save form. Please try again.");
    }
};
