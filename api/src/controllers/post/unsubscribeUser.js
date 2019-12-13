export default function makeUnsubscribeUserController({unsubscribeUser}) {
    return async function unsubscribeUserController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {
                postId,
                userId
            } = httpRequest.body;

            const post = await unsubscribeUser({postId, userId});

            return {
                headers,
                statusCode: 200,
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
