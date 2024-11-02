import mongoose from "mongoose";
import { IEmployee } from "./../interfaces/interfaces";
import { User } from "./UserSchema";

const EmployeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
		},
	],
});

export const Restaurant = User.discriminator<IEmployee>(
	"Restaurant",
	EmployeeSchema
);
