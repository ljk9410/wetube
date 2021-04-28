import express from "express";
import { trending } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();
globalRouter.get("/", trending);
globalRouter.get("join", join);
globalRouter.get("Login", login);

export default globalRouter;
