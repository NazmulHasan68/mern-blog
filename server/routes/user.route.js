import express from 'express'
const router = express.Router()
import { test, updateUserController } from '../controller/userController.js'
import { verifyToken } from '../utils/verifyUser.js'


router.get('/test', test)
router.put('/update/:userId',verifyToken, updateUserController)

export default router