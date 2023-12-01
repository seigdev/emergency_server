const User = require("../models/user_model");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

var uid = uuidv4();

const register = (req, res) => {
  var userId = uid;
  var email = req.body.email;
  try {
    let userModel = new User({
      userId: userId,
      email: email,
      general_key: req.body.general_key,
      special_key: req.body.special_key,
    });
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.status(404).json({
          status: false,
          message: "User Already Exists.",
        });
      } else {
        userModel
          .save()
          .then((response) => {
            res.status(201).json({
              status: true,
              message: "User Created Successfully.",
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
  // Create a transporter object using the default SMTP transport
  var email = req.body.email;
  var password = req.body.password;
  var location = req.body.location;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
      user: "eightninemo@gmail.com",
      pass: "xybx wund jsem sdpe",
    },
  });

  // Email data
  const mailOptions = {
    from: {
      name: `EmergenceApp`,
      address: `sooreoluwwaa@gmail.com`,
    },
    to: "dee12ltd@gmail.com",
    subject: `Emergency Alert`,
    html: `<p>A user with the location ${location} is about to send an emergency alert. </p>`,
  };

  try {
    User.findOne({ email }).then((user) => {
      if (user) {
        if (password == user.general_key) {
          res.status(200).json({
            status: true,
            message: "User has full access.",
            data: user,
          });
        } else if (password == user.special_key) {
          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              res.status(400).json({
                status: false,
                message: error,
              });
            } else {
              console.log("Email sent:", info.response);
              res.status(200).json({
                status: true,
                message: "User has limited access.",
                data: user,
              });
            }
          });
        } else {
          res.status(404).json({
            status: false,
            message: "Invalid Key Provided.",
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
