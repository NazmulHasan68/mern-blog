import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createController, getPostController } from '../controller/post.controller.js'
const PostRouter = express.Router()

PostRouter.post('/create', verifyToken, createController)

PostRouter.get('/getpost', getPostController)

export default PostRouter