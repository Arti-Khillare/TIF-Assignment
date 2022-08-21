const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'name is required'],
        trim : true
    },
    city : {
        type : String,
        required : [true, 'city is required'],
        trim : true
    },
    state : {
        type : String,
        required : [true, 'state is required'],
        trim : true
    },
    country : {
        type : String,
        required : [true, 'country is required'],
        trim : true
    }, 
    created : {
        type : Date,
        default : Date.now
    },
    updated : {
        type : Date,
        default : null
    }
})


//exporting schema with the model created by using mongoose
module.exports = mongoose.model("schools", schoolSchema);

