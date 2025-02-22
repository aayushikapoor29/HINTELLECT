<<<<<<< HEAD
import express from "express";
import axios from "axios";
import path from "path";

const PORT = 5004;
const app= express();

app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname, "public"));
app.use(express.json());

app.get("/", (res,req) =>{
    res.prependListener("index", {message: "Enter your code for review!"});
});

app.post("/review", async (res,req) => {
    const resp = await axios.post 
})
=======
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
    console.log("Received Code:", req.body.code);
    try {
        const response = await axios.post("http://127.0.0.1:5004/main", {
            code: req.body.code
        });
        res.json({ feedback: response.data.review }); // Sending back the AI's review
    } catch (error) {
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
>>>>>>> 5079b92 (Sync local repo with github repo)
