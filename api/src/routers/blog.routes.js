import { Router } from "express";
import {
  publishBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/publish").post(
  verifyJWT,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  publishBlog
);
router.get("/get-all-blogs", getAllBlogs);
router.get("/get-all-blogs/:blogId", getSingleBlog);

export default router;
