import { Router } from "express";
import {  registerUser ,loginUser, logoutUser, forgotPassword, resetPassword} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)
// Forgot password route
router.post("/forgotPassword", forgotPassword);

// Reset password route
router.patch("/resetPassword/:token", resetPassword);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)

export default router
