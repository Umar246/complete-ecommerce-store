const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.REACT_APP_JWT_SECRET_KEY;
console.log("JWT_SECRET_KEY: ", SECRET_KEY);

//* 1- GENRATE TOKEN ON THE BASE OF USERID
const genrateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

//* 2- GET USER ID IF YOU HAVE TOKEN
const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

const jwtProvider = { genrateToken, getUserIdFromToken };
module.exports = jwtProvider;
