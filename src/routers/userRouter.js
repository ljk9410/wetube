import express from "express";
import { getEdit, see, logout, startGithubLogin, finishGithubLogin, postEdit, } from "../controllers/userController";
import { protectMiddleware, publicOnlyMiddlware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectMiddleware, logout);
userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnlyMiddlware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddlware, finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;