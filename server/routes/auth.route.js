import express from 'express';
import { signupController } from '../controller/auth.controller.js';

const AuthRooute = express.Router()
AuthRooute.post('/signup', signupController)

export default AuthRooute;