import jwt from 'jsonwebtoken';
import {PRIVATE} from '../config/jwt';

export const userToken = (user) => { 
  const tokenJwt = jwt.sign({User: user}, PRIVATE, { expiresIn: '2h' });
  return tokenJwt;
};
export const decriptToken = (token) => {
  return new Promise((resolve, reject) => {

    jwt.verify(token, PRIVATE, function(err, decode) {
      if (err)
        return reject(err);

      resolve(decode);
    });
  });
};

export const ValidateToken = (token) => {
  return jwt.verify(token, PRIVATE, function(err) {
    if (err)
      return false;

    return true;
  });
}