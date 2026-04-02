// jobSystemRoutes.js

const express = require('express');
const router = express.Router();

// Job system routes
// Business owner job with fines cap and shutdown mechanics

let businessOwners = [];

// Function to create a new business owner job
router.post('/jobs/business-owner', (req, res) => {
    const { name, maxFines } = req.body;
    const newOwner = { name, fines: 0, maxFines };
    businessOwners.push(newOwner);
    res.status(201).send(newOwner);
});

// Function to register a fine
router.post('/jobs/business-owner/:name/fine', (req, res) => {
    const { name } = req.params;
    const { amount } = req.body;
    const owner = businessOwners.find(b => b.name === name);
    if (!owner) return res.status(404).send('Business owner not found');

    owner.fines += amount;
    
    // Check if the fines exceed the cap
    if (owner.fines >= owner.maxFines) {
        return res.status(403).send('Business owner has been shut down due to excessive fines');
    }

    res.send(owner);
});

// Function to get the current status of a business owner
router.get('/jobs/business-owner/:name', (req, res) => {
    const { name } = req.params;
    const owner = businessOwners.find(b => b.name === name);
    if (!owner) return res.status(404).send('Business owner not found');
    res.send(owner);
});

module.exports = router;