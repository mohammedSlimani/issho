export default function makeSubscribeUserController({subscribeUser}) {
    return async function subscribeUserController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {
                postId,
                userId
            } = httpRequest.body;

            const post = await subscribeUser({postId, userId});

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
