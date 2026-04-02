const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobType: { type: String, enum: ['farmer', 'athlete', 'cop', 'doctor', 'business_owner'], required: true },
    salary: { type: Number, required: true },
    workTasks: { type: [String], required: true },
    taskCompletionStatus: { type: [Boolean], required: true },
    performanceRating: { type: Number, min: 1, max: 5 },
    employmentStatus: { type: String, enum: ['employed', 'unemployed', 'contract'], required: true }
});

module.exports = mongoose.model('Job', jobSchema);