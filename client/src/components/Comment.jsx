import { useEffect, useState } from "react"
import moment from 'moment';

function Comment({com}) {
    const [user, setuser] = useState()
    console.log(user);
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
    <div className="flex items-center gap-2">
      <div className="">
        <img src={user?.profilePicture} className="w-10 h-10 rounded-full " alt="user.username"/>
      </div>
      <div className="p-4 border-b-[1px] border-gray-400 items-center gap-1 ">
        <div className="flex items-center mb-1">
            <span className="font-bold mr-1 text-xs truncate">{user?`@${user.username}`:'anonymous user'}</span>
            <span className="text-xs font-thin">{moment(com.createdAt).fromNow()}</span>
        </div>
        <p className="text-sm pb-1">{com.content}</p>
      </div>
    </div>
  )
}

export default Comment
