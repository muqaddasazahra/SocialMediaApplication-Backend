import sequelize from "../Database/config.js";
import { DataTypes } from "sequelize";

const likeModel=sequelize.define('Like',{
    hasLiked:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    
   

})

export default likeModel;