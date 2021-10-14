import { verifyExistEmail } from "../repositories/users";
import { ValidateToken } from "../providers/tokens";

export const SignUp = async (_req, res, next) => {
    const { email } = _req.body;
    const validEmail = await verifyEmail(email);
    if (!validEmail)
        return res.status(500).send("E-mail já existente!");
    next();
};
export const Validate = async (_req, res, next) => {
    const token = _req.headers['authorization'].split(" ")[1];
    if (! await ValidateToken(token))
        return res.status(401).send("Não autorizado");
 
    next();
}
const verifyEmail = async (email) => {
    const valid = await verifyExistEmail(email);
    if (valid !== null)
        return false;
    
    return true;
}