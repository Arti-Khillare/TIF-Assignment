const jwt = require('jsonwebtoken');


const auth = async function (req, res, next) {

    try {
        //providing the authorization with bearer token in header
        const bearerHeader = req.header('Authorization', 'Bearer Token')

        //if token is not provided then it will return token is required
        if (!bearerHeader) {
            return res.status(400).send({ status: false, msg: "token is required" })
        }

        // after spliting bearer and take bearer token which is present at index=1
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        //verify jwt token by using secret key provided
        let decodetoken = jwt.verify(token, "tifSecretKey")
        if (!decodetoken) {
            return res.status(401).send({ status: false, msg: "please enter the right token" })
        }

        //console.log(decodetoken.userId)
        // to check the userId have the verfied token and token which is sign to the user
        req.userId = decodetoken.userId
        next()

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }
}


//exporting middleware
module.exports = {
    auth,
  };