var express = require("express");
var router = express.Router();
var fileUpload = require('express-fileupload')
var movieController = require("../controller/movieController");
router.post("/create",fileUpload() ,async function (req, res) {
    try {
        const response = await movieController.createMovie(req.body)
        var fileName = req.files.file.name;
        file.mv('/images/' + fileName, function (err) {
            if(err) {
                console.log(err);
            } else {
                console.log('uploaded')
            }
        })
        return res.send(response);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/list", async function (req,res) {
    try {
        const response = await movieController.getFilm();
        return res.send(response);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
module.exports = router