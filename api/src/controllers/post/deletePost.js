export default function makeDeletePostController({deletePost}) {
    return async function deletePostController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {
                id,
                userId
            } = httpRequest.body;

            const post = await deletePost({id, userId});

            return {
                headers,
                statusCode: 201,
                body: { ...post }
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
