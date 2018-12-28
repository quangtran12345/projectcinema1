var express = require("express")
var router = express.Router()
var userController = require('../controller/userController')
var jwt = require('jsonwebtoken');

router.post("/createUser", async function(req,res,next) {
        try {
            const response =  await userController.createUser(req.body);
            var token =  jwt.sign({ email : req.body.email }, 'vvv');
            req.session.token = token
            return res.send(response);
        } catch(Error) {
           var a = Error.message.search('duplicate')
           if(a > 0) {
              return res.status(500).send({message: 'Email is existed input another email'})
           }
        }
        
  
})

router.post("/userLogin", async function(req,res,next) {
    try {
        const response = await userController.userLogin(req.body)
        var email = response.userInfor.email
        var password = response.userInfor.password
        var oldEmail = req.body.email
        var oldPassword = req.body.password
        if((email !== oldEmail) || (password !== oldPassword)) {
            throw new Error("Username or password is invalid !")
        } 
            var token =  jwt.sign({ email : email }, 'vvv');
            req.session.token = token
            return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post("/userLogout", function (req,res,next) {
    const response = userController.userLogout(req);
    return res.send(response)
})
module.exports = router