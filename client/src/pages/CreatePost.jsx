import { Button, FileInput, Select, TextInput } from "flowbite-react"
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
    const [value , setValue] = useState()
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-4 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type="text " placeholder="Titile" required id="title" className="flex-1"/>
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
            <FileInput type='file' accept="image/*" className=""/>
            <Button type="button" gradientDuoTone="greenToBlue" size="sm" outline>Upload image</Button>
        </div>
        <ReactQuill theme="snow" value={value} onChange={setValue} className="h-52 mb-4" required/>;
        <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
      </form>
    </div>
  )
}

export default CreatePost
