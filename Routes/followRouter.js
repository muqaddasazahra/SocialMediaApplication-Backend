import express from "express";
import followController from "../Controllers/followController.js";

const followRouter=express.Router();

followRouter.post('/follow/:toFollowId',followController.follow);
followRouter.get('/getFollowing',followController.getFollowingNo);
followRouter.get('/getFollowers',followController.getFollowersNo);
followRouter.post('/unfollow/:userId',followController.unFollow);



export default followRouter;