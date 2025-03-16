const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 7979;

// Middleware to parse JSON bodies
app.use(express.json());

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
let statsData = new Stats(42, "Star Wars", 3.14, true);

// REST API endpoint
app.get('/api/stats', (req, res) => {
    res.json(statsData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
