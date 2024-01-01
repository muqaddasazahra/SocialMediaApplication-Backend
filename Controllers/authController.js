import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import session from "express-session";
import "dotenv/config.js"

const authController=
{
    register:
    async (req)=>
    {
        
        const {userName, email,password}=req.body;
        const isExist= await userModel.findOne({where:{email:email}});
        
        if(isExist)
        throw new Error(`USer with this email {${email}} already exists`);
        
        //password hashing
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await userModel.create(
            {
                userName: userName,
                email:email,
                password:hashedPassword,
            }
        );
        
        return user;
    },

    login:
    async (req)=>
    {
        const{email,password}=req.body;
        const user=await userModel.findOne(
            {
            where:
            {
            email:email
            }
            }
        );
        if(!user)
        throw new Error(`user with this email {${email}} does not exist`);
      
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        throw new Error("Incorrect password. Please try again!");
         
        console.log(process.env.JWT_secret);
        
        const token=jwt.sign({user},process.env.JWT_secret,{expiresIn:"30d"});
        
   
        req.session.user=user;
        req.session.token=token;
        await req.session.save();
   
       const data={
       user:user,  
       token:token,
      };

      return data;
     
    }




};

export default authController;