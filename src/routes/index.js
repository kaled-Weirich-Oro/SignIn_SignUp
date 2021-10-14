import { Router } from 'express';
import { name, version, author } from '../../package';
import { getUser, getUsers, SignIn_Service, InsertUser_Service } from '../services/users';
import { SignUp, Validate } from '../middlewares/users';
import { reset } from 'nodemon';

export const router = Router()

router.get('/', (_req, res) => res.json({ name, version, author }))

router.get('/ping', (_req, res) => res.send('pong'))

router.get('/healthz', (_req, res) => res.send('OK'))

router.post('/signup', SignUp, async (_req, res) => {
    res.send({signUp: await InsertUser_Service(_req.body)});
});

router.post('/signIn', async (_req, res) => {
    const validLogin = await SignIn_Service(_req.body);
    console.log('Validalogin ', validLogin);
    if (validLogin) {
        res.send({signIn: validLogin});
    }

    res.status(401).send("Usuário e/ou senha inválidos");
});
router.get('/user/:id', Validate, async (_req, res) => {
    return await getUser(_req, res);
});
router.get('/users', Validate, async (_req, res) => {
    const token = _req.headers['authorization'].split(" ")[1];
    res.send({Users: await getUsers(token)});
})