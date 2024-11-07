import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"

function UpdatePost() {
    const { currentUser } = useSelector((state) => state.user);
    const [file, setFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '', category: '', image: '' });
    const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
    const navigate = useNavigate();
    const { postId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getpost?postId=${postId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store, no-cache, must-revalidate',
                    }
                });
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    return;
                }
                setFormData(data.posts[0]);
            } catch (error) {
                console.error(error); 
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchPost();
    }, [postId]);

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
            setImageFileUploadingError('Could not upload image. File must be less than 2MB.',error);
            setImageFileUrl(null);
            setFile(null);
        }
    };

    
    const submitFormData = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                navigate(`/post/${data.slug}`);
                alert("Update is successsfull")
            } else {
                console.error('Error:', data.message || 'Unknown error');
                alert('Error while updating post: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
            alert('Error while updating post.');
        }
    };

    if (loading) return <div>Loading...</div>; // Loading state UI

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-4 font-semibold">Update Post</h1>
            <form className="flex flex-col gap-4" onSubmit={submitFormData}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        required
                        id="title"
                        value={formData.title}
                        className="flex-1"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Select
                        required
                        value={formData.category}
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

                {formData?.image && (
                    <img
                        src={formData?.image}
                        alt="Post image"
                        className="w-full h-72 mb-4 object-cover"
                    />
                )}

                <ReactQuill
                    theme="snow"
                    className="h-60 mb-4"
                    required
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                />

                <Button type="submit" gradientDuoTone="purpleToPink">
                    Update Post
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

export default UpdatePost;
