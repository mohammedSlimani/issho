export default function makeRejectUserController({rejectUser}) {
    return async function rejectUserController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {
                postId,
                userId
            } = httpRequest.body;

            const post = await rejectUser({postId, userId});

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
