import express from "express";
import userController from "../Controllers/userController.js";
import userValidator from "../Validators/userValidators.js";
import AuthenticateMiddleware from "../middleware/authenticate.js";

const userRouter=express.Router();

userRouter.post('/register',userValidator.validate,userController.register);
userRouter.get('/login',userController.login);
userRouter.get('/getUsers',userController.getUsers);
userRouter.get('/getUser/:userId',AuthenticateMiddleware,userController.getUser);
userRouter.put('/updateUser',AuthenticateMiddleware,userController.updateUser);
userRouter.delete('/deleteUser',AuthenticateMiddleware,userController.deleteUser);

export default userRouter;