import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema( {
    name : {type:String, required:true},
    email : {type:String, required:true, unique:true},
    password : {type:String, requried:true},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }]
});

const UsersModel = mongoose.model('Users', UsersSchema);
export default UsersModel;
