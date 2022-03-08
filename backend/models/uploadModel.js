const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    text: { type: Array, },

}, { timestamps: true }
)

module.exports = mongoose.model('Upload', uploadSchema);