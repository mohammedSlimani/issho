import makeAddPostController from "./post/addPost";
import {postService, userService} from "../usecases";
import makeApproveUserController from "./post/approveUser";
import makeDeletePostController from "./post/deletePost";
import makeEditPostController from "./post/editPost";
import makeRejectUserController from "./post/rejectUser";
import makeSearchPostController from "./post/searchPost";
import makeSubscribeUserController from "./post/subscribeUser";
import makeUnsubscribeUserController from "./post/unsubscribeUser";
import makeDeleteUserController from "./user/delete";
import makeEditUserController from "./user/editUser";
import makeGoogleOuathController from "./user/googleOuath";
import makeSearchUserController from "./user/searchUser";
import makeSignInController from "./user/signIn";
import makeSignUpController from "./user/signUp";
import makeAllPostsController from "./post/allPosts";
import makePostsOfUserController from "./post/postsOfUser";
import makePostByIdController from "./post/postById";

//Post Controllers
const addPost = makeAddPostController({addPost:postService.addPost});
const approveUser = makeApproveUserController({approveUser:postService.approveUser});
const deletePost = makeDeletePostController({deletePost:postService.deletePost});
const editPost = makeEditPostController({editPost:postService.editPost});
const rejectUser = makeRejectUserController({rejectUser:postService.rejectUser});
const searchPost = makeSearchPostController({searchPost: postService.searchPost});
const subscribeUser = makeSubscribeUserController({subscribeUser:postService.subscribeUser});
const unsubscribeUser = makeUnsubscribeUserController({unsubscribeUser:postService.unsubscribeUser});
const allPosts = makeAllPostsController({allPosts: postService.allPosts});
const postsOfUser = makePostsOfUserController({postsOfUser: postService.postsOfUser});
const postById = makePostByIdController({postById: postService.postById})

//UserControllers
const deleteUser = makeDeleteUserController({deleteUser:userService.deleteUser});
const editUser = makeEditUserController({editUser:userService.editInfo});
const googleOuath = makeGoogleOuathController({googleOuath:userService.googleOuath});
//TODO: const resetPassword
const searchUser = makeSearchUserController({searchUser:userService.searchUser});
const signIn = makeSignInController({signIn:userService.singIn});
const signUp = makeSignUpController({signUp:userService.signUp});

const userControllers = Object.freeze({
    deleteUser,
    editUser,
    googleOuath,
    searchUser,
    signIn,
    signUp
});

const postControllers = Object.freeze({
    addPost,
    approveUser,
    deletePost,
    editPost,
    rejectUser,
    searchPost,
    subscribeUser,
    unsubscribeUser,
    allPosts,
    postsOfUser,
    postById
});

export{
    postControllers,
    userControllers
}
