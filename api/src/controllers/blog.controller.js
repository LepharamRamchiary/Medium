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
  const userId = req.user._id;
  console.log(userId);

  // validation
  if (!title || !content) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure only one media (image or video) is uploaded
  const imageFile = req.files?.image ? req.files.image[0] : null;
  const videoFile = req.files?.video ? req.files.video[0] : null;

  if (imageFile && videoFile) {
    throw new ApiError(
      400,
      "You can only upload either an image or a video, not both"
    );
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

  try {
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
  } catch (error) {
    console.log("Error publish blog", error);
    throw new ApiError(500, "Internal server error");
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 4, sort = "-createdAt" } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { [sort.replace("-", "")]: sort.startsWith("-") ? -1 : 1 },
      populate: {
        path: "owner",
        select: "fullname email",
      },
    };

    const aggregateQuery = Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      { $unwind: "$owner" },
      {
        $project: {
          title: 1,
          content: 1,
          image: 1,
          video: 1,
          createdAt: 1,
          "owner.fullname": 1,
          "owner.email": 1,
        },
      },
    ]);

    const blogs = await Blog.aggregatePaginate(aggregateQuery, options);

    if (!blogs || blogs.docs.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], "No blogs found"));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          blogs: blogs.docs,
          totalPages: blogs.totalPages,
          currentPage: blogs.page,
          totalBlogs: blogs.totalDocs,
        },
        "Blogs fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error in getAllBlogs:", error);
    throw new ApiError(500, `Error fetching blogs: ${error.message}`);
  }
});

const getSingleBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  if (!blogId) {
    throw new ApiError(400, "Blog ID is required");
  }

  try {
    const blog = await Blog.findById(blogId).populate(
      "owner",
      "fullname email"
    );

    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog fetched successfully"));
  } catch (error) {
    throw new ApiError(500, `Error fetching blog: ${error.message}`);
  }
});

export { publishBlog, getAllBlogs, getSingleBlog };
