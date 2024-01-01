import Joi from "joi";


const userValidator= 
{  validate: (req,res,next)=>
    {
        try
        {
            const data=req.body;
            const schema=Joi.object({
                userName: Joi.string().min(3).required(),
                email:Joi.string().email().required(),
                password:Joi.string().min(5).required()
            })
            
           const {error,value}= schema.validate(data);
           if(error)
           return res.status(400).send(error.details[0].message);
           next();
        }
        catch(error)
        {
            res.status(500).send("Something bad happened. Please try again");
        }
    
      
    }


};

export default userValidator;
