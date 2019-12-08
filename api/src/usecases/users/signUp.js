import { makeUser } from "../../entities";

export default function makeSignUp({ usersDb }) {
    return async function signUp({ email, name, pwd } ) {
        if (!pwd) {
            throw new Error("Need to provide a password for the Local signup");
        }
        const exist = await usersDb.findByEmail({ email });
        if (exist && Object.entries(exist).length !== 0)  {
            throw new Error("User Already exist");
        }

        const user = await makeUser({ email, pwd, name });

        //WE can Do some Data Analyse or spam detection before approving the user in
        //this stage
        user.approve();

        return await usersDb.insert({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPwd(),
            googleId: user.getGoogleId(),
            approved: user.getApproved(),
            imgUrl: user.getImgUrl()
        });
    };
}
