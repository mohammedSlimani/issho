import Id from "../Id";
import PassAlgo from "../../utils/PwdAlgo";
import makeBuildUser from "./user";
import validator from "email-validator";

const crypt = PassAlgo.encrypt;

const makeUser = makeBuildUser({ Id, crypt, validator });

export default makeUser;
