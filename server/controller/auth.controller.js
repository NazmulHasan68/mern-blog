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
        const token = jwt.sign({id:validUser._id, isAdmin:validUser.isAdmin},process.env.JWT_SECRET)

        const {password:pass,...rest} = validUser._doc
        res.status(200)
                .cookie('access_token', token, {
                httpOnly: true, // Prevents access via JavaScript
                })
                .json(rest); 
    } catch (error) {
        next(error)
    }
}



export const googleController = async(req, res, next) =>{
    const {email, name, googlePhotoURL} = req.body;

    try{
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_SECRET)
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly : true,
            }).json(rest)
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({
                username : name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoURL
            })
            await newUser.save();
            const token = jwt.sign({id:newUser._id, isAdmin:newUser.isAdmin}, process.env.JWT_SECRET)
            const {password, ...rest} = newUser._doc;

            res.status(200).cookie('access_token', token, {
                httpOnly : true,
            }).json(rest)
        }
    }catch(error){
        next(error)
    }
}