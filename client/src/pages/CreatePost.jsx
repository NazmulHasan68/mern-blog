import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
    const navigae = useNavigate()

    const handleUploadImage = async () => {
      if (!file) return alert("Please select an image to upload.");
      if (file.size > 2 * 1024 * 1024) {
          alert("File size exceeds 2MB. Please select a smaller file.");
          return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "MernBlog");
      formData.append("folder", "mernblog");

      try {
          const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
          setImageFileUrl(res.data.secure_url);
          setFormData((prevFormData) => ({ ...prevFormData, image: res.data.secure_url }));
      } catch (error) {
          setImageFileUploadingError('Could not upload image (File must be less than 2MB).',error);
          setImageFileUrl(null);
          setFile(null);
      }
    };

    const submitFormData = async (e) => {
      e.preventDefault();

      if (!formData.title || !formData.content || !formData.category || !formData.image) {
        return alert("Please fill all the required fields including the image.");
      }
      try {
        const response = await fetch(`/api/post/create`, {
          method:"POST",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        });
        const data = await response.json()
        console.log(data);
        
        if (data) {
          navigae(`/post/${data.post.slug}`)
          alert('Post created successfully!');
        }
      } catch (error) {
        console.error(error);
        alert('Error while creating post.');
      }
    };

    console.log(formData);

    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-4 font-semibold">Create a post</h1>
        <form className="flex flex-col gap-4" onSubmit={submitFormData}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput 
              type="text" 
              placeholder="Title" 
              required 
              id="title" 
              className="flex-1" 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            />
            <Select 
              required 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value='uncategorized'>Select a Category</option>
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
            <FileInput 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files[0])} 
            />
            <Button 
              type="button" 
              gradientDuoTone="greenToBlue" 
              size="sm" 
              outline 
              onClick={handleUploadImage}
            >
              Upload image
            </Button>
          </div>

          {imageFileUrl && (
            <img 
              src={imageFileUrl} 
              alt="Post image" 
              className="w-full h-72 mb-4 object-cover" 
            />
          )}

          <ReactQuill 
            theme="snow" 
            className="h-52 mb-4" 
            required 
            onChange={(value) => setFormData({ ...formData, content: value })} 
          />

          <Button type="submit" gradientDuoTone="purpleToPink">
            Publish
          </Button>
        </form>
        
        {imageFileUploadingError && (
          <Alert color="failure" size="sm" className="w-full max-w-3xl mx-auto">
            {imageFileUploadingError}
          </Alert>
        )}
      </div>
    );
}

export default CreatePost;

