import express from 'express';
import { CreatePost, DeletePost, findAllPost, findUserPosts, searchPost, updatePost } from '../controllers/Posts';

const blogRoutes = express.Router();
blogRoutes.post("/createpost", CreatePost);
blogRoutes.delete("/:id", DeletePost);
blogRoutes.get("/allposts", findAllPost);
blogRoutes.get("/search", searchPost);
blogRoutes.put("/:id", updatePost);
blogRoutes.get("/:id", findUserPosts);

export default blogRoutes;