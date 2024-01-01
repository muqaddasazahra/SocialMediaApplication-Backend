import { time } from "console";
import likeModel from "../Models/likeModel.js"
import postModel from "../Models/postModel.js";
import userModel from "../Models/userModel.js";



const likeController=
{
    likePost: async (req,res)=>
    {   
        try{
        
        //    to check if the post has already been liked
            const alreadyLiked=await likeModel.findOne(
                {
                    where:
                    {
                        userId:req.session.user.id,
                        PostId:req.params.postId
                        
                    }
                }
            );
            if(alreadyLiked)
            return res.status(400).send("Post has already been liked");

            const post=await postModel.findByPk(req.params.postId);
            await post.createLike({
                hasLiked:true,
               UserId:req.session.user.id,
               PostId:req.params.postId
               
            
            });
            res.status(200).send("Post Liked");

            
        }
        catch(err)
        {
            res.status(500).send(err);
        }
   
    },

    getNumberOfLikes:
    async(req,res)=>
    {
    const likes=await likeModel.findAll({
        where:
        {
            postId:req.params.postId
        }
    });
    const totalLikes=likes.length;
    res.status(200).send(`Total Likes : ${totalLikes}`);

    },

    getUsersWhoLiked:
    async(req,res)=>
    {
        const likes=await likeModel.findAll({
            where:
            {
                postId:req.params.postId
            },
            include:{model: userModel} 
           },
            
        );
       
        res.status(200).send(likes);

        
    }
};

export default likeController;