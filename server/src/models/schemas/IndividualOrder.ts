import mongoose from "mongoose";

const IndividualOrderSchema = new mongoose.Schema({
	quantity: { type: Number, required: true },
	dish: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Dish",
	},
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
	},
});
