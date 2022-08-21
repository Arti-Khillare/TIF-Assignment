const mongoose = require('mongoose');


const isValidObjectId = function(ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId) 
}

const isValidString = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'number' && value.toString().trim().length === 0) return false
    if(typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}


 
const { body } = require("express-validator");
  
  const userDataValidateChainMethod = [
    body("first_name")
      .exists({ checkFalsy: true })
      .withMessage("first_name is required")
      .isString()
      .withMessage("first_name should be string"),
    body("last_name")
      .exists({ checkFalsy: true })
      .withMessage("last_name is required")
      .isString()
      .withMessage("last_name should be string"),
    body("email")
    .optional()
    .isEmail()
    .withMessage("Provide valid email"),
    body("mobile")
      .exists({checkFalsy: true})
      .withMessage("mobile is required")
      .optional()
      .isString()
      .withMessage("mobile number should be string")
      .matches(/^(\+91)?(-)?\s*?(91)?\s*?([6-9]{1}\d{2})-?\s*?(\d{3})-?\s*?(\d{4})$/)
      .withMessage("mobile number must be valid"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password should be string")
      .isLength({ min: 8, max :15 })
      .withMessage("Password should be min 8 characters and max 15 characters")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character")

  ];
  
  const schoolDataValidate = [
    body("name")
        .exists({checkFalsy : true})
        .withMessage("name is required")
        .isString()
        .withMessage("name should be string"),
    body("city")
        .exists({checkFalsy : true})
        .withMessage("city is required")
        .isString()
        .withMessage("city should be string"),
    body("state")
        .exists({checkFalsy : true})
        .withMessage("state is required")
        .isString()
        .withMessage("state should be string"),
    body("country")
        .exists({checkFalsy : true})
        .withMessage("country is required")
        .isString()
        .withMessage("country should be string")
  ]
    
  module.exports = {
    isValidObjectId,
    isValidString,
    userDataValidateChainMethod,
    schoolDataValidate
  };