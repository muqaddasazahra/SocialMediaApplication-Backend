import userModel from "../Models/userModel.js";
import postModel from "../Models/postModel.js";
import commentModel from "../Models/commentModel.js";
import likeModel from "../Models/likeModel.js";
import followModel from "../Models/followModel.js";

const init=async()=>
{
    try{
        await userModel.sync({
            alter:true,
            force:false,
            });
       


        await postModel.sync(
            {
                alter:true,
                force:false,
            }
        );

        await commentModel.sync(
            {
                alter:true,
                force:false,
            }
        );

        await likeModel.sync(
            {
                alter:true,
                force:false
            }
        );

        
        await followModel.sync(
            {
                alter:true,
                force:false
            }
        );
        
       

        console.log("db synced");
        
    } 
    catch(error)
    {
        console.log(error);
    }
};

export default init;
