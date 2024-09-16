export const PostHook =  () => {

    const createPost = async (createPostData : any) => {
       try {

        const createPost = await fetch('http://localhost:3500/home/auth/createpost', {
            method : 'post',
            headers : { 'Content-type' : 'application/json'},
            body : JSON.stringify(createPostData)
        });
    
    } catch (error) { console.error(error); } 
    }

    const getUserId = () => {
        const user = localStorage.getItem('userData');
        if(user) { 
        const  userId  = JSON.parse(user); 
        const {user_id} = userId;
        return user_id;
    } 
}

const fetchPost = async () => {
    try {
        const fetchAllPosts = await fetch('http://localhost:3500/home/auth/allposts', {
            method : 'get',
            headers : { 'Content-type' : 'application/json' }
        });
        const posts = await fetchAllPosts.json();
        return posts;

    } catch (error) { console.error(error); }
    }

const fetchUserPosts = async() => {
    const user_id = getUserId();
    try {
        const fetchUserPosts = await fetch(`http://localhost:3500/home/auth/${user_id}`,{
            method : 'get',
            headers : {
                'Content-type' : 'application/json'
            }
        });

        const userPosts = await fetchUserPosts.json();
        return userPosts


    } catch (error) {
        console.error(error);
    }
}

const editPost = async(data : any, post_id : string) => {
    try {
        const user_id = getUserId();
        const res = await fetch(`http://localhost:3500/home/auth/${post_id}`, {
            method : 'put',
            headers : { 'Content-type' : 'application/json'},
            body : JSON.stringify(data)
        });
        const result = await res.json();
        console.log(result);
    } catch (error) {
        console.error(error); 
    }
}

const deletePost = async(post_id : string) => {
    try {
        const res = await fetch(`http://localhost:3500/home/auth/${post_id}`,{
            method : 'DELETE',
            headers : {'Content-type' : 'application/json'},
        });
        const result = await res.json();
        console.log(result);
    } catch (error) {
        console.error(error);        
    }

}

const searchPost = async (searchQuery : string) => {
    try {
        console.log(searchQuery);
        const res = await fetch(`http://localhost:3500/home/auth/search?query=${searchQuery}`,{
            method : 'get',
            headers : {'Content-type' : 'application/json'}
        });
        if(res) {
            const result = await res.json();
            console.log(result);
        }
        
    } catch (error) {
        console.error(error);
    }
}
    return { createPost, getUserId, fetchPost, fetchUserPosts, deletePost, editPost, searchPost };
}

