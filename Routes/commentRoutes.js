import express from "express";
import commentController from "../Controllers/commentController.js";
import postController from "../Controllers/postController.js";

const commentRouter=express.Router();

commentRouter.post('/create/:postId',commentController.create);

export default commentRouter;