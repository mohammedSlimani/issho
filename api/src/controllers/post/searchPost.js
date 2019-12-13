export default function makeSearchPostController({searchPost}) {
    return async function searchPostController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {
                queries
            } = httpRequest.body;

            const post = await searchPost(queries);

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
