const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
email: {
type: String,
required: true
},
paswd: {
type: String,
required: true,
},
name: {
type: String,
required: true,
},
created_date: { type: Date, default: Date.now },
wishlist: [{ id: Number, progress: Number }],
updated_date: { type: Date, default: Date.now }
});

const user=mongoose.model('user', userSchema);
module.exports = user;