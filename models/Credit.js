const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
    mortgages: [{
        lender: { type: String, required: true },
        amount: { type: Number, required: true },
        interestRate: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        paymentHistory: [{
            date: { type: Date, required: true },
            amountPaid: { type: Number, required: true },
            status: { type: String, enum: ['on-time', 'late'], required: true }
        }]
    }],
    carLoans: [{
        lender: { type: String, required: true },
        amount: { type: Number, required: true },
        interestRate: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        paymentHistory: [{
            date: { type: Date, required: true },
            amountPaid: { type: Number, required: true },
            status: { type: String, enum: ['on-time', 'late'], required: true }
        }]
    }],
    personalLoans: [{
        lender: { type: String, required: true },
        amount: { type: Number, required: true },
        interestRate: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        paymentHistory: [{
            date: { type: Date, required: true },
            amountPaid: { type: Number, required: true },
            status: { type: String, enum: ['on-time', 'late'], required: true }
        }]
    }],
    creditScore: { type: Number, required: true, min: 300, max: 850 }
}, { timestamps: true });

module.exports = mongoose.model('Credit', creditSchema);