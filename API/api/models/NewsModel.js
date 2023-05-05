import mongoose from "mongoose";

const schema = mongoose.Schema({
	title: String,
	description: String,
	author: String,
	insertedDate: Date,
	city: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "city",
	},
});

const model = mongoose.model("news", schema);

export default model;
