import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import  axios  from 'axios'

function CreatePost() {
    const [value , setValue] = useState()
    const [file, setfile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [formData, setformData] = useState({})
    const [imageFileUploadingError, setimageFileUploadingError] = useState(null)
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;

    const handleUploadImage = async()=>{
      if (!file) return alert("Please select an image to upload.");
      if (file.size > 2 * 1024 * 1024) {
          alert("File size exceeds 2MB. Please select a smaller file.");
          return;
        }
      const formData = new FormData();
      formData.append("file", file); 
      formData.append("upload_preset", "MernBlog");
      formData.append("folder", "mernblog")
      
      try {
          const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
          setImageFileUrl(res.data.secure_url)
          setformData({...formData, profilePicture:res.data.secure_url})
      } catch (error) {
          setimageFileUploadingError('Could not upload image (File must be less then 2MB) ',error)
          setImageFileUrl(null)
          setfile(null)
      }
    }

    const SubmitFromData = async(e)=>{
      e.preventDefault()
    }


  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-4 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4 " >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type="text " placeholder="Titile" required id="title" className="flex-1" />
            <Select >
                <option value='uuncategorized'>Select a Category</option>
                <option value='Yamaha'>Yamaha Motors</option>
                <option value='Royal'>Royal Enfield</option>
                <option value='TVS'>TVS Motor</option>
                <option value='Bajaj'>Bajaj Auto</option>
                <option value='Honda'>Honda Motorcycle</option>
                <option value='Kawasaki'>Kawasaki</option>
                <option value='KTM'>KTM</option>
            </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput type='file' accept="image/*" onChange={(e)=>setfile(e.target.files[0])}/>
            <Button type="button" gradientDuoTone="greenToBlue" size="sm" outline onClick={handleUploadImage}>Upload image</Button>
        </div>
        {
          imageFileUrl && <img src={imageFileUrl} alt="Post image" className="w-full h-72 mb-4 object-cover"/>
        }
        <ReactQuill theme="snow" value={value} onChange={setValue} className="h-52 mb-4" required/>;
        <Button type="submit" gradientDuoTone="purpleToPink" onClick={SubmitFromData}>Publish</Button>
      </form>
        {
          imageFileUploadingError && <Alert color="failure" size='sm' className="w-full max-w-3xl mx-auto">{imageFileUploadingError}</Alert>
        }
    </div>
  )
}

export default CreatePost
