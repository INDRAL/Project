const mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
email: {
type: String,
required: true
},
id: {
type: String,
required: true,
},
title: {
type: String,
required: true,
},
authors: {
    type: Array,
    required: true,
},
progress:{
    type: Number,
    default: 0
},
comments: {
    type: String,
    default: "good"
    
},
created_date: { type: Date, default: Date.now },
updated_date: { type: Date, default: Date.now }
});

const Book=mongoose.model('book', bookSchema);
module.exports = Book;