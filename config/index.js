const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// middleware configuration
module.exports = (app) => {
	app.set("trust proxy", 1);
	app.use(
		cors({
			credentials: true,
			// origin: "https://bolao2023.onrender.com",
			origin: "http://localhost:5173",
		})
	);

	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
};
