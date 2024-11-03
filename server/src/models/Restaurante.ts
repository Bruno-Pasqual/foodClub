import mongoose, { Collection, Schema } from "mongoose";
import { IRestaurant } from "./interfaces/interfaces";
import { User } from "./User";

const RestaurantSchema = new Schema({
	name: { type: String, required: true },
	cnpj: { type: String, required: true },
	cep: { type: String, required: true },
	number: { type: String, required: true },
	dishes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Dish",
		},
	],
	companyOrders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "CompanyOrder",
		},
	],
});

export const Restaurant = User.discriminator<IRestaurant>(
	"Restaurant",
	RestaurantSchema
);
