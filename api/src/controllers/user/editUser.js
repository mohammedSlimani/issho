export default function makeEditUserController ({editUser}) {
    return async function editUserController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {id} = httpRequest.params;
            const changes = httpRequest.body;
            const user = await editUser({id, changes});

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