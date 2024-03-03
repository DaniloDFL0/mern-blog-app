import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { HiInformationCircle } from "react-icons/hi"
import { Link } from "react-router-dom"
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import OAuth from "../components/OAuth"

const SignInPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { isLoading, error: errorMessage } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleSignIn = async (e) => {
    e.preventDefault()
    if(!email.trim() || !password.trim()) {
      dispatch(signInFailure("Please fill all fields."))
      return
    }
    dispatch(signInStart())
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if(data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }

      dispatch(signInSuccess(data))
      
    } catch(error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="flex mt-32 justify-center">
      <div className="border border-slate-300 rounded-lg w-[350px] max-lg:w-[280px] p-4">
        <div className="text-2xl text-center">Sign In</div>
        {errorMessage && (
          <Alert color={"failure"} icon={HiInformationCircle} className="my-3">
            <span className="text-sm font-medium">{errorMessage}</span>
          </Alert>
        )}
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <div>
            <div className="mb-1">
              <Label className="text-lg font-medium">Email Address</Label>
            </div>
            <TextInput 
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-1">
              <Label className="text-lg font-medium">Password</Label>
            </div>
            <TextInput 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading} gradientDuoTone={"purpleToPink"}>
            {isLoading ? (
              <>
                <Spinner />
                <span>Loading...</span>
              </>
            ) : "Sign In"}
          </Button>
          <OAuth />
        </form>
        <div className="hover:text-pink-500 cursor-pointer hover:underline mt-2">
          <Link to={"/sign-up"}>Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default SignInPage