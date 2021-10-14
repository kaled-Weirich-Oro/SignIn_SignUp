import { DoConnect } from '../config/database';

export const getAllUsers = async () => {
    const query = await Users();
    const data = query.find({}).toArray();
    return await data;
}
export const getUserBy_id = async (id) => {
    const query = await Users();
    const data = await query.findOne({id: id});
    return data;
}

export const InsertUser = async (user) => {
    const query = await Users();
    const data = await query.insertOne(user);
    if (data)
        return {Id: user.id};

    return {Error: true};
}

export const SignIn = async (login) => {
    const { email, senha} = login;
    const query = await Users();
    return await query.findOne({email: email, senha: senha});
}
export const UpdateUser = async (id, obj) => {
    const query = await Users();
    const data = await query.updateOne({id: id}, { $set: obj});
    return data;
}
export const verifyExistEmail = async (email) => {    
    const query = await Users();
    const data = query.findOne({ email: email });
    return await data;
}
const Users = async () => {
    const connect = await DoConnect();
    return await connect.collection('Users');
}