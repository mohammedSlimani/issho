export default function makeSignIn({usersDb, compare}){
    return async function singIn(userInfo){
        const exist = await usersDb.findByEmail({ email: userInfo.email });
        if (exist) {
            if (await compare(userInfo.password, exist.password)) {
                return exist;
            }
            throw new Error("Wrong password");
        } else {
            throw new Error("No user Found");
        }
    }
}