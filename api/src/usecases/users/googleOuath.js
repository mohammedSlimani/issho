import {makeUser} from "../../entities";

export default function makeGoogleOuath({usersDb}) {
    return async function googleOuath({email, googleId, name, image}){
        if(!googleId){
            throw new Error("You hva to provide the google Id of the user");
        }
        if(!image){
            throw new Error("the googleOuath should contain an Image");
        }

        const exists = await usersDb.findByEmail({email});
        if(exists && Object.entries(exists).length !== 0){
            //then an already existing user is trying to link his googleAccount
            return usersDb.update({
                id: exists.id,
                googleId,
                image
            })
        }else{
            //we are dealing with a new user
            const user = makeUser({
                email,
                name,
                googleId,
                imgUrl: image,
                pwd:""
            });
            user.approve();

            return usersDb.insert({
                id:updatedUser.getId(),
                name : updatedUser.getName(),
                pwd: updatedUser.getPwd(),
                email : updatedUser.getEmail(),
                imgUrl : updatedUser.getImgUrl(),
                googleId : updatedUser.getGoogleId(),
                approved : updatedUser.getApproved(),
                deleted : updatedUser.getDeleted()
            })
        }
    }
}