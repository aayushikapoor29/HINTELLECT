
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 5005;

// Set up middleware
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use(express.json()); // Parse JSON requests

// Route to serve the homepage (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"public", "index.html"));
});

// Route to handle code submission and fetch review from Python server
app.post("/review", async (req, res) => {
    console.log("Received Payload:", req.body);
    if (!req.body.code) {
        return res.status(400).json({ feedback: "Error: No code provided." });
    }
    try {
        const response = await axios.post("http://127.0.0.1:5004/main", {
            code: req.body.code
        });
        res.json({ feedback: response.data.review });
    } catch (error) {
        console.error("AI Server Error:", error);
        res.status(500).json({ feedback: "Error: AI server not responding." });
    }
});

// Route to serve the review page (main.html)
app.get("/main.html", (req, res) => {
    res.sendFile(path.join(__dirname,"public", "main.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});

