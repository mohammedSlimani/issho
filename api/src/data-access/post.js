export default function makePostsDb (){
    return Object.freeze({
        findById,
        search,
        update,
        insert,
    });
   // we dont really need the delete method as we are going to mark the deleted posts for data usage
    async function findById(){
        throw new Error('To be implemented!')
    }
    async function search(){
        throw new Error('To be implemented!')
    }
    async function insert(){
        throw new Error('To be implemented!')
    }
    async function update(){
        throw new Error('To be implemented!')
    }
}