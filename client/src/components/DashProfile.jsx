import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import  axios  from 'axios'

function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadingError, setimageFileUploadingError] = useState(null)

    const filePickerRef = useRef()
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;

    const handleImageChanage = (e) =>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])
    
    const uploadImage = async()=>{
        if (!imageFile) return alert("Please select an image to upload.");
        if (imageFile.size > 2 * 1024 * 1024) {
            alert("File size exceeds 2MB. Please select a smaller file.");
            return;
          }
        const formData = new FormData();
        formData.append("file", imageFile); 
        formData.append("upload_preset", "MernBlog");
        formData.append("folder", "mernblog")
        
        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
            setImageFileUrl(res.data.secure_url)
        } catch (error) {
            setimageFileUploadingError('Could not upload image (File must be less then 2MB) ')
            setImageFileUrl(null)
            setImageFile(null)
        }
    }

  return (
    <div className="w-full mx-auto p-3 ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1> 
      <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChanage} ref={filePickerRef} className=" hidden"/>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>
            <img src={imageFileUrl || currentUser.profilePicture} 
                alt="user image"
                className="rounded-full bottom-2 w-full h-full border-8 border-green-500 object-cover"
                
            />
        </div>
        {
            imageFileUploadingError ? (<Alert color="failure" className="w-full sm:max-w-md mx-auto">{imageFileUploadingError}</Alert>):(null)
        }
       <div className="flex flex-col gap-2 mt-4 w-full sm:max-w-md mx-auto">
            <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}/>
            <TextInput type="text" id="email" placeholder="email" defaultValue={currentUser.email}/>
            <TextInput type="text" id="password" placeholder="password" />
            <Button type="submit" gradientDuoTone="greenToBlue">
                Update
            </Button>
       </div>
      </form>
      <div className="text-red-500 flex justify-between my-4 w-full sm:max-w-md mx-auto">
        <span className=" cursor-pointer">Delete Account</span>
        <span className=" cursor-pointer">Logout</span>
      </div>
    </div>
  )
}

export default DashProfile
