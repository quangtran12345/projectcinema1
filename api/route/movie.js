var express = require("express");
var router = express.Router();
var fileUpload = require('express-fileupload')
var movieController = require("../controller/movieController");
var secretCode = require("../properties")
var authorUser = require("../controller/authorUser")

router.post("/create", fileUpload(), async function (req, res, next) {
    try {
        if (req.files) {
            var fileName = req.files.image.name;
            req.body.image = '/images/' + fileName;
            var file = req.files.image
            file.mv('../projectcinema1/public/images/' + fileName, )
        }
        const response = await movieController.createMovie(req.body)
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/list", async function (req, res) {
    try {
        const response = await movieController.getFilm()
        return res.send(response);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/:id", async function (req, res) {
    try {
        const response = await movieController.getDetail(req.params.id)
        return res.send(response);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.route
module.exports = router