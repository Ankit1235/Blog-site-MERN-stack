import { useState } from "react";
import { PostHook } from "../hook/PostHook";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditPost.css"; // Import the CSS file

const EditPost = () => {
    const { editPost } = PostHook();
    const location = useLocation();
    const navigate = useNavigate();
    const { post } = location.state || {};
    const { title, subtitle, body, _id } = post;
    const [formdata, setFormData] = useState({
        title: title,
        subtitle: subtitle,
        body: body
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        await editPost(formdata, _id);
        navigate("/profile", { state: { message: "Post updated successfully" } });
    };

    return (
        <div className="container">
            <form action="" method="post">
                <input type="text" onChange={handleChange} value={formdata.title} name="title" />
                <input type="text" onChange={handleChange} value={formdata.subtitle} name="subtitle" />
                <input type="text" onChange={handleChange} value={formdata.body} name="body" />
                <button type="submit" onClick={handleSubmit}>Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
