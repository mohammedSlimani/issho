export default function makeDeletePostController({deletePost}) {
    return async function deletePostController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {
                id,
                authorId
            } = httpRequest.body;

            console.log(httpRequest.body, {id, authorId});

            const post = await deletePost({id, authorId});

            return {
                headers,
                statusCode: 204,
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
