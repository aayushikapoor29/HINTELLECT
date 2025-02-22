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