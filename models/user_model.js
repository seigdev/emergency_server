const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {
      type: String,
    },
    email: {
      type: String,
    },
    general_key: {
      type: {},
    },
    special_key: {
      type: {},
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
