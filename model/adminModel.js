const mongoose = require('mongoose');
const adminSchema=({
    name:String,
    email:String,
    password:String,
})
const AdminModel = mongoose.model('admin',adminSchema);

module.exports = {AdminModel};