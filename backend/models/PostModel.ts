import mongoose from "mongoose";
import UsersModel from "./UserModel";
const PostSchema = new mongoose.Schema({

    title : { type : String, required:true },
    subtitle : { type:String },
    body : { type:String,required:true },
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date : { type:Date, default:Date.now }

});

const PostModel = mongoose.model('Posts', PostSchema);
export default PostModel;


