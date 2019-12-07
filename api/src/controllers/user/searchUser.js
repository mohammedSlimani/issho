export default function makeSearchUserController ({searchUser}) {
    return async function searchUserController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const queries = httpRequest.body;
            const user = await searchUser(queries);

            return {
                headers,
                statusCode: 201,
                body: { ...user }
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