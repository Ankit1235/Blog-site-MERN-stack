import { Request, Response, NextFunction } from 'express';
import PostModel from '../models/PostModel';
import UsersModel from '../models/UserModel';
import CustomError from '../middlware/ErrorHandler';

export const CreatePost = async (req : Request, res : Response, next : NextFunction) => {
    try {
    const { title, body, subtitle, date, user } = req.body;
    const new_post = await PostModel.create({
        title : title,
        body: body,
        subtitle : subtitle,
        date : date,
        user : user
    }); 

    const userId = await UsersModel.findById(user);
    if(userId) { 
        userId.posts.push(new_post._id);
        await userId.save();
        res.json({
            message : "New Post Created",
            post : new_post
        });
    }
    else {
        throw new CustomError(404, 'User id not found!');
    } 

} catch (error) { next(error); }

}

export const DeletePost = async (req : Request, res : Response, next : NextFunction) => {

    try {
        const post_id = await PostModel.deleteOne( {_id : req.params.id} );
        if(post_id) {
            res.json({
                deletedPost : post_id,
                meessage : "Post deleted succefully"
            });
        }
        else {
            throw new CustomError(404, 'Post Id is wrong or not exist');
        }
        
    } catch (error) {
        next(error);
    }
    
}

export const findAllPost = async (req : Request, res : Response, next : NextFunction) => {

    try { 
        
        const posts = await PostModel.find();
        if(posts) {
             res.send(posts);
        }
        else {
            throw new CustomError(404, 'No posts found!');
        }
       
        
    } catch (error) {
        next();
    }
   
    
}

export const updatePost = async (req : Request, res : Response, next : NextFunction) => {

    try {
        const { id } = req.params;
        const { title, subtitle, body } = req.body;
        const updated_post = await PostModel.findByIdAndUpdate( id, {title : title, subtitle : subtitle, body : body});

    res.json({
        message : "Post updated successfully",
        UpdatedPost  : updated_post
    });
    } catch (error) {
         next(error);
    }
}

export const findUserPosts = async(req : Request, res : Response, next : NextFunction) => {

    try {    
        
        const userpost = await UsersModel.findOne({_id : req.params.id});
        if(userpost){
            const posts = await PostModel.find({ user : userpost._id});
            console.log(posts); 
            
            res.json({
                posts : posts
            })
                 
        }

        else {
            throw new CustomError(404, 'Not posts found on this User Id!');
        }
        
    } catch (error) {
        next(error);
    } 
}

export const searchPost = async (req : Request, res : Response, next: NextFunction) => {

    try {  
        const query = decodeURIComponent(req.query.query as string)
        const result = await PostModel.find({title : {$regex : query, $options : 'i'}});
    
    if(result.length > 0) {
        res.json({
            post : result
        });
    }  
    else {
        res.json({
            message : "No post found with your search query!!"
        });
    }
    
    } catch (error) {
        next(error);
    }
  

}