import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {Alert, Button, Textarea} from 'flowbite-react'
import { useState } from "react"
function CommentSection({postId}) {
    
    const {currentUser} = useSelector(state=>state.user)
    const [comment, setcomment] = useState('')
    const [commentError, setcommentError] = useState(null)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(comment.length > 200){
            return
        }
       try {
        const res = await fetch(`/api/comment/create`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body : JSON.stringify({content:comment, postId, userId:currentUser._id})
        })
        const data = await res.json()
        if(res.ok){
            setcomment('')
            setcommentError(null)
        }
       } catch (error) {
        setcommentError(error.message)
       }
        
       
    }
  return (
    <div className="my-4 text-gray-600 dark:text-white font-semibold">
      {
        currentUser ? (
            <div className="flex gap-2">
                <p>Signed in as </p>
                <img src={currentUser.profilePicture} className="w-6 h-6 rounded-full" alt=""/>
                <Link to={'/dashboard?tab=profile'} className="font-extrabold hover:underline text-teal-500">@{currentUser.username}</Link>
            </div>
        ):(
            <div className="font-extrabold hover:underline text-teal-500">
                You must be signed in to CommentSection
                <Link to={'/sign-in'}>Sign in </Link>
            </div>
        )
      }
      {
        currentUser && (
        <>
            <form onSubmit={handleSubmit} className="my-4 border border-teal-500 rounded-md p-3">
                <Textarea
                    placeholder="Add a comment..."
                    rows='3'
                    maxLength='200'
                    onChange={(e)=>setcomment(e.target.value)}
                    value={comment}
                />
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-sm">{200 - comment.length} characters remining </p>
                    <Button outline gradientDuoTone="greenToBlue" type="submit">Sumbit</Button>
                </div>
                <Alert color="failure">
                    {commentError && ({commentError})}
                </Alert>
            </form>
        </>
        )
      }
    </div>
  )
}

export default CommentSection
