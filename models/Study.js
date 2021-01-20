const { request } = require('express');
const mongoose = require('mongoose');
const User = require('./User');

const StudySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    grades: {
        type: [Number],
        required: true
    },
    user: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Study", StudySchema);