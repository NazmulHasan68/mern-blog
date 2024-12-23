import { Button, Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import leftImage from '../assets/banner left.png'
import RightImage from '../assets/rightimag.png'
import CallToAction from '../components/CallToAction'
import CommentSection from '../components/CommentSection'
import PostCart from '../components/PostCart'
function PostPage() {
    const {postSlug} = useParams()
    const [loading, setloading] = useState(true)
    const [Error, setEroor] = useState(false)
    const [post, setPost] = useState(null)
    const[recentPosts, setRecetPost] = useState()

    useEffect(()=>{
        try {
            const fetchRescentpost = async()=>{
                const res = await fetch(`/api/post/getpost?limit=3`)
                const data = await res.json()
                if(res.ok){
                    setRecetPost(data.posts)
                }
            }
            fetchRescentpost()
        } catch (error) {
            console.log(error);
        }
    },[])
    console.log(recentPosts);
    

    useEffect(()=>{
        const fetchPost = async()=>{
            try {
                setloading(true);
                const res = await fetch(`/api/post/getpost?slug=${postSlug}`)
                const data = await res.json()

                if(!res.ok){
                    setEroor(true)
                    setloading(false)
                    return
                }
                if(res.ok){
                    setPost(data.posts[0])
                    setEroor(false)
                    setloading(false)
                }
            } catch (error) {
                setEroor(true)
                setloading(false)
            }
        }
        fetchPost()
    },[postSlug])

    if(loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl'/>
        </div>
    )



  return (
    <div className='flex justify-between items-start max-w-7xl min-h-screen mx-auto px-4'>
        <div className='hidden md:block basis-1/3 w-full h-[550px] p-16 -mt-2 ' >
                <img src={leftImage} alt='left side image' className='w-full h-full shadow-lg'/>
        </div>
        <main className='p-3 flex flex-col mx-auto md:h-[650px] custom-scrollbar md:overflow-auto md:basis-2/3 shadow-md'>
            <h1 className='text-2xl ms:text-3xl lg:text-4xl mt-5 sm:mt-10 text-center font-serif max-w-2xl mx-auto text-teal-600'>{post && post.title}</h1>
            <Link to={`/search?category=${post && post.category}`} >
                <Button color='grey' size='sm'  className='text-center border-2 rounded-full mx-auto my-4'>{post?.category || 'No category'}</Button>
            </Link>
            <img src={post && post.image} alt={post && post.title} className='mt-4 max-h-[400px] w-full object-cover mx-auto'/>
            <div className='flex justify-between border-b-2 py-2'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>
            <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post && post.content}}>

            </div>
            <div className='max-w-2xl mx-auto'>
                <CallToAction/>
            </div>
            <div>
                <CommentSection postId={post && post._id}/>
            </div>
            <div className='flex flex-col justify-center items-center mb-5 '>
                <h2 className='text-xl mt-5'>Recent Articales</h2>
                <div className='flex gap-2 flex-col sm:flex-row m-2 w-full overflow-x-auto'>
                    {
                        recentPosts && recentPosts.map((post)=>(
                            <PostCart key={post._id} post={post}/>
                        ))
                    }
                </div>
            </div>
        </main>
        <div className='hidden md:block basis-1/3 w-full h-[550px] p-16 -mt-2' >
                <img src={RightImage} alt='left side image' className='w-full h-full shadow-lg'/>
        </div>
    </div>
  )
}

export default PostPage
