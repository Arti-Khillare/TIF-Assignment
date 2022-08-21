const express = require('express');
const router = express.Router();

//imported controller file
const UserController = require("../controllers/userController");
const roleController = require("../controllers/roleController");
const studentController = require("../controllers/studentController");
const schoolController = require("../controllers/schoolController");

//imported middleware for authorization
const middleware = require("../middleware/auth")

//imported express-validator and validator
const { checkSchema } = require("express-validator");
const {userDataValidateChainMethod, schoolDataValidate} = require("../valid/validator");


// using chain api validation from express-validator
/*--userAPI's--*/
router.post('/user/signup', userDataValidateChainMethod, UserController.userSignUp);
router.post('/user/signin', UserController.userSignIn);
router.get('/user', UserController.getUsers)
router.get('/user/:id' , middleware.auth, UserController.getUserById);

/*--roleAPI's--*/
router.post('/role', roleController.createRole);
router.get('/role', roleController.getAllRole);

/*--studentAPI's--*/
router.post('/student', studentController.createStudent);
router.get('/student', studentController.getAllStudents);

/*--schoolAPI's**/
router.post('/school', schoolDataValidate, schoolController.createSchool);
router.get('/school', schoolController.getAllSchools);
router.get('/school/students', schoolController.getAllSchoolStudents);


//exporting router 
module.exports = router;