import { Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] =useState([])
  const [showmore, setshowmore] = useState(true)
  console.log(userPost);
  
  const fetechPost = async()=>{
    const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`)
    const data = await res.json()
    if(res.ok){
      setUserPost(data.posts)
      if(data.posts.length < 9){
        setshowmore(false)
      }
    }
  }

  useEffect(()=>{
    if(currentUser.isAdmin){
      fetechPost()
    }
  },[currentUser._id])

  const handleShowMore = async()=>{
    const startIndex = userPost.length
    try {
      const res = await fetch(`/api/post/getpost?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json()
      if(res.ok){
        setUserPost((prev)=>[...prev,...data.posts])
        if(data.posts.length<9){
          setshowmore(false)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="w-[98%] sm:overflow-hidden overflow-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-400">
     {currentUser.isAdmin && userPost.length > 0 ? (
      <>
       <Table hoverable className="shadow-md m-2 sm:mx-6 sm:my-4 w-full">
        <Table.Head>
          <Table.HeadCell>Data Updated</Table.HeadCell>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Add</Table.HeadCell>
        </Table.Head>
        {
           userPost.map((post, index)=>(
            <Table.Body key={index} className="divide-y ">
              <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200 ">
                <Table.Cell className="text-gray-500 dark:text-gray-300" >{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt={post.title} className="h-10 w-20 object-cover bg-gray-500"/>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link className="font-medium text-gray-500 dark:text-gray-300"  to={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell className=" text-gray-500 dark:text-gray-300" >
                  {post.category}
                </Table.Cell>
                <Table.Cell>
                  <span className=" cursor-pointer text-red-500 hover:font-semibold">Delete</span>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/updated-post/${post._id}`}>
                    <span className="text-teal-500 hover:font-semibold">Edit</span>
                  </Link>
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
      <p>You have no Post</p>
     )}
    </div>
  )
}

export default DashPost
