// routes/carLotRoutes.js

const express = require('express');
const router = express.Router();

// Define car lot system variables
let carLot = [];
let predatoryLendingPractices = {
    higherInterestRates: 0.15,
    balloonPayment: true,
    shadyConsequences: [
        'Forced to take lower quality vehicles',
        'Payment plans with hidden fees',
        'Threats to report to credit agencies',
        'Random audits for compliance'
    ]
};

// Function to calculate loan terms based on credit score
function calculateLoanTerms(creditScore) {
    let baseInterest = 0.05;
    let interestRate;

    if (creditScore < 600) {
        interestRate = baseInterest + predatoryLendingPractices.higherInterestRates;
        return interestRate;
    }
    return baseInterest;
}

// Route to get cars from the lot
router.get('/cars', (req, res) => {
    res.json(carLot);
});

// Route to buy a car with predatory lending practices
router.post('/buyCar', (req, res) => {
    const { carId, creditScore } = req.body;
    const car = carLot.find(c => c.id === carId);

    if (!car) return res.status(404).send('Car not found');

    const interestRate = calculateLoanTerms(creditScore);
    const loanDetails = {
        carId: car.id,
        price: car.price,
        interestRate,
        balloonPayment: predatoryLendingPractices.balloonPayment
    };

    // Simulate shady consequences
    const consequence = predatoryLendingPractices.shadyConsequences[Math.floor(Math.random() * predatoryLendingPractices.shadyConsequences.length)];

    res.json({ loanDetails, consequence });
});

// Route to add a car to the lot
router.post('/addCar', (req, res) => {
    const { id, price } = req.body;
    carLot.push({ id, price });
    res.send('Car added to the lot');
});

module.exports = router;