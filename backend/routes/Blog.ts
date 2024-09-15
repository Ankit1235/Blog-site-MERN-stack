import express from 'express';
import { CreatePost, DeletePost, findAllPost, findUserPosts, updatePost } from '../controllers/Posts';


const blogRoutes = express.Router();
blogRoutes.post("/createpost", CreatePost);
blogRoutes.delete("/:id", DeletePost);
blogRoutes.get("/allposts", findAllPost);
blogRoutes.put("/:id", updatePost);
blogRoutes.get("/:id", findUserPosts);

export default blogRoutes;