export default function makePostsOfUserController({postsOfUser}) {
    return async function postsOfUserController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {userId} = httpRequest.params;
            const posts = await postsOfUser(userId);

            return {
                headers,
                statusCode: 201,
                body: { ...posts }
            };
        } catch (e) {
            console.log(e);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            };
        }
    }
}