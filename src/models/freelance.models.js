const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const FreelanceSchema = mongoose.Schema(
  {
    // User Data
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
    userMail: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
    },
    // Pas Require
    accountType: {
      type: String,
      default: "Freelance",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userAddress: {
      type: String,
      default: "",
    },
    userCity: {
      type: String,
      default: "",
    },
    userPostal: {
      type: Number,
      default: 0000,
    },
    userPhone: {
      type: String,
      default: "00-00-00-00-00",
    },
    // Freelance Data
    //  Require
    yearEx: {
      type: Number,
      required: true,
      maxLength: 3,
    },
    // Pas Require
    dailyTax: {
      type: Number,
      default: 100,
    },
    skills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "skills"
    },
    jobs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs"
    },
  },
  {
    timestamps: true,
  }
);
FreelanceSchema.pre("save", function(next) {
  if(!this.isModified("userPassword")){
    return next();
  }
  const hashedPassword = bcrypt.hashSync(this.userPassword, 10);
  this.userPassword = hashedPassword;
  next();
})
module.exports = mongoose.model("freelance", FreelanceSchema);
