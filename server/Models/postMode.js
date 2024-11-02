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
        default : '../public/post/blog.png'
    },
    category: {
        type :String,
        default : true,
        unique : true
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