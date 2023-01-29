const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = mongoose.Schema(
  {
    // Require
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 3,
      maxLength: 20,
    },
    adminMail: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    adminPassword: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
    },
    // Pas Require
    accountType: {
      type: String,
      default: "Admin",
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    adminAddress: {
      type: String,
      default: "hehe",
    },
    adminCity: {
      type: String,
      default: "Paris",
    },
    adminPostal: {
      type: Number,
      default: 99999,
    },
    adminPhone: {
      type: String,
      default: "00-00-00-00-00",
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre("save", function (next) {
  if (!this.isModified("adminPassword")) {
    return next();
  }
  const hashedPassword = bcrypt.hashSync(this.adminPassword, 10);
  this.adminPassword = hashedPassword;
  next();
});

module.exports = mongoose.model("admin", AdminSchema);
