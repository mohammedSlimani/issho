export default function makeApproveUserController({approveUser}) {
    return async function approveUserController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {
                postId,
                userId
            } = httpRequest.body;

            const post = await approveUser({postId, userId});

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
