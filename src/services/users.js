import { userToken } from "../providers/tokens";
import { v4 as uuidv4 } from 'uuid';
import { GetAllUsers, getUserBy_id, UpdateUser, InsertUser, SignIn } from "../repositories/users";

export const InsertUser_Service = async (data) => {    
    const id = uuidv4();
    const token_data = {id: id};
    const token = userToken(token_data);
    data.token = token;
    data.id = id;
    data.criacao = new Date();
    data.ultimo_login = new Date();
    return await InsertUser(data);
}
export const SignIn_Service = async (login) => {
    const ValidateLogin = await SignIn(login);
    if (ValidateLogin !== null) {
        const token = userToken({id: ValidateLogin.id});
        await UpdateUser(ValidateLogin.id, {ultimo_login: new Date(), token: token});
        return ValidateLogin;
    }
    
    return false;
}
export const getUser = async (_req, res) => {
    const token = _req.headers['authorization'].split(" ")[1]; 
    const id = _req.params.id;
    const data = await getUserBy_id(id);
    if (data !== null) {
        if (token === data.token) {
            if (VerifyLastLogin(data.ultimo_login)) 
                return res.send({User: data});

            return res.status(401).send("Sessão inválida");
        }            
    }
    return res.status(404).send("Usuário não encontrado");
}
const VerifyLastLogin = (lastLogin) => {
    const LastHalfHour = new Date( Date.now() - 1000 * 60 * 30 ).getTime();
    if (lastLogin.getTime() > LastHalfHour)
        return true;

    return false;
}
export const getUsers = async () => {
    return await GetAllUsers();
}