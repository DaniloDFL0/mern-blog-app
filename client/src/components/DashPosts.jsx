import { Button, Modal, Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`api/posts/getposts?userId=${currentUser._id}`)
        const data = await res.json()

        setUserPosts(data.posts)
        if(data.posts.length < 9) {
          setShowMore(false)
        }
        
      } catch(error) {
        console.log(error)
      }
    }

    if(currentUser.isAdmin) {
      fetchPosts()
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length
    try {
      const res = await fetch(`/api/posts/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()

      if(res.ok) {
        setUserPosts((prevPosts) => [...prevPosts, ...data.posts])
        if(data.posts.length < 9) {
          setShowMore(false)
        }
      }
      
    } catch(error) {
      console.log(error)
    }
  }

  const handleDeletePost = async () => {
    try {
      const res = await fetch(`/api/posts/delete/${postIdToDelete}/${currentUser._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()

      if(res.ok) {
        setUserPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost._id !== postIdToDelete))
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
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500"/>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-500 dark:text-white" to={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {post.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setOpenModal(true)
                      setPostIdToDelete(post._id)
                    }} className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="text-teal-500 hover:underline" to={`/update-post/${post._id}`}>
                      <span>Edit</span>
                    </Link>
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
        <Modal.Header>Delete Post</Modal.Header>
        <Modal.Body>
            <div className="text-2xl text-center">Do you want to delete this post?</div>
        </Modal.Body>
        <Modal.Footer>
            <Button color="gray" onClick={() => setOpenModal(false)}>No</Button>
            <Button onClick={handleDeletePost} color="failure" >
                Yes, delete post.
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DashPosts