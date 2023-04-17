import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const connectionSting = "mongodb://localhost:27017/Travel_Test";

mongoose.connect(connectionSting).then(() => {
	console.log("Connected to mongodb on: " + connectionSting);

	const app = express();

	app.use(
		cors({
			origin: "*",
		})
	);

});
