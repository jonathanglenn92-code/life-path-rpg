const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    // Existing schema fields...

    dating: {
        status: { type: String, enum: ['single', 'dating'], required: true },
        dateStarted: { type: Date },
    },
    marriage: {
        spouseName: { type: String },
        marriageDate: { type: Date },
    },
    children: [{
        name: { type: String, required: true },
    }],
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],
    family: {
        wealth: { type: Number },
        stats: { type: Object },
    }
});

module.exports = mongoose.model('Player', PlayerSchema);