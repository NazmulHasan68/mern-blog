import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createCommentController, editcommentController, getcommentController, likecommentController } from '../controller/commentController.js';
const Commentrouter = express.Router();

Commentrouter.post('/create', verifyToken, createCommentController)
Commentrouter.get('/getcomment/:postId', getcommentController)
Commentrouter.put('/likecomment/:commentId', verifyToken, likecommentController)
Commentrouter.put('/editcomment/:commentId', verifyToken, editcommentController)

export default Commentrouter