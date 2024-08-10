const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const baove = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: { type: String },
    yearofbirth: { type: Number },
    competition: { type: String },
});

module.exports = mongoose.models.baove || mongoose.model('baove', baove);