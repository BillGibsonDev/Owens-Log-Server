import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

export const createTokens = (user) => {
  const accessToken = sign(
    { 
      email: user.email, 
      id: user._id,
    },
    `${process.env.NODE_ENV_JWT_SECRET}`,
    { expiresIn: '12h' }
  );
  return accessToken;
};

export const validateToken = (req, res, next) => {
  const { token } = req.body;
  try {
    const validToken = verify(token, `${process.env.NODE_ENV_JWT_SECRET}`);
    if (validToken) {
      req.authenticated = true;
      res.status(200).json('token is valid')
      return next();
    } else {
      res.json('Token Not Valid');
    }
  } catch (err) {
    console.log(err);
    res.json('Token Not Valid');
  }
};

export const validateUser = ( token ) => {
  const validToken = verify(token, `${process.env.NODE_ENV_JWT_SECRET}`);
  if(validToken){
    return true;
  } else {
    return false;
  }
}

export const validateAdmin = ( token ) => {
  const validToken = verify(token, `${process.env.NODE_ENV_JWT_SECRET}`);
  if(validToken.role === process.env.NODE_ENV_ADMIN_SECRET ){
    return true;
  } else {
    return false;
  }
}

export const getUserFromToken = (token) => {
  try {
    const validToken = verify(token, `${process.env.NODE_ENV_JWT_SECRET}`);
    if (validToken) {
      return `${validToken.email}`;
    } else {
      console.log('Token Not Valid');
    }
  } catch (err) {
    console.log(err);
    res.json('Token Not Valid');
  }
};