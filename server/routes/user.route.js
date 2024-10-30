import express from 'express'
const router = express.Router()
import { test } from '../controller/userController.js'
router.get('/test', test)

export default router