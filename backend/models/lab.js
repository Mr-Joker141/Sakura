const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    sex:{
        type:String
    },
    type:{
        type:String,
        required:true
    },
    result:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    status:String
    
});

module.exports = mongoose.model('labdb', labSchema);