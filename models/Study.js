const mongoose = require('mongoose');

const StudySchema = mongoose.Schema({
    title: String,
})

module.exports = mongoose.model("Study", StudySchema);