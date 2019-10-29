const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    reviews: {
        type: Map,
        of: String,
        required: true
    },
    ratings: {
        type: Map,
        of: String,
        required: true
    },
    overallRating:{
        type: Number,
        required:true,
        default:0
    }
});

module.exports = mongoose.model('MovieModel', movieSchema);