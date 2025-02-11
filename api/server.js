import app from "../app.js";

const PORT = process.env.PORT || 5005;

if (process.env.NODE_ENV !== "production") {
	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`);
	});
}

// Export for serverless deployment (Vercel)
export default app;
