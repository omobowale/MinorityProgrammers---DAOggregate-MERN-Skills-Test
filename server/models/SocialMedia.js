const mongoose = require("mongoose")


const socialMediaSchema = mongoose.Schema({
    dao_id: {
        type: String,
        required: true
    },
    twitter_handle: {
        type: String
    },
    github_organization_handle: {
        type: String
    },
    linkedin_company_name: {
        type: String
    },
    telegram_handle: {
        type: String
    },
    discord_link: {
        type: String
    } 
});

module.exports = mongoose.model('socialmedia', socialMediaSchema);

