const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        enum: ['house', 'car', 'business'],
        required: true,
    },
    subType: {
      type: String,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    currentValue: {
        type: Number,
        required: true,
    },
    monthlyMaintenance: {
        type: Number,
        required: true,
    },
    lastMaintenanceDate: {
        type: Date,
    },
    maintenanceNeeded: {
        type: Boolean,
        default: false,
    },
    condition: {
        type: String,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    // For businesses
    monthlyIncome: {
        type: Number,
    },
    isOperational: {
        type: Boolean,
    },
    // For cars
    mileage: {
        type: Number,
    },
    // For houses
    size: {
        type: String,
    },
    bedrooms: {
        type: Number,
    },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
