import bcrypt from "bcrypt";
const saltRounds = 10;

const encrypt = async password => {
    const hashed = await bcrypt.hashSync(password, saltRounds);
    return hashed;
};

const compare = async (password, hashed) => {
    return await bcrypt.compareSync(password, hashed);
};

const PassAlgo = {
    encrypt,
    compare
};

export default PassAlgo;
