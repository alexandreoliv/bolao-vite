require("dotenv/config");
require("./db");
const express = require("express");
const app = express();
const { exec } = require("child_process");
require("./config")(app);
const path = require("path");
const Aposta = require("./models/Aposta.model");
const Tabela = require("./models/Tabela.model");

app.use(express.json());

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

app.get("/api/scrapeTabela", (req, res) => {
	const { ano, serie } = req.query;

	if (!ano || !serie) {
		return res.status(400).json({ error: "Ano and serie are required" });
	}

	console.log("About to run scraping script...");

	// Detect if we are on Vercel or locally
	const isVercel = process.env.VERCEL === "1"; // Vercel sets this environment variable

	const scriptPath = isVercel
		? path.join(__dirname, "frontend", "src", "modules", "scrape.js") // On Vercel, use the Node.js script
		: path.join(__dirname, "python", "scrape.py"); // Locally, use the Python script

	const command = isVercel
		? `node ${scriptPath} ${ano} ${serie}` // Node.js command
		: `${path.join(
				__dirname,
				"python",
				"venv",
				"bin",
				"python3"
		  )} ${scriptPath} ${ano} ${serie}`; // Python command

	exec(command, (error, stdout, stderr) => {
		console.log("Scraping script executed.");
		if (error) {
			console.error(`Error executing script: ${error.message}`);
			return res
				.status(500)
				.json({ error: `Failed to execute script: ${error.message}` });
		}
		if (stderr) {
			console.error(`Script stderr: ${stderr}`);
			return res
				.status(500)
				.json({ error: `Script execution error: ${stderr}` });
		}
		console.log(`Script stdout: ${stdout}`);
		res.status(200).json({
			message: "Scraping script executed successfully",
			output: stdout,
		});
	});
});

app.post("/api/sendAposta", (req, res) => {
	console.log("----->>> POST /sendAposta called: ");
	Aposta.create(req.body)
		.then((a) => {
			console.log(`Successfully added aposta ${a}`);
			res.status(200).json({
				message: "Aposta successfully added",
				aposta: a,
			});
		})
		.catch((err) => {
			console.error("Error adding aposta:", err);
			res.status(500).json({
				message: "Error adding aposta",
				error: "Failed to add aposta",
			});
		});
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// Serve React app for all unmatched routes
	app.use((req, res) => {
		// if no routes match, send them the React HTML
		res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
	});
} else {
	// Return JSON 404 error for unmatched routes in development
	app.use((req, res) => {
		res.status(404).json({ error: "Route not found" });
	});
}

module.exports = app;
