export default function makeSearchUser ({usersDb}) {
    return async function searchUser(name){
        return usersDb.search({name});
    }
}