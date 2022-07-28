const UserModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const validator = require('../validator/validator')

const createUser = async (req, res) => {
    try {
        let {
            title,
            name,
            email,
            password
        } = req.body


        if(!validator.isValid(name)){
            return res.status(400).send({
                status: false,
                msg: "Please insert inside the name"
            })
        }


        if (!validator.isValid(title)) {
            return res.status(400).send({
                status: false,
                msg: "Please insert inside the title"
            })
        }

        if (!["Mr", "Mrs", "Miss"].includes(title)) {
            return res.status(400).send({
                status: false,
                msg: "Please insert title among Mr,Mrs or Miss"
            })
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({
                status: false,
                msg: "email is not valid"
            })
            return
        }

        let isEmailPresent = await UserModel.findOne({
            email: email
        });
        if (isEmailPresent) {
            return res.status(400).send({
                status: false,
                msg: "Email is already present"
            })
        }

        if(!(password.length>7 && password.length<=16)){
            return res.status(400).send({status:false,msg:"Please follow correct password format"})
        }


        let userCreated = await UserModel.create(req.body)
        return res.status(201).send({
            status: true,
            data: userCreated
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}


const login = async (req, res) => {


    let email = req.body.email;
    let password = req.body.password;

    if (!validator.isValid(email)) {
        return res
            .status(400)
            .send({
                status: false,
                message: "enter valid email"
            });
    }

    let userIsPresent = await UserModel.findOne({
        email: email
    });

    if (!userIsPresent) {
        return res.status(400).send({
            status: false,
            msg: "false",
            data: "Email is not correct"
        })

    }

    let actualPassword = await userIsPresent.isValidPassword(password)

    if (!actualPassword) {
        return res.status(400).send({
            status: false,
            msg: "false",
            data: "password is not correct"
        })

    }

    console.log(actualPassword);

    let token = jwt.sign({
        userId: userIsPresent._id
    }, "Shubham");

    return res.status(200).send({
        status: true,
        message: "Token is generated Successfully",
        data: token
    });


}

const logout = async (req, res) => {

    try {
        let token = req.headers["x-auth-token"];
        if (!token) {
          return res
            .status(404)
            .send({ status: false, message: "Please pass token" });
        }
        console.log(req.headers);
         res.setHeader("x-auth-token",token + "1")
      return res.status(200).send({
        status: true,
        message: "Token is destroy Successfully"
    });



    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }


}


let changePassword = async(req,res)=>{

    try {
        
        let {email,password,newPassword} = req.body;
        
        let isUserPresent = await UserModel.findOne({email});
        if(!isUserPresent){
            return res.status(400).send({status:false,msg:"Failure"})
        }


        let actualPassword = await isUserPresent.isValidPassword(password)

        if (!actualPassword) {
            return res.status(400).send({
                status: false,
                msg: "false",
                data: "password is not correct"
            })
    
        }

        let updatePassword = await UserModel.findByIdAndUpdate({_id:isUserPresent._id},{$set:{password:newPassword}},{new:true})

        return res.status(201).send({
            status: true,
            message: "Password is changed Successfully",
            data: updatePassword
        });


    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }


}


let updatePassword = async(req,res)=>{
    try {
        let {email,newPassword} = req.body;

        let isUserPresent = await UserModel.findOne({email});
        if(!isUserPresent){
            return res.status(400).send({status:false,msg:"Failure"})
        }


        let updatePassword = await UserModel.findByIdAndUpdate({_id:isUserPresent._id},{$set:{password:newPassword}},{new:true})

        return res.status(201).send({
            status: true,
            message: "Password is updated Successfully",
            data: updatePassword
        });


    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }

}

module.exports.updatePassword = updatePassword
module.exports.changePassword = changePassword
module.exports.logout=logout
module.exports.login = login
module.exports.createUser = createUser;