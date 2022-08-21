const schoolModel = require('../models/schoolModel');
const studentModel = require('../models/studentModel');
const {validationResult} = require('express-validator');

const createSchool = async (req, res, next) => {
    try{
        const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
        const requestBody = req.body;
        const{name, city, state, country} = requestBody;

        const schoolData = {name, city, state, country};
        const school = await schoolModel.create(schoolData)
        res.status(200).send({status: true, message: `school created successfully`, data : school})
    }
    catch (err) {
        next()
    }
}

const getAllSchools = async (req, res) => {
    try{
       const schooolDetails = await schoolModel.find().select({name:1, city:1, state:1, country:1,created:1, updated:1})
       res.status(200).send({status: true, message: `school details`, data: schooolDetails})
    }
    catch (err) {
        res.status(500).send({status : false, message: "Error", err: err.message})
    }
}

const getAllSchoolStudents = async (req, res) => {
    try{
       
    let schoolDetail = await schoolModel.find().select({name:1,city:1, state:1,country:1, _id:1,created:1, updated:1})
   
   let studentDetails = await studentModel.find().select({_id:1, name:1, userId:1, schoolId:1, created:1, updated:1})

   let result = {_id:schoolDetail._id,name: schoolDetail.name, city:schoolDetail.city, state:schoolDetail.state,
     country:schoolDetail.country}
    
    
    const schoolwithStudent = await schoolModel.find().select({studentDetails})
    res.status(200).send({status: true, message: `schooldetail with student`, data:schoolwithStudent})
    
    }
    catch (err) {
        res.status(500).send({status: false, message: "Error", err: err.message});
    }
}
module.exports = {createSchool, getAllSchools, getAllSchoolStudents};