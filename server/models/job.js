const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    position: String,
    company: String,
    location: String,
    status: String,
    type: String,
    date: String
});

const Job = mongoose.model('job', jobSchema);

module.exports = Job;