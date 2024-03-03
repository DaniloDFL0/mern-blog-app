import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { HiInformationCircle } from 'react-icons/hi'

const SignUpPage = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    if(!inputs.username.trim() || !inputs.email.trim() || !inputs.password.trim()) {
      setErrorMessage("Please fill all fields.")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      })
      const data = await res.json()

      if(data.success === false) {
        setErrorMessage(data.message)
        return
      }

      navigate("/sign-in")

    } catch(error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex mt-32 justify-center">
      <div className="border border-slate-300 rounded-lg w-[350px] max-lg:w-[280px] p-4">
        <div className="text-2xl text-center">Sign Up</div>
        {errorMessage && (
          <Alert color={"failure"} icon={HiInformationCircle} className="my-3">
            <span className="text-sm font-medium">{errorMessage}</span>
          </Alert>
        )}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div>
            <div className="mb-1">
              <Label className="text-lg font-medium">Username</Label>
            </div>
            <TextInput 
              type="text"
              placeholder="Username"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value})}
            />
          </div>
          <div>
            <div className="mb-1">
              <Label className="text-lg font-medium">Email Address</Label>
            </div>
            <TextInput 
              type="text"
              placeholder="Email Address"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value})}
            />
          </div>
          <div>
            <div className="mb-1">
              <Label className="text-lg font-medium">Password</Label>
            </div>
            <TextInput 
              type="password"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value})}
            />
          </div>
          <Button type="submit" disabled={isLoading} gradientDuoTone={"purpleToPink"}>
            {isLoading ? (
              <>
                <Spinner />
                <span>Loading...</span>
              </>
            ) : "Sign Up"}
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