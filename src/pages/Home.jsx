import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true) // Add a loading state
    const authStatus = useSelector((state) => state.auth.status) // Get authentication status from Redux

    useEffect(() => {
        if (authStatus) {
            setLoading(true); // Set loading to true when fetching starts
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
                setLoading(false); // Set loading to false once posts are fetched
            }).catch(() => setLoading(false)) // Handle errors by also stopping loading
        }
    }, [authStatus]) // Fetch posts only if the user is logged in

    if (!authStatus) {
        // If the user is not logged in, show this message
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-800">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (loading) {
        // While loading, show a loading indicator
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Loading posts...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (authStatus && posts.length === 0) {
        // If the user is logged in but there are no posts, show this message
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts to Show
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
