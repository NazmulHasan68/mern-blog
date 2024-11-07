import { useEffect, useState } from "react"
import moment from 'moment';
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

function Comment({com, onLike}) {
    const [user, setuser] = useState()
    const {currentUser} = useSelector((state)=>state.user)
    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await fetch(`/api/user/getComUser/${com.userId}`)
                const data = await res.json()
                if(res.ok){
                    setuser(data)
                }
            } catch (error) {
                console.error(error);   
            }
        }
        getUser()
    },[com])


  return (
    <div className="flex items-start gap-2 p-2 border-b-[1px] border-gray-400 ml-14">
      <div className="">
        <img src={user?.profilePicture} className="w-10 h-10 rounded-full " alt="user.username"/>
      </div>
      <div className=" items-center gap-1 ">
        <div className="flex items-center mb-1">
            <span className="font-bold mr-1 text-xs truncate">{user?`@${user.username}`:'anonymous user'}</span>
            <span className="text-xs font-thin">{moment(com.createdAt).fromNow()}</span>
        </div>
        <p className="text-sm pb-1">{com.content}</p>
        <div className="w-[150px] h-[1px] my-2 bg-slate-400"></div>
        <div className="flex gap-1">
            <button onClick={()=>onLike(com._id)} className={`text-gray-400 hover:text-blue-600 cursor-pointer ${currentUser && com.likes.includes(currentUser._id) && '!text-blue-600' }`}>
                <FaThumbsUp className="text-sm"/>
            </button>
            <p className="text-gray-600">
                {
                    com.numberOfLikes > 0 && com.numberOfLikes + " " + (com.numberOfLikes === 1 ? "like" : "likes")
                }
            </p>

        </div>
      </div>
    </div>
  )
}

export default Comment
