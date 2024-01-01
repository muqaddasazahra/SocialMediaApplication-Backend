import sequelize from "../Database/config.js"
import { DataTypes } from "sequelize";
import postModel from "./postModel.js";
import followModel from "./followModel.js";
import likeModel from "./likeModel.js";
import commentModel from "./commentModel.js";


const userModel=sequelize.define("User",{
    userName: 
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:
    {
        type: DataTypes.STRING,
        allowNull:false,
    },
    password:
    {
        type:DataTypes.STRING,
        allowNull:false,
    }
});


// user -< Post
userModel.hasMany(postModel,{foreignKey: "userId"});
postModel.belongsTo(userModel);


// user >--<user
userModel.belongsToMany(userModel,{as:"follower", through:followModel, foreignKey:"followerId"})
userModel.belongsToMany(userModel,{as:"followed", through:followModel, foreignKey:"followedId"})


// user --<likes
userModel.hasMany(likeModel,{foreignKey:"userId"});
likeModel.belongsTo(userModel);


//user---<comments
userModel.hasMany(commentModel,{foreignKey:"userId"});
commentModel.belongsTo(userModel);


export default userModel;