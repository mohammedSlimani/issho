export default function makeGoogleOuathController ({editUser}) {
    return async function googleOuathController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {email, googleId, name, image} = httpRequest.body;
            const user = await editUser({email, googleId, name, image});

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