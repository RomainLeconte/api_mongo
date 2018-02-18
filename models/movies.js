const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: String,
    duration: Number
});
const Movie = mongoose.model('movie', MovieSchema, 'Movies_Collecion');

module.exports = Movie;