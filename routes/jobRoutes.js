const express = require('express');
const router = express.Router();

// Job system data
const jobs = {
  farmer: {
    tasks: ['Plant crops', 'Harvest crops', 'Maintain farm'],
    earnings: { hourly: 15, daily: 120 },
    performanceTracking: [],
    fired: false
  },
  athlete: {
    tasks: ['Train', 'Compete', 'Promote sponsors'],
    earnings: { hourly: 30, daily: 240 },
    performanceTracking: [],
    fired: false
  },
  cop: {
    tasks: ['Patrol', 'Investigate crimes', 'Community outreach'],
    earnings: { hourly: 25, daily: 200 },
    performanceTracking: [],
    fired: false
  },
  doctor: {
    tasks: ['Examine patients', 'Perform surgery', 'Consult with patients'],
    earnings: { hourly: 100, daily: 800 },
    performanceTracking: [],
    fired: false
  },
  businessOwner: {
    tasks: ['Manage business operations', 'Oversee employees', 'Develop business strategies'],
    earnings: { hourly: 50, daily: 400 },
    performanceTracking: [],
    fired: false
  },
};

// Get all jobs
router.get('/jobs', (req, res) => {
    res.json(jobs);
});

// Update performance tracking
router.post('/jobs/:jobName/performance', (req, res) => {
    const { jobName } = req.params;
    const { performanceData } = req.body;
    if(jobs[jobName]) {
        jobs[jobName].performanceTracking.push(performanceData);
        res.status(200).send('Performance updated');
    } else {
        res.status(404).send('Job not found');
    }
});

// Fire a job
router.delete('/jobs/:jobName/fired', (req, res) => {
    const { jobName } = req.params;
    if(jobs[jobName]) {
        jobs[jobName].fired = true;
        res.status(200).send(`${jobName} has been fired.`);
    } else {
        res.status(404).send('Job not found');
    }
});

module.exports = router;