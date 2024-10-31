import { Button, Navbar, TextInput } from "flowbite-react";
import { Link , useLocation} from "react-router-dom";

//icons
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa6";

export default function Header() {
  const path = useLocation()
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
          <div className="sm:flex justify-center items-center gap-6 hidden font-normal text-gray-500">
            <Link to='/'  className="hover:text-green-500 " active={path==='/'}>Home</Link>
            <Link to='/about'  className="hover:text-green-500 " active={path==='/about'}>About</Link>
            <Link to='/projects'  className="hover:text-green-500 " active={path==='/projects'}>Projects</Link>
          </div>
      </div>
      <Button className="w-10 h-10 flex justify-center items-center sm:hidden" color="gray">
        <AiOutlineSearch size={20} /> 
      </Button>
      

      <div className="flex justify-between items-center gap-2 sm:order-2">
        <Button className="w-10 h-10 flex justify-center items-center" color="gray">
          <FaMoon className="text-gray-800" size={20}/>
        </Button>
        <Link to='/sign-up'>
            <Button className="bg-green-500 hover:bg-green-600 text-sm">Sign UP</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to='/'>Home</Link>
          </Navbar.Link >
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/projects'} as={'div'}>
            <Link to='/projects'>Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  );
}
