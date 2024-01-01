import express from "express";
import likeController from "../Controllers/likeController.js";

const likeRouter=express.Router();

likeRouter.post('/likePost/:postId',likeController.likePost);
likeRouter.get('/totalLikes/:postId',likeController.getNumberOfLikes);
likeRouter.get('/totalLikesDetail/:postId',likeController.getUsersWhoLiked);

export default likeRouter;