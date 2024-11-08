import { useSelector } from "react-redux"
import banner from '../assets/banner.png'
import { Link } from "react-router-dom"
import { HiArrowCircleRight } from "react-icons/hi"
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from "react"
import PostCart from "../components/PostCart"


export default function Home() {
  const {theme} = useSelector(state => state.theme)
  const [post, setpost] = useState([])

  useEffect(()=>{
    const fetchPost = async ()=>{
      try {
        const res = await fetch('/api/post/getpost?limit=9')
        const data = await res.json()
        if(res.ok){
            setpost(data)
        }
    } catch (error) {
        console.log(error);
    }}
    fetchPost()
  },[])

  return (
    <div >
      {
        theme && theme=='light'? 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fillOpacity="1" d="M0,128L10.9,154.7C21.8,181,44,235,65,245.3C87.3,256,109,224,131,208C152.7,192,175,192,196,208C218.2,224,240,256,262,256C283.6,256,305,224,327,202.7C349.1,181,371,171,393,181.3C414.5,192,436,224,458,213.3C480,203,502,149,524,144C545.5,139,567,181,589,192C610.9,203,633,181,655,154.7C676.4,128,698,96,720,74.7C741.8,53,764,43,785,32C807.3,21,829,11,851,58.7C872.7,107,895,213,916,218.7C938.2,224,960,128,982,106.7C1003.6,85,1025,139,1047,176C1069.1,213,1091,235,1113,213.3C1134.5,192,1156,128,1178,106.7C1200,85,1222,107,1244,144C1265.5,181,1287,235,1309,240C1330.9,245,1353,203,1375,165.3C1396.4,128,1418,96,1429,80L1440,64L1440,0L1429.1,0C1418.2,0,1396,0,1375,0C1352.7,0,1331,0,1309,0C1287.3,0,1265,0,1244,0C1221.8,0,1200,0,1178,0C1156.4,0,1135,0,1113,0C1090.9,0,1069,0,1047,0C1025.5,0,1004,0,982,0C960,0,938,0,916,0C894.5,0,873,0,851,0C829.1,0,807,0,785,0C763.6,0,742,0,720,0C698.2,0,676,0,655,0C632.7,0,611,0,589,0C567.3,0,545,0,524,0C501.8,0,480,0,458,0C436.4,0,415,0,393,0C370.9,0,349,0,327,0C305.5,0,284,0,262,0C240,0,218,0,196,0C174.5,0,153,0,131,0C109.1,0,87,0,65,0C43.6,0,22,0,11,0L0,0Z"></path></svg>
        :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fillOpacity="1" d="M0,128L10.9,154.7C21.8,181,44,235,65,245.3C87.3,256,109,224,131,208C152.7,192,175,192,196,208C218.2,224,240,256,262,256C283.6,256,305,224,327,202.7C349.1,181,371,171,393,181.3C414.5,192,436,224,458,213.3C480,203,502,149,524,144C545.5,139,567,181,589,192C610.9,203,633,181,655,154.7C676.4,128,698,96,720,74.7C741.8,53,764,43,785,32C807.3,21,829,11,851,58.7C872.7,107,895,213,916,218.7C938.2,224,960,128,982,106.7C1003.6,85,1025,139,1047,176C1069.1,213,1091,235,1113,213.3C1134.5,192,1156,128,1178,106.7C1200,85,1222,107,1244,144C1265.5,181,1287,235,1309,240C1330.9,245,1353,203,1375,165.3C1396.4,128,1418,96,1429,80L1440,64L1440,0L1429.1,0C1418.2,0,1396,0,1375,0C1352.7,0,1331,0,1309,0C1287.3,0,1265,0,1244,0C1221.8,0,1200,0,1178,0C1156.4,0,1135,0,1113,0C1090.9,0,1069,0,1047,0C1025.5,0,1004,0,982,0C960,0,938,0,916,0C894.5,0,873,0,851,0C829.1,0,807,0,785,0C763.6,0,742,0,720,0C698.2,0,676,0,655,0C632.7,0,611,0,589,0C567.3,0,545,0,524,0C501.8,0,480,0,458,0C436.4,0,415,0,393,0C370.9,0,349,0,327,0C305.5,0,284,0,262,0C240,0,218,0,196,0C174.5,0,153,0,131,0C109.1,0,87,0,65,0C43.6,0,22,0,11,0L0,0Z"></path></svg>
      }
      
      <div className="sm:-mt-40 mb-28 flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="flex flex-col gap-6  p-10 px-10 mx-auto">
          <h1 className="text-3xl font-bold lg:text-5xl"><span className="text-green-500">Welcome</span> to my Blog</h1>
          <p className="text-xs sm:text-sm w-[90%] sm:w-[60%]">A bike ride feels exhilarating, offering freedom, connection with 
            nature, and peaceful escape. It's rejuvenating, fun, and wonderfully 
            invigorating</p>
          <Link className="text-green-500 font-semibold flex gap-1 items-center hover:font-bold">view all posts<HiArrowCircleRight className="w-8 h-8"/></Link>
        </div>
        <div className="border-b-4 border-green-500 ">
            <img src={banner} alt="banner " className="w-full h-full object-cover"/>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mb-10 p-5">
        <CallToAction/>
      </div>
      <div className="max-w-6xl mx-auto mb-10 flex flex-col gap-8 py-7">
        {
          post && post.posts?.length > 0 && (
            <div className="w-full">
              <h2 className="text-center text-2xl font-semibold">Resent Post</h2>
              <div className="flex flex-wrap gap-4 justify-center mt-8 mx-14 sm:mx-0">
                {
                  post.posts?.map((post)=>(
                    <PostCart key={post._id} post={post}/>
                  ))
                }
              </div>
            </div>
          )
        }
        <Link to={'/search'} className="text-lg text-green-500 font-semibold hover:underline text-center">
                  view all posts
        </Link>
      </div>
      
    </div>
  )
}
