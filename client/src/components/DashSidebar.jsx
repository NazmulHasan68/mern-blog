import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiHome, HiInbox, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

function DashSidebar() {
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
    <Sidebar aria-label="Default sidebar example" className="w-full sm:w-56">
        <Sidebar.Logo href="#">
            shadow
        </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile'> 
                <Sidebar.Item href="#" active={tab === 'profile'} icon={HiUser} label="User" labelColor="dark" as='div'>
                    Profile
                </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=details'>
                <Sidebar.Item href="#" active={tab === 'details'} icon={HiChartPie} as='div'>
                    Details
                </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=post'>
                <Sidebar.Item href="#" active={tab === 'post'} icon={HiViewBoards}  as='div' >
                    Post
                </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=inbox'>
                <Sidebar.Item href="#" active={tab === 'inbox'}icon={HiInbox}  label="3" as='div'>
                    Inbox
                </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=home'>
                <Sidebar.Item href="/" active={tab === 'home'} icon={HiHome} as='div'>
                    Home
                </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=sign-in'>
                <Sidebar.Item href="/sign-in" active={tab === 'sign-in'} icon={HiArrowSmRight} as='div'>
                    Sign In
                </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=logout'>
                <Sidebar.Item href="#" active={tab === 'logout'} icon={HiTable} as='div'>
                    logout
                </Sidebar.Item>
            </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar


