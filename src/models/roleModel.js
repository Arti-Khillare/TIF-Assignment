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


//exporting schema with the model created by using mongoose
module.exports = mongoose.model("roles", roleSchema);