const express = require("express");
const router = express.Router();
const SocialMedia = require("../models/SocialMedia");



//get a single dao by id
router.get('/:id', (req, res) => {
    SocialMedia.find({dao_id: req.params.id}).then((socialmedia) => {
        res.json(socialmedia);
    }).catch((err) => {
        res.json({"message" : err});
    })
})


module.exports = router