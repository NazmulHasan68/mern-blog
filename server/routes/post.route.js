import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createController, deletePostController, getPostController, updatepostController } from '../controller/post.controller.js'
const PostRouter = express.Router()

PostRouter.post('/create', verifyToken, createController)
PostRouter.get('/getpost', getPostController)
PostRouter.delete('/deletepost/:postId/:userId', verifyToken, deletePostController)
PostRouter.put('/updatepost/:postId/:userId', verifyToken, updatepostController)


export default PostRouter