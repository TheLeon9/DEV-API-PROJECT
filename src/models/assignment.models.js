const mongoose = require("mongoose");

const AssignmentsSchema = mongoose.Schema(
  {
    startingDate: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 3,
      maxLength: 50,
    },
    endingDate: {
      type: String,
      lowercase: true,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    assignmentAmount: {
      type: Number,
      required: true,
    },
    assignmentDescription: {
      type: String,
      lowercase: true,
      required: true,
      minLength: 10,
    },
    assignmentTitle: {
      type: String,
      lowercase: true,
      required: true,
      minLength: 4,
    },
    assignmentJobs: {
      required: true,
      minLength: 1,
      maxLength: 20,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    },
    assignmentSkills: [
      {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
      },
    ],
    assignmentStatus: {
      type: String,
      lowercase: true,
      required: true,
    },
    assignmentPeopleId: [
      {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Freelance",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(" assignments", AssignmentsSchema);
