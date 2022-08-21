const mongoose = require('mongoose');

const roleSchema = new  mongoose.Schema({
    name :{
        type : String, 
        required : [true, 'name is required'],
        trim : true
    },
    scopes :[
        {type : String}
    ],
    created : {
        type : Date,
        default : Date.now
    },
    updated : {
        type : Date
    }
}) //{timestamps : true}


module.exports = mongoose.model("roles", roleSchema);