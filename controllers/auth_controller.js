const encryption = require("./encryption");
const User = require("../models/user_model");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

var uid = uuidv4();
const encryptionKey = crypto.randomBytes(32);

const register = (req, res) => {
  var userId = uid;
  try {
    let userModel = new User({
      userId: userId,
      email: req.body.email,
      general_key: req.body.general_key,
      special_key: req.body.special_key,
    });
    User.findOne({ userId: userId }).then((user) => {
      if (user) {
        res.status(404).json({
          status: false,
          message: "User Already Exists.",
        });
      } else {
        userModel
          .save()
          .then((response) => {
            res.json({
              status: true,
              message: "User Added Successfully.",
              data: response,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json({
              status: false,
              message: "Bad Request.",
            });
          });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      message: "Internal Server Error.",
    });
  }
};

const login = (req, res) => {
  try {
    var userId = req.body.userId;
    var password = req.body.password;
    User.findOne({ userId }).then((user) => {
      if (user) {
        if (password == user.general_key) {
          res.status(200).json({
            status: true,
            message: "User has full access.",
            data: user,
          });
        } else if (password == user.special_key) {
          res.status(200).json({
            status: true,
            message: "User has limited access.",
            data: user,
          });
        }
      } else {
        res.status(404).json({
          status: false,
          error: "User not found.",
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      message: "Internal Server Error.",
    });
  }
};

module.exports = { register, login };
