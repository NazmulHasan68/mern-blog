import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {Alert, Button, Textarea} from 'flowbite-react'
import { useEffect, useState } from "react"
import Comment from "./Comment"
function CommentSection({postId}) {
    const navigate = useNavigate()
    const {currentUser} = useSelector(state=>state.user)
    const [comment, setcomment] = useState('')
    const [commentError, setcommentError] = useState(null)
    const [comments, setcomments]= useState('')

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
            setcomments([data, ...comments])
        }
       } catch (error) {
        setcommentError(error.message)
       }  
    }



    useEffect(()=>{
        const getComments = async()=>{
            try {
                const res = await fetch(`/api/comment/getcomment/${postId}`)
                if(res.ok){
                    const data = await res.json()
                    setcomments(data.data)
                }
            } catch (error) {
               console.error(error); 
            }
        }
        getComments()
    },[postId])
    console.log(comments);


    const handleLike = async(commentId) =>{

        try {
            if(!currentUser){
                navigate('/sign-in')
                return
            }
            const res = await fetch(`/api/comment/likecomment/${commentId}`,{
                method : "PUT",
            })
            if(res.ok){
                const data = await res.json()
                setcomments(comments.map((comment)=>
                    comment._id === commentId ? {
                        ...comment, likes:data.likes,
                        numberOfLikes : data.likes.length
                    } : comment
                ))
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = async (comment, editedContent) =>{
        setcomments(
            comments.map((c)=>
            c._id === comment._id ? {...c, content:editedContent} : c)
        )
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
                {
                   commentError? (
                   <Alert color="failure" className="my-2">
                    {commentError }
                    </Alert>): null
                }
                
            </form>
           {
            comments.length === 0 ? (
                <p className="text-sm my-4">No comment yet!</p>
            ):(
                <>
                    <div className="text-sm my-4 flex items-center gap-1">
                        <p>Comments</p>
                        <div className="border border-gray-400 py-1 px-2 rounded-md">
                            <p>{comments.length}</p>
                        </div>
                    </div>
                   {
                     comments.map((com, index)=>(
                        <div key={index}>
                            <Comment com={com} onLike={handleLike} onEdit={handleEdit}/>
                        </div>
                    ))
                   }
                </>
            )
           }
        </>
        )
      }
    </div>
  )
}

export default CommentSection
