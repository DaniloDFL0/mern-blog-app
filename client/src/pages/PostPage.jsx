import { Button, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CommentSection from "../components/CommentSection"

const PostPage = () => {
    const { postSlug } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/getposts?slug=${postSlug}`)
                const data = await res.json()

                if(res.ok) {
                    setPost(data.posts[0])
                    setIsLoading(false)
                    setError(false)
                } else {
                    setError(true)
                    setIsLoading(false)
                    return
                }
                
            } catch(error) {
                setError(true)
                setIsLoading(false)
            } 
        }

        fetchPost()
    }, [postSlug])

    if(isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size={"xl"}/>
            </div>
        )
    }

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <div className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {post && post.title}
            </div>
            <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
                <Button color="gray" pill size={"xs"}>{post && post.category}</Button>
            </Link>
            <img src={post && post.image} alt={post && post.title} className="mt-10 p-3 max-h-[600px] w-full object-cover"/>
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                <span>{post && new Date(post && post.createdAt).toLocaleDateString()}</span>
                <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>
            <div className="p-3 max-w-2xl mx-auto w-full" dangerouslySetInnerHTML={{__html: post && post.content}}></div>
            <CommentSection postId={post && post._id}/>
        </main>
    )
}

export default PostPage