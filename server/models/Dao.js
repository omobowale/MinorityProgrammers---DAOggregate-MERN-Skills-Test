const mongoose = require("mongoose")


const daoSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_founded: {
        type: Date,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    logo_link: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    governance_token_name: {
        type: String
    },
    governance_token_symbol: {
        type: String
    },
    dao_structure: {
        type: String,
        required: true
    },
    voting_process: {
        type: String
    },
    TVL: {
        type: Number,
        required: true
    },
    tech_stack: {
        type: String
    },
    notes: {
        type: String
    },
    blockchain: {
        type: String,
        required: true
    },
    headquarters: {
        type: String
    }
});

module.exports = mongoose.model('daos', daoSchema);

