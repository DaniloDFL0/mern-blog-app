import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-slate-300 rounded-lg w-[350px] max-lg:w-[280px] p-4">
        <div className="text-2xl text-center">Sign Up</div>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-1">
              <Label className="text-lg font-medium">Username</Label>
            </div>
            <TextInput 
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <div className="mb-1">
              <Label className="text-lg font-medium">Email Address</Label>
            </div>
            <TextInput 
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div>
            <div className="mb-1">
              <Label className="text-lg font-medium">Password</Label>
            </div>
            <TextInput 
              type="password"
              placeholder="Password"
            />
          </div>
          <Button gradientDuoTone={"purpleToPink"}>
            Sign Up
          </Button>
        </form>
        <div className="hover:text-pink-500 cursor-pointer hover:underline mt-2">
          <Link to={"/sign-in"}>Already have an account? Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage