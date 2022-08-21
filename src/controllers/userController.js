const userModel = require('../models/userModel');
const validator = require('../valid/validator');
const bcrypt = require('bcrypt');
const saltRounds = 10; //adding the random number 10keys for hashing
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

//creating  the user for signup
const userSignUp = async (req, res, next) => {
  try {

    const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const requestBody = req.body;

    // destructing all require element
    let { first_name, last_name, email, mobile, password } = requestBody

    //check uniqueemail and return error if same email occur
    const isuniqueEmailCheck = await userModel.findOne({ email: email });
    if (isuniqueEmailCheck) {
      return res.status(400).send({ status: false, message: `${email} is already registered as unique email is required!` });
    }
    if(!validator.isValidString(password)) {
      return res.status(400).send({status: false, message: `${password}  provide valid string password`})
    }

    //generating the normal password to hashing form 
    const salt = bcrypt.genSaltSync(saltRounds);
    requestBody['password'] = await bcrypt.hash(password, salt)

    const userData = { first_name, last_name, email, mobile, password }
    let user = await userModel.create(requestBody)
    res.status(201).json({ success: true, message: `user created successfully`, data: user });
  } catch (err) {
    next(err);
  }
};

//user signin API after registering
const userSignIn = async (req, res) => {
  try {
    const requestBody = req.body;
    const { email, password } = requestBody;


    //check user password with hashed password stored in database
    const checkexistUser = await userModel.findOne({ email: email })
    if (checkexistUser) {
      //compare the password store in database and if it is match with it 
       const checkPassword =  bcrypt.compare(password, checkexistUser.password)
       if (!checkPassword) {
        return res.status(400).send({ status: false, message: `password or email is incorrect` })
       }
    }
    else {
      return res.status(400).send({ status: false, message: `email or password is incorrect` })
    }

    //then it will generate the token
    const token = jwt.sign(
      {
        userId: checkexistUser._id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60
      },
      "tifSecretKey"
    );

    res.setHeader("Authorization", token);
    const user_Id = checkexistUser._id
    const newData = await userModel.findById(user_Id);
    const loginData = { newData, token: token }
    res.status(200).send({ status: true, message: `user signin successfully`, data: loginData })
  }
  catch (err) {
    res.status(500).send({ status: false, message: "Error", err: err.message });
  }
}

//get allusers store in userdb
const getUsers = async (req, res) => {
  try {
    

    const users = await userModel.find().select({ first_name:1, last_name:1,  email:1, mobile:1, password:1, created:1, updated:1});
    res.status(200).send({ status: true, message: `user Details`,data: users });

  }
  catch (err) {
    res.status(500).send({ msg: "Error", err: err.message })
  }
}

//get user by providing the userId
const getUserById = async (req, res) => {
  try {
        let { id : _id } = req.params

        // check that user is authorized to perform this task
        if (req.userId !== _id) {
          return res.status(403).send({ status: false, message: `you are not authorizated` })
        }

        //check provided userId is present in userdb
        const userData = await userModel.findById(_id );
        if (!userData) {
            return res.status(404).send({ status: false, message: `userId is not present in DB!` })
        }

        const newData = await userModel.findById({ _id : _id});
        return res.status(200).send({ status: true, message: `User Profile details`, data: newData })

 }
  catch (err) {
     res.status(500).send({status: false, message : "Error", err : err.message})
  }
}

//exporting the all the api controller functions to import it into the other file
module.exports = { userSignUp, userSignIn, getUsers, getUserById };