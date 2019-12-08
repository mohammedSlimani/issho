import ESService from "../utils/ESService";

export default function makeUsersDb (){
    return Object.freeze({
        findById,
        findByEmail,
        update,
        insert,
        remove
    });
    async function remove(){
        throw new Error('Remove User To be implemented!');
    }
    async function findById({id}){
        return await ESService.getUserById(id);
    }
    async function findByEmail({email}){
        return await ESService.getUserByEmail(email);
    }
    async function insert(userInfo){
        return await ESService.createUser(userInfo);
    }
    async function update(changes){
        return await ESService.updateUser(changes);
    }
}