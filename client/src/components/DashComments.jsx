
import { Alert, Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiCheck, HiOutlineExclamationCircle } from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";

import { useSelector } from "react-redux"


function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setcomments] =useState([])
  const [showmore, setshowmore] = useState(true)
  const [showModel, setShowModel] = useState(false)
  const [commentToDelete, setcommentToDelete] = useState('')

  const fetechComments = async()=>{
    const res = await fetch(`/api/comment/getcommets`)
    const data = await res.json()
    if(res.ok){
        setcomments(data.comments)
      if(data.comments.length < 9){
        setshowmore(false)
      }
    }
  }

  useEffect(()=>{
    if(currentUser.isAdmin){
        fetechComments()
    }
  },[currentUser._id])

  const handleShowMore = async()=>{
    const startIndex = comments.length
    try {
      const res = await fetch(`/api/comment/getcommets?startIndex=${startIndex}`);
      const data = await res.json()
      if(res.ok){
        setcomments((prev)=>[...prev,...data.comments])
        if(data.comments.length<9){
          setshowmore(false)
        }
      }
    } catch (error) {
      console.error(error); 
    }
  }

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(`/api/comment/delteComent/${commentToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        alert("Error: " + data.message);
      } else {
        // Optimistically update the UI
        setcomments((prev) => prev.filter((post) => post._id !== commentToDelete));
        setShowModel(false)
        Alert('coment is deleted successfully!')
      }
    } catch (error) {
      console.error(error); 
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="w-[98%] sm:overflow-hidden overflow-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-400">
     {currentUser.isAdmin && comments.length > 0 ? (
      <>
       <Table hoverable className="shadow-md m-2 sm:mx-6 sm:my-4 w-full">
        <Table.Head>
          <Table.HeadCell>Data updated</Table.HeadCell>
          <Table.HeadCell>Comment content</Table.HeadCell>
          <Table.HeadCell>NUmber of likes</Table.HeadCell>
          <Table.HeadCell>postId</Table.HeadCell>
          <Table.HeadCell>userId</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {
           comments.map((comment, index)=>(
            <Table.Body key={index} className="divide-y ">
              <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200 ">
                <Table.Cell className="text-gray-500 dark:text-gray-300" >{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  {comment.content}
                </Table.Cell>
                <Table.Cell>
                  {comment.numberOfLikes}
                </Table.Cell>
                <Table.Cell className=" text-gray-500 dark:text-gray-300" >
                  {comment.postId}
                </Table.Cell>
                <Table.Cell className=" text-gray-500 dark:text-gray-300" >
                  {comment.userId}
                </Table.Cell>
                <Table.Cell>
                  <span 
                    onClick={()=>{
                      setShowModel(true)
                      setcommentToDelete(comment._id)
                    }} 
                    className=" cursor-pointer text-red-500 hover:font-semibold">
                      Delete 
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
           ))
        }
      </Table>
      {
        showmore && (
        <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7 hover:font-semibold">
          Show more
        </button>)
      }
      </>
     
     ) : (
      <p>You have no comment yet!</p>
     )}
     {
      <Modal show={showModel} size="md" onClose={() => setShowModel(false)} popup 
        position="center" className="flex items-center justify-center h-screen bg-slate-500/55 " >
      <Modal.Header  />
      <Modal.Body >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to comment this post?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => handleDeleteComment(false)}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setShowModel(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
   </Modal>
     }
    </div>
  )
}

export default DashComments
