export default function makeDeleteUserController ({deleteUser}) {
    return async function deleteUserController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {id} = httpRequest.params;

            const user = await deleteUser({id});

            return {
                headers,
                statusCode: 204,
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