import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar"
import DashProfile from "../components/DashProfile"
import DashPosts from "../components/DashPosts"
import DashUsers from "../components/DashUsers"

const DashboardPage = () => {
  const location = useLocation()
  const [tab, setTab] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")
    if(tabFromUrl) {
      setTab(tabFromUrl)
    }

  }, [location.search])

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
    </div>
  )
}

export default DashboardPage