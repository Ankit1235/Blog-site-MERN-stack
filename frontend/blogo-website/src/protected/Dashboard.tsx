import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './dashboard.css';
import { PostHook } from "../hook/PostHook";
import SearchPostForm from "./SearchPost";

interface Post {
    title: string;
    subtitle: string;
    body: string;
    date: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const { Logout } = useAuthContext();
    const { fetchPost } = PostHook();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            const fetchedPosts = await fetchPost();
            setPosts(fetchedPosts);
        };
        getPosts();
    }, []);

    const handleLogout = () => { 
        Logout(); 
        navigate('/login');   
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="dashboard-container">
            <aside className="side-menu">
                <nav>
                    <ul>
                        <li onClick={() => navigate('/home')}>Home</li>
                        <li onClick={() => navigate('/settings')}>Settings</li>
                        <li onClick={() => navigate('/profile')}>Profile</li>
                        <li onClick={() => navigate('/createpost')}>Create Post</li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <SearchPostForm />
                <h1 className="dashboard-title">Dashboard Component!</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <div className="posts-container">
                    {posts.length > 0 ? (
                        posts.map((postItem: Post, index: number) => (
                            <div className="post" key={index}>
                                <h1 className="post-title">{postItem.title}</h1>
                                <h2 className="post-subtitle">{postItem.subtitle}</h2>
                                <p className="post-content">{postItem.body}</p>
                                <p className="date-content">{formatDate(postItem.date)}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-posts-message">No posts available</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
