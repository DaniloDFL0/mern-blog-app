import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useState } from "react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { app } from "../firebase/firebase"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useNavigate } from "react-router-dom"

const CreatePostPage = () => {
    const [file, setFile] = useState(null)
    const [imgUploadProgress, setImgUploadProgress] = useState(null)
    const [imgUploadError, setImgUploadError] = useState(null)
    const [publishError, setPublishError] = useState(null)
    const [inputs, setInputs] = useState({
        title: "",
        content: ""
    })
    const navigate = useNavigate()

    const handleUploadImg = async () => {
        try {
            if(!file) {
                setImgUploadError("Please select an image")
                return
            }

            setImgUploadError(null)
            const storage = getStorage(app)
            const filename = new Date().getTime() + "-" + file.name
            const storageRef = ref(storage, filename)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImgUploadProgress(progress.toFixed(0))
            }, (error) => {
                setImgUploadError("Image upload failed.")
                setImgUploadProgress(null)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUploadError(null)
                    setImgUploadProgress(null)
                    setInputs({ ...inputs, image: downloadURL })
                })
            })
            
        } catch(error) {
            setImgUploadError("Image upload failed")
            setImgUploadProgress(null)
            console.log(error)
        }
    }

    const handleCreatePost = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            })
            const data = await res.json()

            if(!res.ok) {
                setPublishError(data.message)
                return
            }

            navigate(`/post/${data.slug}`)

        } catch(error) {
            
        }
    }

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <div className="text-center text-3xl my-7 font-semibold">Create a post</div>
            <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput 
                        type="text"
                        placeholder="Title"
                        required
                        className="flex-1"
                        value={inputs.title}
                        onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                    />
                    <Select onChange={(e) => setInputs({ ...inputs, category: e.target.value })}>
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">Javascript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])}/>
                    <Button onClick={handleUploadImg} disabled={imgUploadProgress} type="button" gradientDuoTone={"purpleToBlue"} size={"sm"} outline>
                        {imgUploadProgress ? (
                            <div className="w-16 h-16">
                                <CircularProgressbar value={imgUploadProgress} text={`${imgUploadProgress || 0}%`}/>
                            </div>
                        ) : (
                            "Upload Image"
                        )}
                    </Button>
                </div>
                {imgUploadError && (
                    <Alert color={"failure"}>
                        {imgUploadError}
                    </Alert>
                )}
                {inputs.image && (
                    <img 
                        src={inputs.image}
                        className="w-full h-72 object-cover"
                    />
                )}
                <ReactQuill onChange={(value) => setInputs({ ...inputs, content: value})} theme="snow" placeholder="Write something" className="h-72 mb-12" required/>
                <Button type="submit" gradientDuoTone={"purpleToPink"}>Publish</Button>
                {publishError && (
                    <Alert color={"failure"} className="mt-5">
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    )
}

export default CreatePostPage