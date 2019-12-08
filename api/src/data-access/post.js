import ESService from "../utils/ESService";

export default function makePostsDb (){
    return Object.freeze({
        findById,
        search,
        update,
        insert,
    });
    async function findById({id}){
        return await ESService.getUserById(id)
    }
    async function search(){
        return await ESService.getAllPosts();
    }
    async function insert(postInfo){
        return await ESService.createPost(postInfo);
    }
    async function update(postInfo){
        return await ESService.updatePost(postInfo)
    }
}