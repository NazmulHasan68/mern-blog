import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className=" min-h-screen mt-20">
     <div className="flex p-3 max-w-3xl gap-4 mx-auto flex-col sm:flex-row sm:items-center">
      {/* left side */}
      <div className="flex-1">
        <Link to="/"className="self-center whitespace-nowrap font-bold dark:text-white text-3xl sm:text-4xl ">
        <span className="px-2 py-1 text-green-500 text-shadow-xl rounded ">
          Shadow
        </span>
          Blog
      </Link>
      <p className="text-sm mt-5">This is demo project. you can sign up with your email and password or with google</p>
      </div>
        {/* Right side */}
      <div className="mt-4 sm:mt-0 flex-1">
        <form className="flex flex-col gap-4">
          <div className="">
            <Label value='Your username'/>
            <TextInput
              type="text"
              placeholder="Username"
              id="username"
            />
          </div>
          <div className="">
            <Label value='Your Email'/>
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
            />
          </div>
          <div className="">
            <Label value='Your Password'/>
            <TextInput
              type="password"
              placeholder="Password"
              id="password"
            />
          </div>
          <Button gradientDuoTone="greenToBlue" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-3">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-green-600  font-semibold">Sign In</Link>
        </div>
      </div>
     </div>
    </div>
  )
}
