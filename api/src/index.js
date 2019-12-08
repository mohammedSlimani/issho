import express from "express";
import expressCallback from "express-callback"
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



const pst = app.listen(3000, () => {
    console.log(
        "server is listening on port " + pst.address().address + pst.address().port
    );
});

export default app;


