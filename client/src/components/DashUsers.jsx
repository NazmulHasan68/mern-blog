
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiCheck, HiOutlineExclamationCircle } from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";

import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] =useState([])
  const [showmore, setshowmore] = useState(true)
  const [showModel, setShowModel] = useState(false)
  const [userIdToDelete, setuserIdToDelete] = useState('')

  const fetechUsers = async()=>{
    const res = await fetch(`/api/user/getusers`)
    const data = await res.json()
    if(res.ok){
      setUsers(data.users)
      if(data.users.length < 9){
        setshowmore(false)
      }
    }
  }

  useEffect(()=>{
    if(currentUser.isAdmin){
      fetechUsers()
    }
  },[currentUser._id])

  const handleShowMore = async()=>{
    const startIndex = users.length
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json()
      if(res.ok){
        setUsers((prev)=>[...prev,...data.users])
        if(data.users.length<9){
          setshowmore(false)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //baki
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        alert("Error: " + data.message);
      } else {
        // Optimistically update the UI
        setUsers((prev) => prev.filter((post) => post._id !== userIdToDelete));
        setShowModel(false)
      }
    } catch (error) {
      console.error(error.message);
      alert("An error occurred: " + error.message);
    }
  };
  
  console.log(users);
  

  return (
    <div className="w-[98%] sm:overflow-hidden overflow-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-400">
     {currentUser.isAdmin && users.length > 0 ? (
      <>
       <Table hoverable className="shadow-md m-2 sm:mx-6 sm:my-4 w-full">
        <Table.Head>
          <Table.HeadCell>Data created</Table.HeadCell>
          <Table.HeadCell>User image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {
           users.map((user, index)=>(
            <Table.Body key={index} className="divide-y ">
              <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200 ">
                <Table.Cell className="text-gray-500 dark:text-gray-300" >{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <img src={user.profilePicture} alt={user.username} className="h-10 w-10 rounded-full object-cover bg-gray-500"/>
                </Table.Cell>
                <Table.Cell>
                  {user.username}
                </Table.Cell>
                <Table.Cell className=" text-gray-500 dark:text-gray-300" >
                  {user.email}
                </Table.Cell>
                <Table.Cell className=" text-gray-500 dark:text-gray-300" >
                  {user.isAdmin? <HiCheck className="text-green-500 font-semibold text-xl"/>:<HiMiniXMark className="text-red-500 font-semibold text-xl"/>}
                </Table.Cell>
                <Table.Cell>
                  <span 
                    onClick={()=>{
                      setShowModel(true)
                      setuserIdToDelete(user._id)
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
      <p>You have no usrs yet</p>
     )}
     {
      <Modal show={showModel} size="md" onClose={() => setShowModel(false)} popup 
        position="center" className="flex items-center justify-center h-screen bg-slate-500/55 " >
      <Modal.Header  />
      <Modal.Body >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this post?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => handleDeleteUser(false)}>
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

export default DashPost

