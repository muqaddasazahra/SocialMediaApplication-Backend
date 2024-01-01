import express from "express";
import postController from "../Controllers/postController.js";
import AuthenticateMiddleware from "../middleware/authenticate.js";

const postRouter=express.Router();

postRouter.post('/create',AuthenticateMiddleware,postController.create);
postRouter.get('/getPosts',AuthenticateMiddleware,postController.getAllPosts);
postRouter.get('/getPost/:postId',AuthenticateMiddleware,postController.getPost);
postRouter.get('/otherUserPosts/:userId',AuthenticateMiddleware,postController.getPostsOfSomeUser);
postRouter.get('/otherUserPostById/:userId/:postId',AuthenticateMiddleware,postController.getSpecificPostOfSomeUSer);
postRouter.get('/getMyPosts',AuthenticateMiddleware,postController.getMyPosts);
postRouter.delete('/deletePost/:postId',AuthenticateMiddleware,postController.deletePost);
postRouter.delete('/deleteAllPosts',AuthenticateMiddleware,postController.deleteAllPosts);
postRouter.put('/updatePost/:postId',AuthenticateMiddleware,postController.updatePost);


export default postRouter;