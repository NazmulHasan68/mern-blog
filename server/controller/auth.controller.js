import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs'

export const signupController = async(req, res)=>{
    const {username, email, password} = req.body;
    if(!username ||!email ||!password|| username ==='' || email ==='' || password ===''){
        return res.status(200).json({message : 'All field are required'})
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try {
        const user = await newUser.save()
        res.json({
            message : 'signup successfull',
            payload: user
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
   
}