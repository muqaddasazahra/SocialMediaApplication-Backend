import postRouter from "./postRoutes.js";
import likeRouter from "./likeRouter.js";
import userRouter from "./userRoutes.js";
import commentRouter from "./commentRoutes.js";
import followRouter from "./followRouter.js";
import express from "express";
import cors from "cors";
let corsOptions=cors({
    origin:"http://localhost:5173"
});
const allRoutes=express.Router();


allRoutes.use('/user',corsOptions,userRouter);
allRoutes.use('/post',corsOptions,postRouter)
allRoutes.use('/comment',corsOptions,commentRouter);
allRoutes.use('/like',corsOptions,likeRouter);
allRoutes.use('/',corsOptions,followRouter);


export default allRoutes;