require("dotenv/config");
require("./db");
const express = require("express");
const app = express();
require("./config")(app);
const path = require("path");
const Aposta = require("./models/Aposta.model");
const Tabela = require("./models/Tabela.model");

// routes
app.get("/api/", (req, res) => {
	res.send("hello world");
});

app.get("/api/getApostas", (req, res) => {
	console.log("----->>> GET /getApostas called: ");
	const { ano, serie } = req.query;
	Aposta.find({ ano: ano, serie: serie })
		.then((apostas) => res.json({ apostas }))
		.catch((err) => console.log(err));
});

app.get("/api/getTabelas", (req, res) => {
	console.log("----->>> GET /getTabelas called: ");
	const { ano, serie } = req.query;
	Tabela.find({ ano: ano, serie: serie })
		.then((tabelas) => res.json({ tabelas }))
		.catch((err) => console.log(err));
});

app.post("/api/sendAposta", (req, res) => {
	console.log("----->>> POST /sendAposta called: ");
	Aposta.create(req.body)
		.then((a) => console.log(`Successfully added aposta ${a}`))
		.catch((err) => console.log(err));
});

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.use((req, res) => {
	// if no routes match, send them the React HTML
	res.sendFile(__dirname + "/frontend/build/index.html");
});
// end of routes

module.exports = app;
