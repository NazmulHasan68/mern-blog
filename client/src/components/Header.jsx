import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link , useLocation, useNavigate} from "react-router-dom";
import { useSelector , useDispatch} from 'react-redux';

//icons
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon , FaSun} from "react-icons/fa6";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // Import icons

import { toggleTheme } from '../redux/theme/ThemSlice';
import { signOutSuccess } from "../redux/userSlice/userSlice";

export default function Header() {
  const navigate = useNavigate()
  const path = useLocation()
  const {currentUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const {theme} = useSelector(state=>state.theme)

  const handleSignOut = async() =>{
    try {
        const res = await fetch(`/api/user/signout`, {
            method : 'POST',

        })
        const data = await res.json()
        if(!res.ok){
            console.log(data.message);
        }else{
            dispatch(signOutSuccess())
            navigate('/')
        }
    } catch (error) {
        console.log(error.message);
    }
  }


  

  return (
    <Navbar fluid={true} className="border-b">
      <Link to="/"className="self-center whitespace-nowrap font-semibold dark:text-white text-md sm:text-2xl">
      <span className="px-2 py-1 text-green-500 text-shadow-xl rounded">
        Shadow
      </span>
        Blog
      </Link>

      {/* middle part of the navigatiobar */}
      <div className="flex justify-center gap-4">
          <form className="relative hidden sm:inline">
            <TextInput 
              type="text"
              placeholder="Search...."
              className=" hidden sm:inline"
            />
            <AiOutlineSearch className="absolute right-2 top-3 text-gray-500 text-xl"/>
          </form>
          <div className="sm:flex justify-center items-center gap-6 hidden font-normal ">
            <Link to='/'  className="hover:text-green-500 " active={path==='/'}>Home</Link>
            <Link to='/about'  className="hover:text-green-500 " active={path==='/about'}>About</Link>
            <Link to='/projects'  className="hover:text-green-500 " active={path==='/projects'}>Projects</Link>
          </div>
      </div>
      <Button className="w-10 h-10 flex justify-center items-center sm:hidden" color="gray">
        <AiOutlineSearch size={20} /> 
      </Button>
      

      <div className="flex justify-between items-center gap-2 sm:order-2">
        <Button className="w-10 h-10 flex justify-center items-center" 
          color="gray"
          pill 
          onClick={()=>dispatch(toggleTheme())}>
            {
              theme === 'light' ?  <FaMoon  size={20}/>:<FaSun size={20}/> 
            }
          
        </Button>
        {
          currentUser ?
           (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                alt={currentUser.username}
                img={currentUser.profilePicture }
                rounded
              />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to='/dashboard?tab=profile'>
                <Dropdown.Item icon={FaUserCircle}>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider/>
              <Dropdown.Item icon={FaSignOutAlt} onClick={handleSignOut}>Logout</Dropdown.Item>
            </Dropdown>
           ) 
           :( 
            <Link to='/sign-up'>
                <Button className="bg-green-500 hover:bg-green-600 text-sm" >Sign UP</Button>
            </Link>
           )
        }
       
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={'div'} className={path === '/' ? 'text-green-500' : 'text-gray-500'}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={'div'} className={path === '/about' ? 'text-green-500' : 'text-gray-500'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link as={'div'} className={path === '/projects' ? 'text-green-500' : 'text-gray-500'}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
