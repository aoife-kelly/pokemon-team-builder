const mongoose = require('mongoose');

// here we establish the structure of our Pokemon documents in MongoDB
const PokemonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true },
    image: { type: String, required: true },
    types: [String], // array of strings (e.g., ['fire', 'flying'])
    addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);