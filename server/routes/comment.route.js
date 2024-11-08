import express, { Router } from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createCommentController,
     delteComentController,
      editcommentController,
       getcommentController,
        getCommentsController,
         likecommentController } from '../controller/commentController.js';
const Commentrouter = express.Router();

Commentrouter.post('/create', verifyToken, createCommentController)
Commentrouter.get('/getcomment/:postId', getcommentController)
Commentrouter.put('/likecomment/:commentId', verifyToken, likecommentController)
Commentrouter.put('/editcomment/:commentId', verifyToken, editcommentController)
Commentrouter.delete('/delteComent/:commentId', verifyToken, delteComentController)
Commentrouter.get('/getcommets',verifyToken, getCommentsController)

export default Commentrouter