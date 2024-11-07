import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createCommentController } from '../controller/commentController.js';
const Commentrouter = express.Router();

Commentrouter.post('/create', verifyToken, createCommentController)

export default Commentrouter