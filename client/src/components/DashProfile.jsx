import { Button, TextInput } from "flowbite-react"
import { useSelector } from "react-redux"

function DashProfile() {
    const {currentUser} = useSelector(state => state.user)

  return (
    <div className="w-full mx-auto p-3 ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1> 
      <form className="flex flex-col">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img src={currentUser.profilePicture} 
                alt="user image"
                className="rounded-full bottom-2 w-full h-full border-8 border-sky-500 object-cover"
            />
        </div>
       <div className="flex flex-col gap-2 mt-4 w-full sm:max-w-md mx-auto">
            <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}/>
            <TextInput type="text" id="email" placeholder="email" defaultValue={currentUser.email}/>
            <TextInput type="text" id="password" placeholder="password" />
            <Button type="submit" gradientDuoTone="greenToBlue">
                Update
            </Button>
       </div>
      </form>
      <div className="text-red-500 flex justify-between mt-4 w-full sm:max-w-md mx-auto">
        <span className=" cursor-pointer">Delete Account</span>
        <span className=" cursor-pointer">Logout</span>
      </div>
    </div>
  )
}

export default DashProfile
