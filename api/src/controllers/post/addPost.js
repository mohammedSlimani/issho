export default function makeAddPostController({addPost}) {
    return async function addPostController(httpRequest){
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        try {
            const {
                authorId,
                title,
                location,
                des,
                pathToImage,
            } = httpRequest.body;

            //Save the Image in the Folder with multer and then store the Static path to the image <3
            //We use JSON.parse(location) because it is the only way to send nested objects using FormData

            let postInfo = {
                authorId,
                title,
                location: JSON.parse(location),
                des,
                imgUrl: pathToImage,
            };
            const post = await addPost(postInfo);

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