import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createController } from '../controller/post.controller.js'
const PostRouter = express.Router()

PostRouter.post('/create', verifyToken, createController)

export default PostRouter