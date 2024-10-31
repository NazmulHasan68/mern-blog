import express from 'express';
import { signinController, signupController , googleController} from '../controller/auth.controller.js';

const AuthRooute = express.Router()
AuthRooute.post('/signup', signupController)
AuthRooute.post('/signin', signinController)
AuthRooute.post('/google', googleController)

export default AuthRooute;