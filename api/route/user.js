var express = require("express")
var router = express.Router()
var fileUpload = require('express-fileupload')
var userController = require('../controller/userController')
var jwt = require('jsonwebtoken');

router.post("/createUser", async function (req, res, next) {
    try {
        const response = await userController.createUser(req.body);
        var token = jwt.sign({ email: req.body.email }, 'vvv');
        req.session.token = token
        return res.send(response);
    } catch (Error) {
        var a = Error.message.search('duplicate')
        if (a > 0) {
            return res.status(500).send({ message: 'Email is existed input another email' })
        }
    }


})

router.post("/userLogin", async function (req, res, next) {
    try {
        const response = await userController.userLogin(req, req.body)
        return res.send(response)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.get("/userProfile/:token", async function (req, res, next) {
    try {
        const response = await userController.userProfile(req)
        return res.send(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})
router.post("/userLogout", function (req, res, next) {
    const response = userController.userLogout(req);
    return res.send(response)
})

router.put("/userUpdate", fileUpload(), async function (req, res, next) {
    try {
        var fileName
        if (req.files) {
            fileName = req.files.image.name;
            var file = req.files.image
            file.mv('../projectcinema1/public/images/' + fileName)
        }
        if(fileName) {
            fileName = "/images/" + fileName
        }
        await userController.userUpdate(req, fileName)
        return res.send()
    } catch (error) {
        return res.status(500).send(error)
    }
})
module.exports = router