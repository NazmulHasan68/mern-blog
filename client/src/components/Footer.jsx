import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";


import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function FooterComponent() {
  return (
    <Footer className="border border-t-4 border-teal-500">
      <div className="w-full max-w-7xl mx-auto py-2">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 mt-4 mx-auto px-5 items-start">
          <div className="mt-0">
            <Link to="/"className="self-center whitespace-nowrap font-semibold dark:text-white text-xl sm:text-2xl">
              <span className=" py-1 text-green-500 text-shadow-xl rounded">
                Shadow
              </span>
                Blog
            </Link>
            <p className="text-gray-500 text-sm mt-4">Lorem ipsum dolor sit amet consectetur </p>
          </div>
          <div>
            <Footer.Title title="About"/>
            <Footer.LinkGroup col>
              <Footer.Link href="https://www.100jsprojects.com" target="_blank" rel="noopener noreferrer">
                100 js Projects
              </Footer.Link>
              <Footer.Link href="/about" target="_blank" rel="noopener noreferrer">
                Shadow Blog
              </Footer.Link>
              <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                Watch More
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Follow us"/>
            <Footer.LinkGroup col>
              <Footer.Link href="https://github.com/NazmulHasan68" target="_blank" rel="noopener noreferrer">
                Github
              </Footer.Link>
              <Footer.Link href="https://github.com/NazmulHasan68" target="_blank" rel="noopener noreferrer">
                Discord
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="LEGAL"/>
            <Footer.LinkGroup col>
              <Footer.Link href="https://github.com/NazmulHasan68" target="_blank" rel="noopener noreferrer">
                Setting
              </Footer.Link>
              <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full flex sm:items-center sm:justify-between justify-center gap-10 border-t my-4 py-5 mx-auto">
          <Footer.Copyright href="#" by="shadow blog" year={new Date().getFullYear()}/>
          <div className="flex gap-4">
            <Footer.Icon href="#" icon={FaFacebook}/>
            <Footer.Icon href="#" icon={FaInstagramSquare}/>
            <Footer.Icon href="#" icon={FaYoutube}/>
            <Footer.Icon href="#" icon={FaLinkedin}/>
            <Footer.Icon href="#" icon={FaGithub}/>
          </div>
        </div>
      </div>
    </Footer>
  )
}
