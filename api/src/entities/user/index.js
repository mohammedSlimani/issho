import Id from "../Id";
import PassAlgo from "../../utils/PwdAlgo";
import makeBuildUser from "./user";
import validator from "email-validator";

const makeUser = makeBuildUser({ Id, validator });

export default makeUser;
