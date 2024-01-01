import { time } from "console";
import postModel from "../Models/postModel.js"
import userModel from "../Models/userModel.js";




const postController=
{
    create: async (req,res)=>
    {   
        try{
        
          const user=await userModel.findOne({where:{id:req.session.user.id}});

          const {content,timeStamp}=req.body;
          const post=await user.createPost({
            author:user.userName,
            content:content,
            
          });

          user.addPosts(post);
          res.status(200).json({"Status":"Post uploaded","Details":post});
        }
      
        catch(err)
        {
            res.status(500).send("Post not created"+err);
        }
   
    },

    getPost:
    async (req,res)=>
    {
      try{
        const post=await postModel.findByPk(req.params.postId);
        if(!post)
        return res.status(404).send("Post does not exist");
        res.status(200).send(post);
      }
      catch(error)
      {
        res.status(500).send("Something bad happened while fetching post. Please try again");
      }
    
    },

    getPostsOfSomeUser:
    async(req,res)=>
    {
      try{
        const posts=await postModel.findAll({
          where:
          {
            userId:req.params.userId
          },
          
        });

        if(!posts)
        {
          return res.status(200).send("No posts on the user profile");
        }

        return res.status(200).send(posts);

  
      }
      catch(error)
      {
        res.status(500).send(error);
      }
    },

    getSpecificPostOfSomeUSer:
    async(req,res)=>
    {
      try{
        const post=await postModel.findByPk(req.params.postId,{
        where:{
          userId:req.params.userId
        }
      });
      if(!post)
      res.status(200).send("Post by this user does not exist");
      res.status(200).send(post);
    
   
    }

      catch(error)
      {
        res.status(500).send("Something bad happened while fetching post. Please try again");
      }
    
    },

    getMyPosts:
    async(req,res)=>
    {
      try{
        
        const posts=await postModel.findAll({
          where:
          {
            userId:req.session.user.id
          }
        });

        if(!posts)
        return res.status(200).send("No posts exists by this user");

        res.status(200).send(posts);
      }
      catch(error)
      {
        res.status(500).send("Something bad happened while fetching posts/ Please try again");
      }
    },

    getAllPosts:
    async (req,res)=>
    {
    try{
    const posts=await postModel.findAll();
    if(!posts)
    return res.status(404).send("No posts Found");
    res.status(200).send(posts);
    }
    catch(error)
    {
      res.status(500).send("Soemthing bad happened. Please try Again");
    }
    }

    ,

    deletePost:
    async(req,res)=>
    {
    try{
      const post=await postModel.findByPk(req.params.postId);
      if(!(post.userId===req.session.user.id))
      throw new Error("You don't have rights to delete this post");
      await post.destroy();
      res.status(200).send("Post deleted");

    }
    catch(error)
    {
      res.status(403).send(error.message);
    }
    },


    deleteAllPosts:
    async(req,res)=>
    {
      try{
        const posts=await postModel.findAll(
        {
          where:
          {
            userId:req.session.user.id
          }
        }
        );
        await posts.forEach((post)=>post.destroy());
        res.status(200).send("posts deleted");
    }
    catch(error)
    {
      res.status(500).send("Post can't be deleted at this time. Please try again");
    }
  },

  updatePost:
  async(req,res)=>
  {
    try{
      const {content}=req.body;
      const post=await postModel.findByPk(req.params.postId);
      if(post.userId!==req.session.user.id)
      return res.status(403).send("You dont have the rights to update post");
    
      await post.update(
       {
        content:content
       }
      );
  
      res.status(200).json({"Status":"Post updated", "Details":post});
    }

    catch(error)
    {
      res.status(500).send("Something bad happened while fetching post. Please Try again");
    }
  
  }


   

    


};


export default postController;