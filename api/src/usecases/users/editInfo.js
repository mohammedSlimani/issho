import {makeUser} from "../../entities";

export default function makeEditInfo ({usersDb}) {
    return async function editInfo({id, changes}){
        if(!id){
            throw new Error("You have to supply the id of the user you want to edit ");
        }

        const existingUser = await usersDb.findById({id});
        if(!existingUser || Object.entries(existingUser).length === 0){
            throw new Error("The user you want to edit doesnt exist");
        }

        const updatedUser = await makeUser({id: id, ...existingUser, ...changes});

        return usersDb.update({
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