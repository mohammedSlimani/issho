import {usersDb, postsDb} from "../data-access";
import makeDeleteUser from "./users/delete";
import makeEditInfo from "./users/editInfo";
import makeGoogleOuath from "./users/googleOuath";
import makeSearchUser from "./users/searchUser";
import makeSignIn from "./users/signIn";
import PwdAlgo from "../utils/PwdAlgo";
import makeSignUp from "./users/signUp";
import makeAddPost from "./posts/addPost";
import makeApproveUser from "./posts/approveUser";
import makeDeletePost from "./posts/deletePost";
import makeEditPost from "./posts/editPost";
import makeRejectUser from "./posts/rejectUser";
import makeSearchPost from "./posts/searchPost";
import makeSubscribeUser from "./posts/subscribeUser";
import makeUnsubscribeUser from "./posts/unsubscribeUser";
import makeAllPosts from "./posts/allPosts";
import makePostsOfUser from "./posts/postsOfUser";

//Users UseCases
const deleteUser = makeDeleteUser({usersDb});
const editInfo = makeEditInfo({usersDb});
const googleOuath = makeGoogleOuath({usersDb});

//TODO: Reset Password
const searchUser = makeSearchUser({usersDb});
const singIn = makeSignIn({usersDb, compare: PwdAlgo.compare});
const signUp = makeSignUp({usersDb, crypt: PwdAlgo.encrypt});

//Posts UseCases
const addPost = makeAddPost({postsDb, usersDb});
const approveUser = makeApproveUser({postsDb,usersDb});
const deletePost = makeDeletePost({postsDb});
const editPost = makeEditPost({usersDb, postsDb});
const rejectUser = makeRejectUser({usersDb, postsDb});
const searchPost = makeSearchPost({postsDb});
const subscribeUser = makeSubscribeUser({usersDb, postsDb});
const unsubscribeUser = makeUnsubscribeUser({usersDb, postsDb});
const allPosts = makeAllPosts({postsDb});
const postsOfUser =  makePostsOfUser({postsDb});

const userService = Object.freeze({
    deleteUser,
    editInfo,
    googleOuath,
    searchUser,
    singIn,
    signUp
});

const postService = Object.freeze({
    addPost,
    approveUser,
    deletePost,
    editPost,
    rejectUser,
    searchPost,
    subscribeUser,
    unsubscribeUser,
    allPosts,
    postsOfUser
});

export {
    postService,
    userService
};


