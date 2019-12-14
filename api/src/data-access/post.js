import ESService from "../utils/ESService";

export default function makePostsDb (){
    return Object.freeze({
        findById,
        search,
        update,
        insert,
    });
    async function findById({id}){
        const response =  await ESService.getUserById(id)
        return response.message.constructor.name === "String" ? {}: response.message

    }
    async function search(){
        const response =  await ESService.getAllPosts();
        return response.message.constructor.name === "String" ? {}: response.message

    }
    async function insert(postInfo){
        const response =  await ESService.createPost(postInfo);
        return response.message.constructor.name === "String" ? {}: response.message

    }
    async function update(postInfo){
        const response =  await ESService.updatePost(postInfo)
        return response.message.constructor.name === "String" ? {}: response.message

    }
}