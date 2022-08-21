const express = require('express');
const bodyParser = require('body-parser'); //to parse the json request body
const mongoose = require('mongoose');
const route = require('./routes/route.js');
require('dotenv').config();

const app = express();
app.use(bodyParser.json()); //to handle json data or create
app.use(bodyParser.urlencoded({extended: true})); //x-www-form-urlencoded parser

// connecting to mongodb atlas string
// mongoose.connect("mongodb+srv://ArtiKhillare:jR067NcnClM96Fp1@cluster0.wi9j2.mongodb.net/tifAssignDB?retryWrites=true&w=majority",
//  {
//     useNewUrlParser : true
//  }
// )
// .then(() => console.log("Mongodb is successfully connected"))
// .catch(err => console.log(err));
mongoose.connect(process.env.MONGODB_CLUSTER).then(()=>{
    console.log("Mongodb is connected !"); 
}).catch((error)=>{
    console.log(error)
});


app.use('/' , route);
app.listen(process.env.PORT || 3000, function () {
    console.log(`Express app is running on port `  +(process.env.PORT || 3000));
})