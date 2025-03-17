const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 7979;
const mqttPort = process.env.MQTT_PORT || 1883;
const mockData = require('./mockData');
const mqtt = require('mqtt');

// MQTT client setup
const mqttClient = mqtt.connect(`mqtt://localhost:${mqttPort}`);
mqttClient.on('connect', () => {
    console.log(`MQTT client connected to broker on port ${mqttPort}`);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Configurable timer interval (in milliseconds)
const TIMER_INTERVAL_BASE = parseInt(process.env.TIMER_INTERVAL) || 10000;
const TIMER_INTERVAL_DRIFT = Math.floor(Math.random() * (750 - 250 + 1)) + 250; // artificial drift
const TIMER_INTERVAL = TIMER_INTERVAL_BASE + (Math.random() < 0.5 ? -TIMER_INTERVAL_DRIFT : TIMER_INTERVAL_DRIFT);

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

let previousLastUpdate = statsData.lastUpdate;

// Function to update stats data every TIMER_INTERVAL milliseconds
async function updateStats() {
    setInterval(() => {
        const newStatsData = new Stats(
            Math.floor(Math.random() * 100), // Random integer
            getRandomLabel(), // Random string label
            Math.random() * 100, // Random double
            Math.random() < 0.5 // Random boolean
        );

        if (newStatsData.lastUpdate !== previousLastUpdate) {
            statsData = newStatsData;
            previousLastUpdate = statsData.lastUpdate;
            console.log('Stats updated:', statsData);

            // Publish the updated stats to MQTT
            mqttClient.publish('stats/update', JSON.stringify(statsData));
            console.log('MQTT message published');
        }
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
    console.log(`HTTP Server is running on http://localhost:${port}`);
});
