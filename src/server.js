const express = require("express");
const nodeFetch = require("node-fetch");
const path = require("path");

const Server = express();

const MEETING_JSON_URL = "https://civil.gov.taipei/OpenData.aspx?SN=881665EB5B77192F";

Server.use(express.static(path.join(__dirname, "build")));

Server.get("/fetchMeetings", async function (req, res) {
    try {
        const response = await nodeFetch(MEETING_JSON_URL);
        const text = await response.text();
        console.log(text);
    } catch (error) {
        console.error(error);
    }
});

Server.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

Server.listen(process.env.PORT || 8080);
