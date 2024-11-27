import mongoose from "mongoose";
import { User } from "./User";
import { ICompany } from "./interfaces/interfaces";

const CompanySchema = new mongoose.Schema({
	name: { type: String, required: true },
	cnpj: { type: String, required: true },
	cep: { type: String, required: true },
	number: { type: String, required: true },
	rating: { type: Number, default: 5 },
	affiliateRestaurants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Restaurant",
		},
	],
	employees: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			default: [],
		},
	],
});

export const Company = User.discriminator<ICompany>("Company", CompanySchema);
