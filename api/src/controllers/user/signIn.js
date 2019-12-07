export default function makeSignInController ({signIn}) {
    return async function signInController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {email, password} = httpRequest.body;
            const user = await signIn({password, email});

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