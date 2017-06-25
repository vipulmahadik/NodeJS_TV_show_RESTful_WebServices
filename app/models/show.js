var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var nums = {type: Number, default:0};
var ShowSchema = new Schema({
    id: ObjectId,
    name: String,
    genre: {type: String, enum: ["comedy", "drama", "suspence", "romance"]},
    likes: nums,
    hits: nums,
    description: String
});

module.exports = mongoose.model('Show', ShowSchema);