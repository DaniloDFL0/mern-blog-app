import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import DashboardPage from "./pages/DashboardPage"
import HeaderLayout from "./layouts/HeaderLayout"
import { useSelector } from "react-redux"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePostPage from "./pages/CreatePostPage"

const App = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className="dark:bg-blue-950 min-h-screen">
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/create-post" element={currentUser?.isAdmin === true ? <CreatePostPage /> : <Navigate to={"/sign-in"}/>}/>
          <Route path="/sign-in" element={<SignInPage />}/>
          <Route path="/sign-up" element={<SignUpPage />}/>
          <Route path="/dashboard" element={currentUser ? <DashboardPage /> : <Navigate to={"/sign-in"}/>}/>
        </Route>
      </Routes>
      <ToastContainer autoClose={3000}/>
    </div>
  )
}

export default App
