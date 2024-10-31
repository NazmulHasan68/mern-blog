import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/Error.js";
import jwt from 'jsonwebtoken'

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



export const signinController = async(req, res, next)=>{
    const {email , password} = req.body;

    if(!email ||!password ||email ==='' ||password===''){
        next(errorHandler(400, 'All Fields are required'))
    }
    try {
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(400, 'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword){
            return next(errorHandler(400, 'Invalid password'))
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass,...rest} = validUser._doc

        res.status(200).cookie('access_token', token, {
            httpOnly:true}).json(rest)
    } catch (error) {
        next(error)
    }
}