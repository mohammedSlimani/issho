import bcrypt from "bcrypt";
const saltRounds = 10;

const encrypt = async password => {
    return await bcrypt.hashSync(password, saltRounds);
};

const compare = async (password, hashed) => {
    return await bcrypt.compareSync(password, hashed);
};

const PwdAlgo = {
    encrypt,
    compare
};

export default PwdAlgo;
