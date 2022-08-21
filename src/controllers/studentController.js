const studentModel = require('../models/studentModel');
const validator = require('../valid/validator');

const createStudent = async (req, res) => {
    try{
        const requestBody = req.body;
        const {name, userId, schoolId} = requestBody

        if(!validator.isValidString(name)) {
            return res.status(400).send({status : false, message: `name must be in string`})
        }
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: `userID is invalid` })
        }

        if (!validator.isValidObjectId(schoolId)) {
            return res.status(400).send({ status: false, message: `schoolID is invalid` })
        }

        const studentInfo = await studentModel.create(requestBody);
        res.status(200).send({status: true, message : `student created successfully`, data: studentInfo});
    }
    catch (err) {
        res.status(500).send({status: false, message : "Error", err : err.message})
    }
}

const getAllStudents = async (req, res)  => {
    try{
        const studentDetail = await studentModel.find().select({name : 1, userId:1, schoolId:1, created :1, updated:1});
        res.status(200).send({status: true, message: `school details`, data: studentDetail})
    }
    catch (err) {
        res.status(500).send({status: false, message: "Error", err : err.message});
    }
}
module.exports = {createStudent, getAllStudents}