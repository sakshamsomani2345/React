const User = require("../models/User");
const bcrypt = require("bcryptjs");
const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(400).json({ message: "No users Found" });
  }
  return res.status(200).json({ users });
};
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    res.status(400).json({ message: "already created please login" });
  }
  const hashpass = bcrypt.hashSync(password);
  const user = new User({ name, email, password: hashpass, blogs: [] });
  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "please signup" });
  }
  const ispass = bcrypt.compareSync(password, existingUser.password);
  if (!ispass) {
    return res.status(400).json({ message: "incorrect password" });
  }
  return res.status(200).json({ message: "login successfull" ,user:existingUser});
};
module.exports = {
  getAllUser,
  signup,
  login,
};
