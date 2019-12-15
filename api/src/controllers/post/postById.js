export default function makePostByIdController({postById}) {
    return async function postByIdController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {id} = httpRequest.params;
            const posts = await postById(id);

            return {
                headers,
                statusCode: 201,
                body: { ...posts }
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