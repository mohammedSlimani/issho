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
        console.log("user findById resp:", response);
        if(!response.message){
            return null;
        }
        return response.message.constructor.name === "String" ? {}: response.message
    }
    async function findByEmail({email}){
        const response = await ESService.getUserByEmail(email);
        console.log("user findByEmail resp:", response);
        return response.message.constructor.name === "String" ? {}: response.message
    }
    async function insert(userInfo){
        const response = await ESService.createUser(userInfo);
        console.log("user Insert resp:", response);
        return response.message.constructor.name === "String" ? {}: response.message
    }
    async function update(changes){
        const response = await ESService.updateUser(changes);
        console.log("user update resp:", response);
        return response.message.constructor.name === "String" ? {}: response.message
    }
    async function search({ name }){
       const response = await ESService.getUserByName(name);
       console.log("user search resp:", response);
        return response.message.constructor.name === "String" ? {}: response.message
    }
}