import post from "../post/post";

const NOIMAGE = "https://www.clipartwiki.com/clipimg/detail/197-1979569_no-profile.png"

export default function BuildMakeUser({Id, crypt, validator}) {
    return async function makeUser({
                                       id = Id.makeId(),
                                       name,
                                       pwd,
                                       email,
                                       imgUrl = NOIMAGE,
                                       googleId = null,
                                       approved = false,
                                       bookings = [], // Post Id that the user booked
                                       posts = [] // Posts that the user made
                                   }) {
        if (!name) {
            throw new Error("User must have a Name")
        }
        if (!pwd) {
            throw new Error('User must have a password')
        }
        if (!validator.validate(email)) {
            throw new Error("user must have a valid email")
        }
        if (!Id.isValidId(id)) {
            throw new Error("user ID id not valid")
        }

        let encryptedPwd = await crypt(pwd);

        return Object.freeze({
            getName: () => name,
            getPwd: () => encryptedPwd,
            getEmail: () => email.toLowerCase(),
            getId: () => id,
            getGoogleId: () => googleId,
            approve: () => {
                approved = true;
            },
            disapprove: () => {
                //We can use this to bad users that misbehave
                approved = false;
            },
            getBookings : () => bookings,
            getPosts : ( ) => posts
        })
    }
}