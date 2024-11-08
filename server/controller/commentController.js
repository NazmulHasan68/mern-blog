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

export const likecommentController = async(req, res, next)=>{
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(403,'Comment not found'))
        }
        const userIndex = comment.likes.indexOf(req.user.id)
        if(userIndex === -1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id)
        }else{
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1)
        }
        await comment.save()
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

export const editcommentController = async(req, res, next) =>{
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(403, 'Comment is not found'))
        }
        if(comment.userId !== req.user.id && !req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, 'You are not allowed to edit this comment'))
        }
        const editcomment = await Comment.findByIdAndUpdate(req.params.commentId,
            {
                content : req.body.content
            },{new : true}
        )
        res.status(200).json(editcomment)
    } catch (error) {
        next(error)
    }
}

export const delteComentController = async(req, res, next) =>{
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(403, 'comment is not found'))
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, ' You are not allowed to deletes this comment'))
        }
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json("comment has been deleted")
    } catch (error) {
        next(error)
    }
}

export const getCommentsController = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to see all comments'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;

        // Fetch comments with pagination and sorting
        const comments = await Comment.find()
            .sort({ createdAt: sortDirection })
            .limit(limit)
            .skip(startIndex);

        const totalComments = await Comment.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthComments = await Comment.countDocuments({ createdAt: { $gte: oneMonthAgo } });

        res.status(200).json({
            comments,
            totalComments,
            lastMonthComments
        });
    } catch (error) {
        next(error);
    }
};
