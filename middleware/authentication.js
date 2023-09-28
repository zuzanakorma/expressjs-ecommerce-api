const CustomError = require("../errors");
const {isTokenValid} = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  try {
    const {name, userId, role} = isTokenValid({token});
    req.user = {name, userId, role};
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions =(...roles)=>{
  // return function so in routes can be used as callback:
  // authorizePermissions("admin")
  return (req, res, next) =>{
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError("Unauthorized access");
    }
    next();
  };
};

module.exports = {authenticateUser, authorizePermissions};
