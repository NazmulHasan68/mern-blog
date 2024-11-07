import { Alert, Button, Modal, TextInput } from "flowbite-react"
import { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux"
import  axios  from 'axios'
import { updateStart, updateFailure, updateSuccess ,deleteUserStart, deleteUserSuccess, deleteUserfailure, signOutSuccess} from "../redux/userSlice/userSlice"
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashProfile() {
    const {currentUser, error, loading} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadingError, setimageFileUploadingError] = useState(null)
    const [update, setupdate] = useState('')
    const [updateError, setupdateError] = useState('')
    const [ showModel, setShowModel] = useState(false)
    const [formData, setformData] = useState({})
    const dispatch = useDispatch()

    const filePickerRef = useRef()
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;

    const handleImageChanage = (e) =>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    
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
            setformData({...formData, profilePicture:res.data.secure_url})
        } catch (error) {
            setimageFileUploadingError('Could not upload image (File must be less then 2MB) ',error)
            setImageFileUrl(null)
            setImageFile(null)
        }
    }

    const handleChange = (e) =>{
        setformData({...formData, [e.target.id]:e.target.value})
    }

    const handleSubmit =async(e)=>{
        e.preventDefault()
        if(imageFile){
            uploadImage()
        }
        if(Object.keys(formData).length === 0){
            return
        }
        try {
            dispatch(updateStart());
        
            const response = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        
            const data = await response.json(); 
        
            if (!response.ok) {
                dispatch(updateFailure(data.message)); 
                setupdateError('Updated failed')
            } else {
                dispatch(updateSuccess(data)); 
                setupdate('User updated successfully')
            }
        } catch (error) {
            dispatch(updateFailure(error.message)); 
        }
    }

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
            }
        } catch (error) {
            console.error(error); 
        }
    }

    const handleDeleteUser = async()=>{
        setShowModel(false)
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`,
                {method : 'DELETE'}
            )
            const data = await res.json()
            if(!res.ok){
                dispatch(deleteUserfailure(data.message))
            }else{
                dispatch(deleteUserSuccess(data))
            }
        } catch (error) {
            dispatch(deleteUserfailure(error.message))
        }
    }

  return (
    <div className="w-full mx-auto p-3 ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1> 
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            <TextInput 
                type="text" 
                id="username" 
                placeholder="username" 
                defaultValue={currentUser.username} 
                onChange={handleChange}
            />
            <TextInput 
                type="text" 
                id="email" 
                placeholder="email" 
                defaultValue={currentUser.email} 
                onChange={handleChange}
            />
            <TextInput 
                type="text" 
                id="password" 
                placeholder="password"  
                onChange={handleChange}
            />
            <Button type="submit" gradientDuoTone="greenToBlue" disabled={loading}>
                {loading? 'Loading...' : 'Update'}
            </Button>
            {
                currentUser.isAdmin  && (
                    <Link to='/dashboard/create-post'>
                        <Button
                            type="button"
                            outline gradientDuoTone="greenToBlue"
                            className="w-full hover:bg-green-700"
                        >
                            create a post
                        </Button>
                    </Link>
                    
                )
            }
       </div>
      </form>
      <div className="text-red-500 flex justify-between my-4 w-full sm:max-w-md mx-auto">
        <span className=" cursor-pointer" onClick={()=>setShowModel(true)}>Delete Account</span>
        <span className=" cursor-pointer" onClick={handleSignOut}>Logout</span>
      </div>
      {
        update && (
            <Alert color="success" className="w-full sm:max-w-md mx-auto">
                {update}
            </Alert>
        )
      }
      {
        updateError && (
            <Alert color="failure" className="w-full sm:max-w-md mx-auto">
                {updateError}
            </Alert>
        )
      }
      {
        error && (
            <Alert color="failure" className="w-full sm:max-w-md mx-auto">
                {error}
            </Alert>
        )
      }
       <Modal show={showModel} size="md" onClose={() => setShowModel(false)} popup 
         position="center" className="flex items-center justify-center h-screen bg-slate-500/55 " >
        <Modal.Header  />
        <Modal.Body >
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete user Id
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDeleteUser(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashProfile
