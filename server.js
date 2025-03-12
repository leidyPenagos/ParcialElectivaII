const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.static(__dirname));


app.get("/api/personajes", (req, res) => {
    fs.readFile("starwar.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error al leer el archivo JSON" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
