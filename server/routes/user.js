import express from "express";

import { signIn, signUp } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/sign-in", signIn);
userRouter.post("/sign-up", signUp);

export default userRouter;
