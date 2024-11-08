import { useEffect, useState } from "react";
import CallToAction from "../components/CallToAction";
import PostCart from "../components/PostCart";
import about from '../assets/project.jpg'

export default function Projects() {
  const [data, setdata] = useState()
  useEffect(()=>{
    const fetchAllPost =async()=>{
      try {
        const res =  await fetch('/api/post/getpost')
          const data = await res.json()
          if(res.ok){
            setdata(data.posts)
          }else{
            console.error("wrong")
          }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchAllPost()
  },[])

  
  return (
    <div className="max-w-4xl mx-auto">
      <section 
        className="middle-section bg-cover bg-center text-center py-24 md:py-48"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${about})`
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white"><span className='text-green-500'>Shadow</span> <br></br> A new experience</h1>
        <p className="text-lg md:text-xl text-gray-300">Discover the thrill and freedom of biking, shared through our passionate journey.</p>
      </section>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-10 mx-4 sm:mx-0">
            {
            data && data.map((post)=>(
                    <PostCart key={post._id} post={post}/>
                ))
            }
      </div>
      <CallToAction/>
    </div>
  )
}
