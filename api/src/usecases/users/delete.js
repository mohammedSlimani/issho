import makeUser from "../../entities/user";

export default function makeDeleteUser({usersDb}) {
    return async function deleteUser({id}){
        if(!id){
            throw new Error("Provide the id of the use yo are trying to delete");
        }

        const existingUser = await usersDb.findById({id});
        if(!existingUser){
            throw new Error("The user you are trying to delete doesnt exist");
        }

        const updatedUser = await makeUser(existingUser);

        //Why isn't this capturing my functions 
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