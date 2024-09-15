import { useEffect, useState } from "react";
import { PostHook } from "../hook/PostHook";
import './profile.css';
import { useNavigate, useLocation } from "react-router-dom";

interface UserPostType {
    title: string, 
    subtitle: string,
    body: string,
    _id : string
}

const Profile = () => {
    const { fetchUserPosts, deletePost } = PostHook();
    const [selectedPost, setSelectedPost] = useState<UserPostType>();
    const [userPosts, setUserPosts] = useState<UserPostType[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await fetchUserPosts();
                setUserPosts(res.posts); 
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        } 
        getPosts();
    }, []); 

    const getPostId = (postId : string) => {
        console.log(postId);
        return postId;
    }

    const delete_post = (postId : string) => {
        const post_id = getPostId(postId);
        deletePost(post_id);
        setUserPosts(userPosts.filter(post => post._id !== post_id));
    } 

    const editPost = ( post : UserPostType) => {
       setSelectedPost(post);
       navigate("/profile/updatepost",{state : { post }});
    } 

    return (
        <div className="MainContainer">
            <div className="ProfileImage"><h1>User Name</h1></div>
            <div className="Posts">
                <h1>Posts</h1>
                {message && <p className="success-message">{message}</p>}
                {userPosts.length > 0 ? (
                    userPosts.map((post: UserPostType, index: number) => (
                        <div className="post" key={index}>
                            <div>
                                <h1>{post.title}</h1>
                                <h2>{post.subtitle}</h2>
                                <p>{post.body}</p>
                            </div>
                            <div>
                                <button id="edit-post-btn" onClick={() => editPost(post)}>Edit Post</button>
                                <button id="delete-post-btn" onClick={() => delete_post(post._id)}>Delete Post</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    )
}

export default Profile;
