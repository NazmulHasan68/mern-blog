import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId : {
        type: String,
        required:true
    },
    content : {
        type : String,
        required : true,
    },
    title : {
        type :String,
        required:true,
        unique:true
    },
    image : {
        type : String,
        default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaMVeSi-3VEacOxZ9rOlWJk_JvLN-2CFL12g&s'
    },
    category: {
        type :String,
        default : true,
    },
    slug:{
        type :String,
        required : true,
        unique:true,
    }
},
{timestamps:true}
)
const Post = mongoose.model('Post', PostSchema)
export default Post