import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import DashboardPage from "./pages/DashboardPage"
import HeaderLayout from "./layouts/HeaderLayout"
import { useSelector } from "react-redux"

const App = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className="dark:bg-blue-950 min-h-screen">
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/sign-in" element={<SignInPage />}/>
          <Route path="/sign-up" element={<SignUpPage />}/>
          <Route path="/dashboard" element={currentUser ? <DashboardPage /> : <Navigate to={"/sign-in"}/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
