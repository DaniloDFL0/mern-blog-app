import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import DashboardPage from "./pages/DashboardPage"
import HeaderLayout from "./layouts/HeaderLayout"

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/sign-up" element={<SignUpPage />}/>
          <Route path="/sign-in" element={<SignInPage />}/>
          <Route path="/dashboard" element={<DashboardPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
