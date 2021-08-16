const express = require("express");
const router = express.Router();
const Dao = require("../models/Dao");
const SocialMedia = require("../models/SocialMedia");


//get all daos including filter by category, structure, tvl, date_founded and blockchain
router.get('/daos', (req, res) => {
    const sort = { TVL: -1 };
    console.log(typeof req.query.filter_TVL === "undefined")
    Dao.find({
        category: (req.query.filter_category !== "" && typeof req.query.filter_category !== "undefined" ? {
            $eq: req.query.filter_category
        } : {$gt : ""}),
        dao_structure: (req.query.filter_dao_structure != "" && typeof req.query.filter_dao_structure !== "undefined" ? {
            $eq: req.query.filter_dao_structure
        } : {$gt: ""}), 
        blockchain: (req.query.filter_blockchain != "" && typeof req.query.filter_blockchain !== "undefined" ? {
            $eq: req.query.filter_blockchain
        } : {$gt : ""}),
        TVL: (req.query.filter_TVL != "" && typeof req.query.filter_TVL !== "undefined" ? {
            $eq: req.query.filter_TVL
        } : {$gt: -1}), 
        date_founded: (req.query.filter_date_founded != "" && typeof req.query.filter_date_founded !== "undefined" ? {
            $eq: req.query.filter_date_founded
        } : {$lt: Date.now()}) 
    }).sort(sort).then((daos) => {
        res.json(daos);
    }).catch((err) => {
        res.json({"message" : err});
    })
})


//get a single dao by id
router.get('/daos/:id', (req, res) => {
    Dao.findById(req.params.id).then((dao) => {
        res.json(dao);
    }).catch((err) => {
        res.json({"message" : err});
    })
})


//update a dao
router.patch('/daos/:id', (req, res) => {

    const twitter_handle = req.body.twitter_handle || "";
    const github_organization_handle = req.body.github_organization_handle || "";
    const linkedin_company_name = req.body.linkedin_company_name || "";
    const telegram_handle = req.body.telegram_handle || "";
    const discord_link = req.body.discord_link || "";

    console.log("twitter handle", twitter_handle)

    Dao.updateOne(
        {
            _id: req.params.id
        }, 
        {
            $set: {
                full_name: req.body.full_name,
                description: req.body.description,
                date_founded: req.body.date_founded,
                date_created: req.body.date_created,
                logo_link: req.body.logo_link,
                category: req.body.category,
                governance_token_name: req.body.governance_token_name,
                governance_token_symbol: req.body.governance_token_symbol,
                dao_structure: req.body.dao_structure,
                voting_process: req.body.voting_process,
                TVL: req.body.TVL,
                tech_stack: req.body.tech_stack,
                notes: req.body.notes,
                blockchain: req.body.blockchain,
                headquarters: req.body.headquarters
            }
        }).then((dao) => {
            
            SocialMedia.updateOne(
                {
                    dao_id: req.params.id
                }, 
                {
                    $set : {
                        twitter_handle,
                        github_organization_handle,
                        telegram_handle,
                        discord_link,
                        linkedin_company_name
                    }
            }).then((social_media) => {
                console.log("I got here");
                res.send({dao, social_media});
            }).catch((err) => {
                res.json({"message" : err})
            })
        }).catch((err) => {
            res.json({"message" : err});
        })
    })


//add a new dao
router.post('/daos', (req, res) => {
    console.log(req.body);
    const twitter_handle = req.body.twitter_handle || "";
    const github_organization_handle = req.body.github_organization_handle || "";
    const linkedin_company_name = req.body.linkedin_company_name || "";
    const telegram_handle = req.body.telegram_handle || "";
    const discord_link = req.body.discord_link || "";

    const dao = new Dao({
        full_name: req.body.full_name,
        description: req.body.description,
        date_founded: req.body.date_founded,
        date_created: req.body.date_created,
        logo_link: req.body.logo_link,
        category: req.body.category,
        governance_token_name: req.body.governance_token_name,
        governance_token_symbol: req.body.governance_token_symbol,
        dao_structure: req.body.dao_structure,
        voting_process: req.body.voting_process,
        TVL: req.body.TVL,
        tech_stack: req.body.tech_stack,
        notes: req.body.notes,
        blockchain: req.body.blockchain,
        headquarters: req.body.headquarters
    })

    dao.save().then((data) => {
        console.log(data._id)
        const social_media = new SocialMedia({
            dao_id: data._id,
            twitter_handle,
            github_organization_handle,
            telegram_handle,
            discord_link,
            linkedin_company_name
        });

        social_media.save().then((social_media_data) => {
            result = res.send({data, social_media_data});
        }).catch(err => {
            res.json({"message" : err});    
        })

        
    }).catch(err => {
        res.json({"message": err});
    })

});


module.exports = router


