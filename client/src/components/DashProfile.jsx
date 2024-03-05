import { Alert, Button, TextInput, Modal } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import  { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase/firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutSuccess, updateStart, updateUserFailure, updateUserSuccess } from "../redux/user/userSlice"
import { toast } from "react-toastify"

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [updateUser, setUpdateUser] = useState(null)
    const [inputs, setInputs] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: currentUser.password
    })
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const imageRef = useRef(null)
    const dispatch = useDispatch()

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
                setInputs({ ...inputs, profilePicture: downloadURL })
            })
        })
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        try {
            dispatch(updateStart())
            const res = await fetch(`/api/users/update/${currentUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            })
            const data = await res.json()

            if(!res.ok) {
                dispatch(updateUserFailure(data.message))
                return
            }

            dispatch(updateUserSuccess(data))
            setUpdateUser("Profile is updated successfully.")

        } catch(error) {
            dispatch(updateUserFailure(error.message))
        }
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/users/delete/${currentUser._id}`, {
                method: "DELETE",
                headers: { "Content-Type" : "application/json" }
            })
            const data = await res.json()

            if(!res.ok) {
                dispatch(deleteUserFailure(data.message))
                return
            }

            dispatch(deleteUserSuccess())
            toast.success("User is deleted successfully.")
            
        } catch(error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

    const handleSignout = async () => {
        try {
            const res = await fetch("/api/auth/signout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()

            if(!res.ok) {
                console.log(data.message)
            }

            dispatch(signoutSuccess())
            toast.success("User has been signed out successfully.")
            
        } catch(error) {
            console.log(error.message)
        }
    }

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <div className="text-2xl text-center mb-3">Profile</div>
            <form onSubmit={handleUpdateUser} className="flex flex-col gap-4">
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
                    value={inputs.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
                <TextInput 
                    type="text"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                />
                <TextInput 
                    type="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
                    Update Profile
                </Button>
            </form>
            {updateUser && (
                <Alert color={"success"} className="my-2">
                    {updateUser}
                </Alert>
            )}
            <div className="text-red-500 flex justify-between items-center mt-3">
                <span onClick={() => setOpenModal(true)} className="cursor-pointer">Delete Account</span>
                <span onClick={handleSignout} className="cursor-pointer">Sign Out</span>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Delete Account</Modal.Header>
                <Modal.Body>
                    <div className="text-2xl text-center">Do you want to delete your account?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal(false)}>No</Button>
                    <Button onClick={handleDeleteUser} color="failure" >
                        Yes, delete account.
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DashProfile