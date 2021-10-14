import { MongoClient } from 'mongodb';

export const DoConnect = async () => {
    const dbName = 'Sky';
    const uri = "mongodb+srv://Sky:Teste@cluster0.v00tj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return await client.db(dbName);
}