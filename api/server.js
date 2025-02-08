const app = require("../app");
const PORT = process.env.PORT || 5005;

if (process.env.NODE_ENV !== "production") {
	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`);
	});
} else {
	// Export for serverless deployment (Vercel)
	module.exports = app;
}
