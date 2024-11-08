import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import {Link} from 'react-router-dom'

function DashboardComponent() {
    const [users, setusers] = useState([])
    const [comments, stcomments] = useState([])
    const [post, setpost] = useState([])

    const [totalUsers, setTotalusers] = useState([])
    const [totalPosts, settotalposts] = useState([])
    const [totalcomments, settotalcommets] = useState([])

    const [LastmonthPost, setLastmonthPost] = useState([])
    const [lastmonthUsers, setlastmonthUsers] = useState([])
    const [lastmonthComments, setlastmonthComments] = useState([])

    const {currentUser} = useSelector((state)=>state.user)

    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                const res = await fetch('/api/user/getusers?limit=5')
                const data = await res.json()
                if(res.ok){
                    setusers(data.users)
                    setTotalusers(data.totalUsers)
                    setlastmonthUsers(data.LastMonthUsers)
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchPosts = async()=>{
            try {
                const res = await fetch('/api/post/getpost?limit=5')
                const data = await res.json()
                if(res.ok){
                    setpost(data.posts)
                    settotalposts(data.totalPosts)
                    setLastmonthPost(data.lastMonthPost)
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchComments = async()=>{
            try {
                const res = await fetch('/api/comment/getcommets?limit=5')
                const data = await res.json()
                if(res.ok){
                    stcomments(data.comments)
                    settotalcommets(data.totalComments)
                    setlastmonthComments(data.lastMonthComments)
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(currentUser.isAdmin){
            fetchUsers()
            fetchPosts()
            fetchComments()
        }
    },[currentUser])

  return (
    <div className="">
        <div className="p-3 w-full justify-center flex flex-col sm:flex-row gap-4 mt-5 ">
        <div className="flex p-3 justify-between items-start dark:bg-slate-700 gap-4 md:w-72 rounded-md shadow-md">
            <div className="">
                <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
                <p>{totalUsers}</p>
                <div className="flex gap-2 items-center py-2">
                    <span className="text-green-500 flex items-center">
                        <HiArrowNarrowUp/>
                        {lastmonthUsers}
                    </span>
                    <div className="text-gray-500 text-sm">Last month</div>
                </div>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg"/>
        </div>

        <div className="flex p-3 justify-between items-start dark:bg-slate-700 gap-4 md:w-72 rounded-md shadow-md">
            <div className="">
                <h3 className="text-gray-500 text-md uppercase">Total Post</h3>
                <p>{totalPosts}</p>
                <div className="flex gap-2 items-center py-2">
                    <span className="text-green-500 flex items-center">
                        <HiArrowNarrowUp/>
                        {LastmonthPost}
                    </span>
                    <div className="text-gray-500 text-sm">Last month</div>
                </div>
            </div>
            <HiAnnotation className="bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg"/>
        </div>

        <div className="flex p-3 justify-between items-start dark:bg-slate-700 gap-4 md:w-72 rounded-md shadow-md">
            <div className="">
                <h3 className="text-gray-500 text-md uppercase">Total Comment</h3>
                <p>{totalcomments}</p>
                <div className="flex gap-2 items-center py-2">
                    <span className="text-green-500 flex items-center">
                        <HiArrowNarrowUp/>
                        {lastmonthComments}
                    </span>
                    <div className="text-gray-500 text-sm">Last month</div>
                </div>
            </div>
            <HiDocumentText className="bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg"/>
        </div>

        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mx-8 my-4 ">

            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md  dark:bg-gray-700">
                <div className="flex justify-between p-3 text-sm font-semibold">
                    <h1 className="text-center p-2">Recent User</h1>
                    <Button outline className=' hover:bg-teal-500 text-gray-600'>
                        <Link to={'/dashboard?tab=users'} className="text-gray-500">See All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>User image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                    </Table.Head>
                    {users && users.map((user)=>(
                        <Table.Body key={user._id} className="divided-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-700">
                                <Table.Cell>
                                    <img
                                        src={user.profilePicture}
                                        alt="user"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    {user.username}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))

                    }
                </Table>
            </div>

            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-700">
                <div className="flex justify-between p-3 text-sm font-semibold">
                    <h1 className="text-center p-2">Recent Comments</h1>
                    <Button outline className=' hover:bg-teal-500 text-gray-600'>
                        <Link to={'/dashboard?tab=comments'} className="text-gray-500">See All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Comments Content</Table.HeadCell>
                        <Table.HeadCell>Likes</Table.HeadCell>
                    </Table.Head>
                    {comments && comments.map((comment)=>(
                        <Table.Body key={comment._id} className="divided-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-700">
                                <Table.Cell className="w-92">
                                    <p className="line-clamp-2">{comment.content}</p>
                                </Table.Cell>
                                <Table.Cell>
                                    {comment.numberOfLikes}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))

                    }
                </Table>
            </div>

            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-700 ">
                <div className="flex justify-between p-3 text-sm font-semibold">
                    <h1 className="text-center p-2">Recent Post</h1>
                    <Button outline className=' hover:bg-teal-500 text-gray-600'>
                        <Link to={'/dashboard?tab=posts'} className="text-gray-500">See All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Post image</Table.HeadCell>
                        <Table.HeadCell>Post title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                    </Table.Head>
                    {post && post.map((posts)=>(
                        <Table.Body key={posts._id} className="divided-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-700">
                                <Table.Cell>
                                    <img
                                        src={posts.image}
                                        alt="user"
                                        className="w-10 h-10 rounded-lg"
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    {posts.title}
                                </Table.Cell>
                                <Table.Cell>
                                    {posts.category}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))

                    }
                </Table>
            </div>
            
        </div>
    </div>
  )
}

export default DashboardComponent
