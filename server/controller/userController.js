import { errorHandler } from "../utils/Error.js";
import bcryptjs from 'bcryptjs';
import User from "../Models/userModel.js";

export const test = async (req, res) => {
    res.json({ message: "Yes, I am working" });
};

export const updateUserController = async (req, res, next) => {

    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user.'));
    }

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, 'User not found.'));
        }

        const updates = {};
        
        if (req.body.password) {
            if (req.body.password.length < 4) {
                return next(errorHandler(400, 'Password must be at least 4 characters.'));
            }
            updates.password = bcryptjs.hashSync(req.body.password, 10);
        }

        if (req.body.username) {
            if (req.body.username.length < 5 || req.body.username.length > 20) {
                return next(errorHandler(400, 'Username must be between 5 to 20 characters.'));
            }
            if (req.body.username.includes(' ')) {
                return next(errorHandler(400, 'Username cannot contain spaces.'));
            }
            if (req.body.username !== req.body.username.toLowerCase()) {
                return next(errorHandler(400, 'Username must be lowercase.'));
            }
            if (!/^[a-zA-Z0-9]+$/.test(req.body.username)) {
                return next(errorHandler(400, 'Username can only contain letters and numbers.'));
            }
            updates.username = req.body.username;
        }

        if (req.body.email) {
            updates.email = req.body.email; 
        }
        if (req.body.profilePicture) {
            updates.profilePicture = req.body.profilePicture; // Assuming you want to update the profile picture
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: updates },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, 'Failed to update user.'));
        }

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
  
    } catch (error) {
        next(error);
    }
};



export const deleteUserController = async(req, res, next)=>{
    if(req.user.id !== req.params.userId){
        next(errorHandler(403, 'Your are not allowed to delete this user'))
    }

    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json("user has been deleted")
    } catch (error) {
        next(error)
    }
}


export const SingoutController = async(req, res, next)=>{
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out')
    } catch (error) {
        next(error)
    }
}


export const getUserController = async(req, res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to see all users'))
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDireaction = req.query.sort == 'ase'? 1 : -1;


        const users = await User.find()
            .sort({createdAt: sortDireaction})
            .skip(startIndex)
            .limit(limit)
        
        const usersWithoutPassword = users.map((user)=>{
            const {password, ...rest}= user._doc
            return rest
        })

        const totalUsers = await User.countDocuments()

        const now = new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const LastMonthUsers = await User.countDocuments({
            createdAt : {$gte : oneMonthAgo}
        })

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            LastMonthUsers
        })

    } catch (error) {
        next(error)   
    }
}