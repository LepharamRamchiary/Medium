import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("Invalid local file path for upload:", localFilePath);
            return null;
        }
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        
        if (!response) {
            throw new Error("Cloudinary upload response is undefined");
        }
        
        console.log("File uploaded to Cloudinary successfully: ", response.url);
        fs.unlinkSync(localFilePath);  // Remove local file after successful upload
        return response;

    } catch (error) {
        console.error("Cloudinary upload failed with error: ", error.stack);  // Log detailed error
        fs.unlinkSync(localFilePath);  // Remove the local file if upload fails
        return null;  // Return null if the upload fails
    }
};


const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error('Failed to delete the file from Cloudinary');
    }
};

export { uploadOnCloudinary, deleteFromCloudinary }