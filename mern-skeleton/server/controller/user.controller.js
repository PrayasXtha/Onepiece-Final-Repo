import User from '../model/user.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    console.log("User created:", user);

  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: 'User not found',
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    console.log("user updated")
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      updated: user.updated,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    await User.deleteOne({ _id: user._id });
    user.hashed_password = undefined;
    user.salt = undefined;
    console.log("delete succesful");
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      deleted: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, userByID, read, list, remove, update };
