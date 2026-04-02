const express = require('express');
const router = express.Router();

// Car data structure
let cars = [];

// Add a new car to the lot
router.post('/cars', (req, res) => {
    const { make, model, year, isNew } = req.body;
    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year,
        isNew,
        mileage: 0,
        maintenance: { oilChanges: 0, tireReplacements: 0 },
        status: 'operational'
    };
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Drive a car
router.post('/cars/:id/drive', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    const { miles } = req.body;

    if (!car || car.status === 'broken down') {
        return res.status(404).send('Car not found or broken down.');
    }

    car.mileage += miles;
    assessMaintenance(car);
    res.json(car);
});

// Check maintenance needs
function assessMaintenance(car) {
    if (car.mileage >= 5000) {
        car.maintenance.oilChanges++;
        car.mileage = 0; // Reset mileage after maintenance
    }
    if (car.mileage >= 30000) {
        car.maintenance.tireReplacements++;
        car.mileage = 0; // Reset mileage after maintenance
    }
    if (car.maintenance.oilChanges > 3 || car.maintenance.tireReplacements > 1) {
        car.status = 'broken down';
    }
}

// Handle pricing based on credit
router.get('/repair-shop/pricing/:creditLevel', (req, res) => {
    const creditLevel = req.params.creditLevel;
    let price;

    switch (creditLevel) {
        case 'good':
            price = 100;
            break;
        case 'average':
            price = 150;
            break;
        case 'poor':
            price = 200;
            break;
        default:
            return res.status(400).send('Invalid credit level.');
    }
    res.json({ price });
});

module.exports = router;