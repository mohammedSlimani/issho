export default function makeAllPostsController({allPosts}) {
    return async function allPostsController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const posts = await allPosts();

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