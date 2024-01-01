import followModel from "../Models/followModel.js";
import userModel from "../Models/userModel.js";


const followController={
    follow:
    async (req,res)=>
    { 
        try{
            const user=await userModel.findByPk(req.session.user.id);
            const toFollow=await userModel.findByPk(req.params.toFollowId);
            //  console.log(user);
            //  console.log(toFollow)
             await user.addFollower(toFollow);
             res.status(200).json({"Status":"Followed", "Details(Whom following)":toFollow});  
              }
        catch(error)
        {  
            res.status(500).send("Trouble following user. Please try again");
        }
     },

    getFollowingNo:
    async(req,res)=>
    {
        const following=await followModel.findAll({
            where:
            {
                followerId:req.session.user.id
            }
        });

        res.status(200).send(`you are following ${following.length} users`);
    },

    getFollowersNo:
    async(req,res)=>
    {
        const followers=await followModel.findAll({
            where:
            {
                followedId:req.session.user.id
            }
        });

        res.status(200).send(`you have ${followers.length} followers`);
    },

    unFollow:
    async(req,res)=>
    {   
       
       const toUnfollow=await followModel.findOne({
            where:
            {
                followerId:req.session.user.id,
                followedId:req.params.userId
            }
        });

        if(!toUnfollow)
        return res.status(400).send("Trouble unfollowing!!  You are not a follower.");

        await toUnfollow.destroy();
        res.status(200).send("Unfollwed successfully!! You are no longer a follower");
    }

    

};

export default followController;