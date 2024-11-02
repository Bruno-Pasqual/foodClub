import mongoose from "mongoose";

const Dish = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	restaurant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Restaurant",
	},
});
