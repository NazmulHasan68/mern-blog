import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {Alert, Button, Modal, Textarea} from 'flowbite-react'
import { useEffect, useState } from "react"
import Comment from "./Comment"
import { HiOutlineExclamationCircle } from "react-icons/hi";
function CommentSection({postId}) {
    const navigate = useNavigate()
    const {currentUser} = useSelector(state=>state.user)
    const [comment, setcomment] = useState('')
    const [commentError, setcommentError] = useState(null)
    const [comments, setcomments]= useState('')
    const [ showModel , setShowmodel] = useState(false)
    const [commentToDelete, setcommentToDelete] = useState(null)

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

    const handleDeleteComment = async (commentId) =>{
        try {
            if(!currentUser){
                navigate('sign-in')
                return
            }
            const res = await fetch(`/api/comment/delteComent/${commentId}`,{
                method : "DELETE",
            })
            if(res.ok){
                const data = await res.json()
                setcomments(data)
                setcomments(comments.filter((comment)=>comment._id !== commentId))
                setShowmodel(false)
            }
            
        } catch (error) {
            console.log(error);
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
                           <Comment 
                                com={com} 
                                onLike={handleLike} 
                                onEdit={handleEdit} 
                                onDelete={(commentId) => {
                                    setShowmodel(true); // Ensure the modal is shown
                                    setcommentToDelete(commentId); // Set the comment ID to be deleted
                                }}
                            />
                        </div>
                    ))
                   }
                   {
                    <Modal show={showModel} size="md" onClose={() => setShowmodel(false)} popup 
                        position="center" className="flex items-center justify-center h-screen bg-slate-500/55 " >
                        <Modal.Header  />
                        <Modal.Body >
                            <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this comment
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => handleDeleteComment(commentToDelete)}>
                                {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setShowmodel(false)}>
                                No, cancel
                                </Button>
                            </div>
                            </div>
                        </Modal.Body>
                    </Modal>
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
