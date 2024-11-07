import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createCommentController, getcommentController, likecommentController } from '../controller/commentController.js';
const Commentrouter = express.Router();

Commentrouter.post('/create', verifyToken, createCommentController)
Commentrouter.get('/getcomment/:postId', getcommentController)
Commentrouter.put('/likecomment/:commentId', verifyToken, likecommentController)

export default Commentrouter