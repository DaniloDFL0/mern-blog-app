import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"
import { useSelector } from "react-redux"

const Header = () => {
    const { currentUser } = useSelector((state) => state.user)

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
                <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
                    <FaMoon />
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
                        <Dropdown.Item>Sign Out</Dropdown.Item>
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