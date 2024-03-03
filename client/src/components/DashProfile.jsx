import { Button, TextInput } from "flowbite-react"
import { useSelector } from "react-redux"

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <div className="text-2xl text-center mb-3">Profile</div>
            <form className="flex flex-col gap-4">
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                    <img className="rounded-full w-full h-full object-cover border-8 border-slate-200" src={currentUser.profilePicture} alt="user"/>
                </div>
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