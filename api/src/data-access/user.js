import ESService from "../utils/ESService";

export default function makeUsersDb (){
    return Object.freeze({
        findById,
        findByEmail,
        update,
        insert,
        remove,
        search
    });
    async function remove(){
        throw new Error('Remove User To be implemented!');
    }
    async function findById({id}){
        const response =  await ESService.getUserById(id);
        return response.message.constructor.name === "String" ? {}: response.message
    }
    async function findByEmail({email}){
        const response = await ESService.getUserByEmail(email);
        return response.message.constructor.name === "String" ? {}: response.message
    }
    async function insert(userInfo){
        const response = await ESService.createUser(userInfo);
        return response.message.constructor.name === "String" ? {}: response.message
    }
    async function update(changes){
        const response = await ESService.updateUser(changes);
        return response.message.constructor.name === "String" ? {}: response.message
    }
    async function search({ name }){
       const response = await ESService.getUserByName(name);
        return response.message.constructor.name === "String" ? {}: response.message
    }
}