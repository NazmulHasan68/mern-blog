import express from 'express';
import { signinController, signupController } from '../controller/auth.controller.js';

const AuthRooute = express.Router()
AuthRooute.post('/signup', signupController)
AuthRooute.post('/signin', signinController)

export default AuthRooute;