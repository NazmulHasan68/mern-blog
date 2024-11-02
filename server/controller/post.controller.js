import Post from "../Models/postMode.js"
import { errorHandler } from "../utils/Error.js"

export const createController = async(req, res, next) =>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, "You are not allowed to crate a post"))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Please priovide all required fields'))
    }
    console.log(req.user.id);
    
   
    const slug = req.body.title 
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '')
                    .trim()
                    .replace(/\s+/g, '-');
    
    const newPost =new Post({
        ...req.body, 
        slug,
        userId:req.user.id
    })
    
    try {
        const savedPost = await newPost.save(); 
        res.status(201).json({
          message: "Post created successfully",
          post: savedPost,
        });
      } catch (error) {
        next(error); // Pass the error to your error handler
      }
}