export default function makePostsDb (){
    return Object.freeze({
        findById,
        search,
        update,
        insert,
        remove
    });
    async function remove(){
        throw new Error('To be implemented!')
    }
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