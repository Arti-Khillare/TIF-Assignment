const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : [true, 'first_name is required'],
        trim : true
    },
    last_name : {
        type : String,
        required : [true, 'last_name is required'],
        trim : true
    },
    email : {
        type : String,
        trim :true,
        required : [true, 'email is required'],
        unique :true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    mobile : {
        type : String,
        trim : true,
        required : [true, 'mobile is required'],
        match:/^(\+91)?(-)?\s*?(91)?\s*?([6-9]{1}\d{2})-?\s*?(\d{3})-?\s*?(\d{4})$/
    },
    password : {
        type : String,
        trim : true,
        required : [true, 'password is required']
    },
    roleId : {
        type : ObjectId,
        //required : [true, 'roleId is required'],
        ref : "roles",
        default : null
    },
    created : {
        type : Date,
        default : Date.now
    },
    updated : {
        type : Date,
        default : null
    },
}) //{timestamps : true}


//exporting schema with the model created by using mongoose
module.exports = mongoose.model("Users", userSchema);

