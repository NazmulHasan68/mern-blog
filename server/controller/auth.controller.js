import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/Error.js";

export const signupController = async(req, res, next)=>{
    const {username, email, password} = req.body;
    if(!username ||!email ||!password|| username ==='' || email ==='' || password ===''){

       next(errorHandler(400, "All fields are required"))
    }else{
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        try {
            const user = await newUser.save()
            res.json({
                success:true,
                message : 'signup successfull',
                payload: user
            })
        } catch (error) {
            next(error)
        }
    }
}