import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../redux/theme/themeSlice"
import { signoutSuccess } from "../redux/user/userSlice"

const Header = () => {
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useSelector((state) => state.theme)
    const dispatch = useDispatch()

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
        <Navbar className="border border-b-1 text-black dark:text-white">
            <Link to={"/"}>
                <div className="text-2xl">BlogApp</div>
            </Link>
            <form>
                <TextInput 
                    type="text"
                    placeholder="Search"
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                />
            </form>
            <Button className="w-12 h-10 hidden max-lg:inline rounded-full" color="gray" pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex items-center gap-4 md:order-2">
                <Button onClick={() => dispatch(toggleTheme())} className="w-12 h-10 hidden sm:inline" color="gray" pill>
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </Button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={<Avatar img={currentUser.profilePicture} rounded/>}>
                        <Dropdown.Header>
                            <span className="block text-sm">@{currentUser.username}</span>
                            <span className="block text-sm font-medium truncate">@{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={"/dashboard?tab=profile"}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to={"/sign-in"}>
                        <Button gradientDuoTone={"purpleToBlue"} outline>
                            Sign In
                        </Button>
                    </Link>
                )}
            </div>
        </Navbar>
    )
}

export default Header