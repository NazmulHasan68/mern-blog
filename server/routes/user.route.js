import express from 'express'
const router = express.Router()
import { deleteUserController, getComUserController, getUserController, SingoutController, test, updateUserController } from '../controller/userController.js'
import { verifyToken } from '../utils/verifyUser.js'


router.get('/test', test)
router.put('/update/:userId',verifyToken, updateUserController)
router.delete('/delete/:userId', verifyToken, deleteUserController)
router.post('/signout', SingoutController)
router.get('/getusers', verifyToken, getUserController)
router.get('/getComUser/:userId', getComUserController)

export default router