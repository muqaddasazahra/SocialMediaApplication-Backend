import postModel from "../Models/postModel.js";
import userModel from "../Models/userModel.js";
import postController from "./postController.js";
import bcrypt from "bcrypt";
import authController from "./authController.js";


const userController= 
{   

    register: 
    async (req,res)=>
    {   
        try
        {   
            const user= await authController.register(req);
            res.status(200).json({"Status":"User added", "Details": user});
        }
        catch(error)
        {
        res.json({"message":error.message});
        }
       
    } ,

    login:
    async (req,res)=>
    {
        try
        {   
            const data= await authController.login(req);
            const {user, token}=data;
            res.status(200).json({"status":"Logged In","User":user, "token":token});
           
           
       }
        catch(error)
        {
            res.json({"message":error.message});
        }
       
    },

    getUsers:
    async (req,res)=>
    {
    const users=await userModel.findAll();
    if(!users)
    return res.send("No user found");
    res.status(200).send(users);
    },

    getUser:
    async (req,res)=>
    {
     const user=await userModel.findOne({
        where:
        {
           id:req.params.userId
        }
     });
     res.status(200).send(user);
    },

    updateUser:
    async (req,res)=>
    {
    const user=await userModel.findByPk(req.session.user.id);
    const {userName,email,password}=req.body;

    await user.update({
        userName:userName,
        email:email,
        password:password
    });

    res.status(200).json({"message":"User updated", user});

    },

    deleteUser:
    async (req,res)=>
    {
     const user=await userModel.findByPk(req.session.user.id);
     await user.destroy();
        res.status(200).send("user deleted");
    }
}

export default userController;