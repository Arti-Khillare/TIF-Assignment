const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'name is required'],
        trim : true
    },
    userId : {
        type : ObjectId,
        required : [true, 'userId is required'],
        ref : "users"
    },
    schoolId : {
        type : ObjectId,
        required : [true, 'schoolId is required'],
        ref : "schools"
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
module.exports = mongoose.model("students", studentSchema);

