const userModel = require('../models/userModel');
const validator = require('../valid/validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');


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
    let { first_name, last_name, email, mobile, password } = requestBody
    //check uniqueemail 
    const isuniqueEmailCheck = await userModel.findOne({ email: email });
    if (isuniqueEmailCheck) {
      return res.status(400).send({ status: false, message: `${email} is already registered as unique email is required!` });
    }
    if(!validator.isValidString(password)) {
      return res.status(400).send({status: false, message: `${password}  provide valid string password`})
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    requestBody['password'] = await bcrypt.hash(password, salt)

    const userData = { first_name, last_name, email, mobile, password }
    let user = await userModel.create(requestBody)
    res.status(200).json({ success: true, message: `user created successfully`, data: user });
  } catch (err) {
    next(err);
  }
};

const userSignIn = async (req, res) => {
  try {
    const requestBody = req.body;
    const { email, password } = requestBody;


    //check user password with hashed password stored in database
    const checkexistUser = await userModel.findOne({ email: email })
    if (checkexistUser) {
       const checkPassword =  bcrypt.compare(password, checkexistUser.password)
       if (!checkPassword) {
        return res.status(400).send({ status: false, message: `password or email is incorrect` })
       }
    }
    else {
      return res.status(400).send({ status: false, message: `email or password is incorrect` })
    }

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
    res.status(201).send({ status: true, message: `user signin successfully`, data: loginData })
  }
  catch (err) {
    res.status(500).send({ status: false, message: "Error", err: err.message });
  }
}

const getUsers = async (req, res) => {
  try {
    

    const users = await userModel.find().select({ first_name:1, last_name:1,  email:1, mobile:1, password:1, created:1, updated:1});
    res.status(200).send({ status: true, message: `user Details`,data: users });

  }
  catch (err) {
    res.status(500).send({ msg: "Error", err: err.message })
  }
}

const getUserById = async (req, res) => {
  try {
        let { id : _id } = req.params

        //authorization
        if (req.userId !== _id) {
          return res.status(403).send({ status: false, message: `you are not authorizated` })
      }

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
module.exports = { userSignUp, userSignIn, getUsers, getUserById };