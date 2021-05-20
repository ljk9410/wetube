import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { publicOnlyMiddlware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.route("/join").all(publicOnlyMiddlware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddlware).get(getLogin).post(postLogin);
export default rootRouter; 