const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 7979;
const mockData = require('./mockData');

// Middleware to parse JSON bodies
app.use(express.json());

// Configurable timer interval (in milliseconds)
const TIMER_INTERVAL = process.env.TIMER_INTERVAL || 10000;

// Function to get a random element from the mockData array
function getRandomLabel() {
    const randomIndex = Math.floor(Math.random() * mockData.length);
    return mockData[randomIndex];
}

// Stats data model
class Stats {
    constructor(points, label, percentage, active) {
        this.points = points;
        this.label = label;
        this.percentage = percentage;
        this.active = active;
        this.lastUpdate = Date.now();
    }
}

// Sample stats data
let statsData = new Stats(
    Math.floor(Math.random() * 100), // Random integer
    getRandomLabel(), // Random string label
    Math.random() * 100, // Random double
    Math.random() < 0.5 // Random boolean
);

// Function to update stats data every TIMER_INTERVAL milliseconds
async function updateStats() {
    setInterval(() => {
        statsData = new Stats(
            Math.floor(Math.random() * 100), // Random integer
            getRandomLabel(), // Random string label
            Math.random() * 100, // Random double
            Math.random() < 0.5 // Random boolean
        );
        console.log('Stats updated:', statsData);
    }, TIMER_INTERVAL);
}

// Start updating stats
updateStats();

// REST API endpoint
app.get('/api/stats', (req, res) => {
    res.json(statsData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
