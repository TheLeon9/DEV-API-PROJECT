const mongoose = require("mongoose");

const AssignmentsSchema = mongoose.Schema({
  startDate: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  endDate: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
 assignmentAmount: {
    type: Number,
    required: true
  },
 assignmentDescription: {
    type: String,
    required: true,
    minLength: 10
  },  
 assignmentTitle: {
    type: String,
    required:true,
    minLength: 4
  },
 assignmentJobs: {
    type: String,
    required:true,
    minLength: 4
  },
 assignmentSkills: {
    type: Array,
    required: true,
  },
 assignmentStatus : {
    type: String,
    required: true,
  },
 assignmentPeopleId : {
    type: Array,
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model(" assignments", AssignmentsSchema);