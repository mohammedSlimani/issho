import ApiService from "./Api";

const Api = new ApiService();

/*********************************
********    USERS     ************
********************************* */

const getAllUser =  () =>{
    console.log('getting all users');
    return Api.get("/users/all");
};
const getUserById = (id) => {
    console.log('getting the user with the id:', id);
    return Api.get(`/users/id?id=${id}`);
};
const getUserByEmail = (email) => {
    console.log('getting the user by email:', email);
    return Api.get(`/users/email?email=${email}`)
};
const getUserByName = (name) =>{
    console.log("getting the user by name:", name);
    return Api.get(`/users/name?name=${name}`)
};
const createUser = (user) => {
    console.log('creating a user with the info', user);
    return Api.post("/users/create", user);
};
const updateUser = (changes) => {
    console.log('updating the user with changes', changes);
    return Api.post("/users/update", changes);
};


/*********************************
 ********    POSTS     ************
 ********************************* */

const getAllPosts = () => {
    console.log('getting all the posts');
    return Api.get("/posts/all")
};
const getPostById = (id) => {
    console.log("Getting post by id:", id);
    return Api.get(`/posts/id?id=${id}`)
};
const getPostsByUserId = (userId) => {
    console.log('getting the posts of the user with id : ', userId);
    return Api.get(`/posts/userId?userId=${userId}`);
};
const createPost = (postInfo) =>{
    console.log("creating a post with the info:", postInfo);
    return Api.post("/posts/create", postInfo);
};
const updatePost = (changes) => {
    console.log('changing the post with info');
    return Api.post("/posts/update", changes);
};
const deletePost = (id) => {
    console.log('deleting the post with id ', id);
    return Api.delete(`/posts/delete?id=${id}`);
};

const ESService = Object.freeze({
    getAllUser,
    getUserById,
    getUserByEmail,
    getUserByName,
    createUser,
    updateUser,
    getAllPosts,
    getPostsByUserId,
    createPost,
    updatePost,
    deletePost,
    getPostById
});
export default ESService;
