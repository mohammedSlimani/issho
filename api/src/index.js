import express from "express";
import makeCallback from "./express-callback"
import bodyParser from "body-parser"
import {userControllers,postControllers} from "./controllers"
import cors from  "cors";
const app = express();

//Configuring the BodyParser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

//configuring CORS
app.use(cors());

//user Routes
app.delete("/users/:id", makeCallback(userControllers.deleteUser));
app.patch("/users/:id", makeCallback(userControllers.editUser));
app.post("/users/googleouath", makeCallback(userControllers.googleOuath));
// TODO: app.post("users/:id", makeCallback(userControllers.resetPassword);
app.post("/users", makeCallback(userControllers.searchUser));
app.post("/users/signin", makeCallback(userControllers.signIn));
app.post("/users/signup", makeCallback(userControllers.signUp));

//Post routes
app.post("/posts", makeCallback(postControllers.addPost));
app.post("/posts/approve", makeCallback(postControllers.approveUser));
app.delete("/posts", makeCallback(postControllers.deletePost));
app.patch("/posts/:id", makeCallback(postControllers.editPost));
app.post("/posts/reject", makeCallback(postControllers.rejectUser));
app.post("/posts/search", makeCallback(postControllers.searchPost));
app.post("/posts/subscribe", makeCallback(postControllers.subscribeUser));
app.post("/posts/unsubscribe", makeCallback(postControllers.unsubscribeUser));
app.get("/posts", makeCallback(postControllers.allPosts));
app.get("/posts/user/:userId", makeCallback(postControllers.postsOfUser));
//app.get("/posts/:id", makeCallback(postControllers.postById));

const pst = app.listen(3000, () => {
    console.log(
        "server is listening on port " + pst.address().address + pst.address().port
    );
});

export default app;


