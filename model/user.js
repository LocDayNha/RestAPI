const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: { type: String },
    username: { type: Number },
    password: { type: Number }
});
module.exports = mongoose.models.user || mongoose.model('user', user);
