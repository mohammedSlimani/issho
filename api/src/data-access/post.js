import ESService from "../utils/ESService";

export default function makePostsDb (){
    return Object.freeze({
        findById,
        search,
        update,
        insert,
        getAll
    });
    async function findById({id}){
        const response =  await ESService.getPostById(id);
        console.log("post findById resp:", response);
        return response.message.constructor.name === "String" ? {}: response.message

    }
    async function search(){
        const response =  await ESService.getAllPosts();
        console.log("post search resp:", response);
        return response.message.constructor.name === "String" ? {}: response.message

    }
    async function insert(postInfo){
        const response =  await ESService.createPost(postInfo);
        console.log("post insert resp:", response);
        return response.message.constructor.name === "String" ? {}: response.message

    }
    async function update(postInfo){
        const response =  await ESService.updatePost(postInfo);
        console.log("post update resp:", response);
        return response.message.constructor.name === "String" ? {}: response.message

    }
    async function getAll(){
        const response =  await ESService.getAllPosts();
        console.log("post getAll resp:", response);
        return response.message.constructor.name === "String" ? {}: response.message
    }
}