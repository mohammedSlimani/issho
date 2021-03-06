import { makeUser } from "../../entities";

export default function makeSignUp({ usersDb, crypt }) {
    return async function signUp({ email, name, pwd } ) {
        if (!pwd) {
            throw new Error("Need to provide a password for the Local signup");
        }
        const exist = await usersDb.findByEmail({ email });
        if (exist && Object.entries(exist).length !== 0)  {
            throw new Error("User Already exist");
        }

        const encryptedPwd = await crypt(pwd);
        const user = makeUser({ email, pwd: encryptedPwd, name });

        //WE can Do some Data Analyse or spam detection before approving the user in
        //this stage
        user.approve();

        return await usersDb.insert({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            pwd: user.getPwd(),
            googleId: user.getGoogleId(),
            approved: user.getApproved(),
            imgUrl: user.getImgUrl(),
            deleted: user.getDeleted()
        });
    };
}
