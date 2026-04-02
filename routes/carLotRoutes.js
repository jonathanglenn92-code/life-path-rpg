// carLotRoutes.js

const express = require('express');
const router = express.Router();

// Car database simulation
let carInventory = [];
let maintenanceLog = [];

// Car object generator
class Car {
    constructor(id, make, model, year, condition, price) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.condition = condition; // 'new' or 'used'
        this.price = price;
    }
}

// Middleware for credit-checking
const checkCredit = (req, res, next) => {
    if(!req.user || !req.user.creditScore) {
        return res.status(403).send('Credit score is required to proceed.');
    }
    next();
};

// Add a new car to the inventory
router.post('/addCar', (req, res) => {
    const { make, model, year, condition, price } = req.body;
    const newCar = new Car(carInventory.length + 1, make, model, year, condition, price);
    carInventory.push(newCar);
    res.status(201).json(newCar);
});

// Log maintenance for a car
router.post('/logMaintenance/:carId', (req, res) => {
    const { carId } = req.params;
    const { type, date, cost } = req.body;
    const maintenanceEntry = { carId, type, date, cost };
    maintenanceLog.push(maintenanceEntry);
    res.status(201).json(maintenanceEntry);
});

// Retrieve maintenance records for a car
router.get('/maintenanceRecords/:carId', (req, res) => {
    const records = maintenanceLog.filter(log => log.carId == req.params.carId);
    res.json(records);
});

// Repair shop pricing based on credit score
router.post('/repairCar/:carId', checkCredit, (req, res) => {
    const { carId } = req.params;
    const repairCost = 150; // base repair cost
    const totalCost = repairCost - (req.user.creditScore / 100) * repairCost;
    res.json({ message: 'Car repaired!', cost: totalCost });
});

// Buy a new car
router.post('/buyCar/:carId', checkCredit, (req, res) => {
    const car = carInventory.find(c => c.id == req.params.carId);
    if(!car) return res.status(404).send('Car not found.');

    const totalCost = car.price - (req.user.creditScore / 100) * car.price;
    res.json({ message: 'Car purchased!', cost: totalCost });
});

module.exports = router;