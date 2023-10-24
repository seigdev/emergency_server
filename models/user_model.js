const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    general_key: {
      type: String,
      required: true,
    },
    special_key: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
