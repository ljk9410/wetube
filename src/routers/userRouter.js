import express from "express";
import { getEdit, see, logout, startGithubLogin, finishGithubLogin, postEdit, getChangePassword, postChangePassword, } from "../controllers/userController";
import { protectMiddleware, publicOnlyMiddlware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectMiddleware, logout);
userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddlware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddlware, finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;