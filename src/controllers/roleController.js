const roleModel = require('../models/roleModel');
const validator = require('../valid/validator');


//create roleAPI function
const createRole = async (req, res) => {
    try{
        const requestBody = req.body;
        const { name,scopes } = requestBody;
        const roleData = {name}
        //if scopes  then it will check that it is array format 
        if(scopes) {
            if(Array.isArray(scopes)) {
                roleData['scopes'] = [...scopes]
            }
            //it check that it is string form
            if(Object.prototype.toString.call(scopes) === '[object String]') {
                roleData['scopes'] = [ scopes ]
            }
        }
        const roleCreated = await roleModel.create(roleData);
        return res.status(200).send({status: true, message: `role created successfully`, data: roleCreated});
    }
    catch (err) {
        return res.status(500).send({status: false, message : "Error", err : err.message})
    }
}


//get AllRole present in db
const getAllRole = async (req, res) => {
     try{
    
        const roleDetail = await roleModel.find().select({name : 1, scopes:1, created:1, updated:1});
        res.status(200).send({status: true, message: `role details`, data: roleDetail})
    }
    catch (err)
    {
        return res.status(500).send({status: false, message: "Error", err : err.message})
    }
}

//exporting all above controller function to use it into other file
module.exports = {createRole, getAllRole}