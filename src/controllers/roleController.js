const roleModel = require('../models/roleModel');
const validator = require('../valid/validator');

const createRole = async (req, res) => {
    try{
        const requestBody = req.body;
        const { name,scopes } = requestBody;
        const roleData = {name}
        if(scopes) {
            if(Array.isArray(scopes)) {
                roleData['scopes'] = [...scopes]
            }
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

const getAllRole = async (req, res) => {
     try{
    //     let { roleId: _id } = req.params;

    //     if (!validator.isValidObjectId(_id)) {
    //         return res.status(400).send({ status: false, message: `Invalid ID!` })
    //     }

    //     const roleData = await roleModel.findById(_id);
    //     if (!roleData) {
    //         return res.status(404).send({ status: false, message: `${_id} is not present in DB!` })
    //     }

        const roleDetail = await roleModel.find().select({name : 1, scopes:1, created:1, updated:1});
        res.status(200).send({status: true, message: `role details`, data: roleDetail})
    
    }
    catch (err)
    {
        return res.status(500).send({status: false, message: "Error", err : err.message})
    }
}
module.exports = {createRole, getAllRole}