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
    console.log('getting the user with the id;', id);
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

