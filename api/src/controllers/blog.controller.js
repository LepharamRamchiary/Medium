import { Blog } from "../models/Blog.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const publishBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user._id;

  // validation
  if (!title || !content) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure only one media (image or video) is uploaded
  const imageFile = req.files?.image ? req.files.image[0] : null;
  const videoFile = req.files?.video ? req.files.video[0] : null;

  if (imageFile && videoFile) {
    throw new ApiError(400, "You can only upload either an image or a video, not both");
  }

  let imageUrl = "";
  let videoUrl = "";

  // Handle image upload if provided
  if (imageFile) {
    const imageUploadResult = await uploadOnCloudinary(imageFile.path);  
    if (imageUploadResult) {
      imageUrl = imageUploadResult.url; 
    }
  }
  

  // Handle video upload if provided (only if image is not uploaded)
  if (videoFile) {
    const videoUploadResult = await uploadOnCloudinary(videoFile.path);  
    if (videoUploadResult) {
      videoUrl = videoUploadResult.url;  
    }
  }
  

  // Check if neither image nor video is provided
  if (!imageUrl && !videoUrl) {
    throw new ApiError(400, "Image or video is required");
  }

  // Create a new blog post with the data provided
  const newBlog = new Blog({
    title,
    content,
    image: imageUrl,
    video: videoUrl,
    owner: userId,
  });

  // Save the blog post in the database
  await newBlog.save();

  return res
    .status(200)
    .json(new ApiResponse(200, newBlog, "Blog published successfully"));
});

export { publishBlog };
