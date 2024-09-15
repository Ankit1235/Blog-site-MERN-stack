import { useState } from "react";
import { PostHook } from "../hook/PostHook";
import { useNavigate } from "react-router-dom";
import './createpost.css';

type createPostType = {
    title: string,
    subtitle: string,
    body: string,
    user: () => {}
}

const CreatePost = () => {
    const navigate = useNavigate();
    const { getUserId, createPost } = PostHook();
    const [formdata, setData] = useState<createPostType>({
        title: '',
        subtitle: '',
        body: '',
        user: getUserId()
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData({ ...formdata, [name]: value });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        createPost(formdata);
        navigate("/dashboard");
    }

    return (
        <div className="create-post-container">
            <form className="create-post-form" action="" method="post">
                <input type="text" placeholder="Title" onChange={handleChange} name="title" />
                <input type="text" placeholder="Subtitle" onChange={handleChange} name="subtitle" />
                <textarea name="body" placeholder="Body" onChange={handleChange}></textarea>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CreatePost;
