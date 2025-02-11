import express from "express";
import logger from "morgan";
import cors from "cors";

// middleware configuration
export default (app) => {
	app.set("trust proxy", 1);
	app.use(
		cors({
			credentials: true,
			// origin: "https://bolao-vite.vercel.app
			origin: "http://localhost:5173",
		})
	);

	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
};
