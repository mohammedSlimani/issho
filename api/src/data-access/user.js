export default function makeUsersDb (){
    return Object.freeze({
        findById,
        findByEmail,
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
    async function findByEmail(){
        throw new Error('To be implemented!')
    }
    async function insert(){
        throw new Error('To be implemented!')
    }
    async function update(){
        throw new Error('To be implemented!')
    }
}