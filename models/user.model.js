/**
 * This will hold the schema for the user
 *
 * It explain the different fields of use and how it will be stored in mongodb
 */

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      minLength: 10,
      lowercase: true,
    },
    userType: {
      type: String,
      require: true,
      default: "Customer",
      enum: ["Customer", "Admin"],
    },
  },
  { timestamps: true }
);

/**
 * Define the collection name where it will be stored
 */

module.exports = mongoose.model("User", userSchema);
