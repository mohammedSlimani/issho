export default function makeSubscribeUserController({editPost}) {
    return async function subscribeUserController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const { authorId, ...changes } = httpRequest.body;
            const {id} = httpRequest.params;

            const post = await editPost({id, authorId, changes});

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
