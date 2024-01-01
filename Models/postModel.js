import sequelize from "../Database/config.js";
import { DataTypes } from "sequelize";
import commentModel from "./commentModel.js";
import likeModel from "./likeModel.js";

const postModel=sequelize.define('Post',{
    author:{
        type: DataTypes.STRING,
        allowNull: false
    },

    content:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    

  
});


//post -< comments
postModel.hasMany(commentModel,{foreignKey:"postId"});
commentModel.belongsTo(postModel);


//post--<likes
postModel.hasMany(likeModel,{foreignKey:"postId"});
likeModel.belongsTo(postModel);


export default postModel;


