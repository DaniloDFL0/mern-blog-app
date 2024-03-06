import { Button, Modal, Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { FaCheck, FaTimes } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`api/users/getusers`)
        const data = await res.json()

        setUsers(data.users)
        if(data.users.length < 9) {
          setShowMore(false)
        }
        
      } catch(error) {
        console.log(error)
      }
    }

    if(currentUser.isAdmin) {
      fetchUsers()
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = users.length
    try {
      const res = await fetch(`/api/users/getusers?startIndex=${startIndex}`)
      const data = await res.json()

      if(res.ok) {
        setUsers((prevUsers) => [...prevUsers, ...data.users])
        if(data.users.length < 9) {
          setShowMore(false)
        }
      }
      
    } catch(error) {
      console.log(error)
    }
  }

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/users/delete/${userIdToDelete}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()

      if(res.ok) {
        setUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser._id !== userIdToDelete))
        setOpenModal(false)
      } else {
        console.log(data.message)
      }
      
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body key={user._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <img src={user.profilePicture} alt={user.username} className="w-12 h-12 rounded-full object-cover bg-gray-500"/>
                  </Table.Cell>
                  <Table.Cell>
                    {user.username}
                  </Table.Cell>
                  <Table.Cell>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)}
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setOpenModal(true)
                      setUserIdToDelete(user._id)
                    }} className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show more</button>
          )}
        </>
      ) : (
        <div>You have no posts yet</div>
      )}
      <Modal size={"md"} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Delete User</Modal.Header>
        <Modal.Body>
            <div className="text-2xl text-center">Do you want to delete this account?</div>
        </Modal.Body>
        <Modal.Footer>
            <Button color="gray" onClick={() => setOpenModal(false)}>No</Button>
            <Button onClick={handleDeleteUser} color="failure" >
                Yes, delete user.
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DashUsers