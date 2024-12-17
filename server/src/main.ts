// Load environment variables from .env file
import "dotenv/config";

// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
import "../database/checkConnection";

// Import the Express application from ./app
import app from "./app";

// Get the port from the environment variables
const port = process.env.APP_PORT;

import type { RequestHandler } from "express";

const sayWelcome: RequestHandler = (req, res) => {
	res.send("welcome to wild series !");
};

app.get("/", sayWelcome);

// Start the server and listen on the specified port
app
	.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	})
	.on("error", (err: Error) => {
		console.error("Error:", err.message);
	});
