const mongoose = require('mongoose');

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
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Study", StudySchema);