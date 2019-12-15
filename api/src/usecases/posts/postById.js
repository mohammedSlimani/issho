export default function makePostById ({postsDb}) {
    return async function postById(id){
        return await postsDb.findById({id});
    }
}