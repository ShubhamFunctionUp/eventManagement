const jwt = require("jsonwebtoken");
const UserModel = require('../model/userModel')


//-------------------authentication---------------------------------//


const authentication = async function (req, res, next) {
  try {

    let token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(404)
        .send({ status: false, message: "Please pass token" });
    }

    let tokenIsVerify = jwt.verify(token, "Shubham")
    if(!tokenIsVerify){
      return res.status(404).send({status:false,message:"Token is not valid"})
    } 

    next();
    
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//---------------------------Authorization---------------------------------------------------------------//



const authorization = async function (req, res, next) {
    try {
      let token = req.headers["x-auth-token"];
  
      if (!token) {
        return res.status(404).send({ status: false, message: "Please pass token" });
      }

    

     let decodedToken =jwt.verify(token, "Shubham")
  
         let email = req.body.email
         let isUserPresent = await UserModel.findOne(email);

        if(!isUserPresent){
         return res.status(400).send({status:false,msg:"Failure"})
         }

  
          if (isUserPresent._id != decodedToken.userId) {
            return res
              .status(403)
              .send({ status: false, message: "You are not authorized" });

          } else {

            next();

          }

    } catch (error) {

      return res.status(500).send({ status: false, message: error.message });

    }
  };

  module.exports.authentication = authentication
  module.exports.authorization = authorization