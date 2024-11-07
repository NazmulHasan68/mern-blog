import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import  DashProfile  from '../components/DashProfile';
import  DashSidebar  from '../components/DashSidebar';
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUsers";

export default function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromURL = urlParams.get('tab')
    if(tabFromURL){
      setTab(tabFromURL)
    }
  },[location.search])
  return (
    <div className='flex min-h-screen flex-col sm:flex-row'>
      <div className='sm:w-56'>
        {/* sidebar */}
        <DashSidebar/>
      </div>
      <div className="w-full">
      {/* profile */}
        {tab === 'profile' && <DashProfile />}
      {/* posts */}
        {tab === 'posts' && <DashPost/>}
      {/* Users */}
      {tab === 'users' && <DashUsers/>}
      </div>
    </div>
  )
}
