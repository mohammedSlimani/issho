export default function makeSearchUser ({usersDb}) {
    return async function searchUser(queries){
        const {name} = queries;
        return usersDb.search({name});
    }
}