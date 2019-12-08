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



const pst = app.listen(3000, () => {
    console.log(
        "server is listening on port " + pst.address().address + pst.address().port
    );
});

export default app;


