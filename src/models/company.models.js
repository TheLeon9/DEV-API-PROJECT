const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CompanySchema = mongoose.Schema(
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
      default: "Company",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userAddress: {
      type: String,
      default: "",
      lowercase: true,
    },
    userCity: {
      type: String,
      default: "",
      lowercase: true,
    },
    userPostal: {
      type: Number,
      default: 0000,
    },
    userPhone: {
      type: String,
      default: "00-00-00-00-00",
    },
    // Company Data
    //  Require
    companyName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    companyStatus: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 8,
    },
    companySiret: {
      type: Number,
      required: true,
      minLength: 9,
      maxLength: 9,
    },
    companyHeadOfficeCity: {
      type: String,
      required: true,
      lowercase: true,
    },
    // Pas Require
    companyHeadOfficeAddress: {
      type: String,
      default: "",
      lowercase: true,
    },
    companyHeadOfficePostal: {
      type: Number,
      default: 00000,
    },
  },
  {
    timestamps: true,
  }
);
CompanySchema.pre("save", function(next) {
  if(!this.isModified("userPassword")){
    return next();
  }
  const hashedPassword = bcrypt.hashSync(this.userPassword, 10);
  this.userPassword = hashedPassword;
  next();
})

module.exports = mongoose.model("company", CompanySchema);
