import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import DashboardPage from "./pages/DashboardPage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/sign-up" element={<SignUpPage />}/>
        <Route path="/sign-in" element={<SignInPage />}/>
        <Route path="/dashboard" element={<DashboardPage />}/>
      </Routes>
    </>
  )
}

export default App
