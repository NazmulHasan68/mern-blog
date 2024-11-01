import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {

  const [formData, setFormData] = useState({})
  const [errorMessage , setErrorMessage] = useState()
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]:e.target.value.trim()})
  }

  const handleSumit = async(e)=>{
    e.preventDefault()
    if(!formData.username ||!formData.email ||!formData.password){
      return setErrorMessage('Please fillout all field')
    }
    try {
      setloading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(formData),
      })
      const data = await res.json();
     if(data.success === false){
      setErrorMessage(data.message)
     }
     setloading(false)
     navigate('/sign-in')

    } catch (error) {
      console.log(error);
      setloading(false)
    }
  }

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
      <p className="text-sm mt-5 ">This is demo project. you can sign up with your email and password or with google</p>
      </div>
        {/* Right side */}
      <div className="mt-4 sm:mt-0 flex-1">
        <form className="flex flex-col gap-4" onSubmit={handleSumit}>
          <div className="">
            <Label value='Your username'/>
            <TextInput
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="">
            <Label value='Your Email'/>
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="">
            <Label value='Your Password'/>
            <TextInput
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <Button gradientDuoTone="greenToBlue" type="submit" disabled={loading}>
            {
              loading ? (<>
                <Spinner size="sm"/>
                <span className="pl-3">Loading...</span>
              </>) :  'Sign Up'
            }
          </Button>
          <OAuth/>
        </form>
        <div className="flex gap-2 text-sm mt-3">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-green-600  font-semibold">Sign In</Link>
        </div>
        {
            errorMessage && (
              <Alert className="mt-1" color="failure">
                {errorMessage}
              </Alert>
            )
          }
      </div>
     </div>
    </div>
  )
}
