export default function makeSignUpController ({signUp}) {
    return async function signUpController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {email, pwd, name} = httpRequest.body;
            const user = await signUp({email, pwd, name});

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