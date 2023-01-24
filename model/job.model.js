const mongoose = require('mongoose');

const jobScheme = ({
    company:String,
    contract:String,
    position:String,
    location:String
})
const JobModel = mongoose.model('job',jobScheme);
module.exports = {JobModel}