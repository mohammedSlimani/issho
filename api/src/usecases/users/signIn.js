export default function makeSignIn({usersDb, compare}){
    return async function singIn(userInfo){
        const exist = await usersDb.findByEmail({ email: userInfo.email });
        if (exist && Object.entries(exist).length !== 0) {
            //todo: fix this bad naming convention
            if (await compare(userInfo.pwd, exist.pwd)) {
                return exist;
            }
            throw new Error("Wrong password");
        } else {
            throw new Error("No user Found");
        }
    }
}