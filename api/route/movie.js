var express = require("express");
var router = express.Router();
var fileUpload = require('express-fileupload')
var movieController = require("../controller/movieController");
router.post("/create",fileUpload() ,async function (req, res, next) {
    try {
        var fileName = req.files.image.name;
        req.body.image = '/images/'+ fileName;
        const response = await movieController.createMovie(req.body)
        var file = req.files.image
        file.mv('../projectcinema1/public/images/' + fileName, function (err) {
            if(err) {
                return res.send(response);
            } else {
               return res.send(response);
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/list", async function (req,res) {
    try {
        const response = await movieController.getFilm()
        return res.send(response);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/:id",async function (req,res) {
    try {
        const response = await movieController.getDetail(req.params.id)
        return res.send(response);
    } catch (error) {
        
    }
})
module.exports = router