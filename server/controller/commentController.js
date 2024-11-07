import Comment from "../Models/commentModel.js"
import { errorHandler } from "../utils/Error.js"

export  const createCommentController = async(req, res, next)=>{
   try {
        const {content, postId, userId} = req.body
        if(userId !== req.user.id){
            return next(errorHandler(403, 'You are not alow to create this comment'))
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        const comment = await newComment.save()
        res.status(200).json({
            comment
        })
   } catch (error) {
    next(error)
   }
    
}


export const getcommentController = async(req, res, next)=>{
    try {
        const comments = await Comment.find({postId:req.params.postId}).sort({createdAt:-1})
        res.status(200).json({data:comments})
    } catch (error) {
        next(error)
    }
}
