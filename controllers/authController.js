const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");
const {attachCookiesToResposnce, createTokenUser} = require("../utils");


const register = async (req, res) =>{
  const {email, name, password} = req.body;
  const emailAlreadyExist = await User.findOne({email});
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  // first registered user is admin, else default is user
  const isFirstAcount = await User.countDocuments({}) === 0;
  const role = isFirstAcount ? "admin": "user";
  const user = await User.create({name, email, password, role});
  const tokenUser = createTokenUser(user);
  attachCookiesToResposnce({res, user: tokenUser});
  res.status(StatusCodes.CREATED).json({user: tokenUser});
};

const login = async (req, res) =>{
  const {email, password} = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({email});
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResposnce({res, user: tokenUser});
  res.status(StatusCodes.OK).json({user: tokenUser});
};

const logout = async (req, res) =>{
  // just remove cookie, exp in 5s
  res.cookie("token", "logout",
      {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000)});
  res.status(StatusCodes.OK).json({msg: "User log out!"});
};

module.exports = {
  register,
  login,
  logout,
};
