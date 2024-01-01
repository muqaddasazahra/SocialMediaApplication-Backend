import sequelize from "../Database/config.js";
import { DataTypes } from "sequelize";

const commentModel=sequelize.define('Comment',{
    author:{
        type: DataTypes.STRING,
        allowNull: false
    },

    content:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    timeStamp:
    {
        type: DataTypes.STRING,
        allowNull:false,
    }


});



export default commentModel;