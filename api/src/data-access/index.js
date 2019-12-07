import makePostsDb from "./post";
import makeUsersDb from "./user"
const postsDb = makePostsDb();
const usersDb = makeUsersDb();

export {
    postsDb,
    usersDb
}
