import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  sendOtpForPasswordReset,
  verifyOtp,
  resetPassword,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.post("/send-otp", sendOtpForPasswordReset);
router.post("/verify-otp", verifyOtp);
router.post("/resetPassword", resetPassword);


// secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
