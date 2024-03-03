import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import  { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase/firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const imageRef = useRef(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if(file) {
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        if(imageFile) {
            uploadImage()
        }
    }, [imageFile])

    const uploadImage = async () => {
        setImageFileUploadError(null)
        const storage = getStorage(app)
        const filename = new Date().getTime() + imageFile.name
        const storageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)
        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setImageFileUploadProgress(progress.toFixed(0))
        }, (error) => {
            setImageFileUploadError("Could not upload image. File must be less than 2MB.")
            setImageFileUploadProgress(null)
            setImageFile(null)
            setImageFileUrl(null)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL)
            })
        })
    }

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <div className="text-2xl text-center mb-3">Profile</div>
            <form className="flex flex-col gap-4">
                <input type="file" hidden accept="image/*" ref={imageRef} onChange={handleImageChange}/>
                <div onClick={() => imageRef.current.click()} className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                    {imageFileUploadProgress && (
                        <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5} styles={{ root: { width: "100%", height: "100%", position: "absolute", top: 0, left: 0}, path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`}}}/>
                    )}
                    <img className={`rounded-full ${imageFileUploadProgress && imageFileUploadError < 100 && "opacity-60"} w-full h-full object-cover border-8 border-slate-200`} src={imageFileUrl || currentUser.profilePicture} alt="user"/>
                </div>
                {imageFileUploadError && (
                    <Alert color={"failure"}>
                        {imageFileUploadError}
                    </Alert>
                )}
                <TextInput 
                    type="text"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                />
                <TextInput 
                    type="text"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                />
                <TextInput 
                    type="password"
                    placeholder="Password"
                />
                <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
                    Update Profile
                </Button>
            </form>
            <div className="text-red-500 flex justify-between items-center mt-3">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>
            </div>
        </div>
    )
}

export default DashProfile