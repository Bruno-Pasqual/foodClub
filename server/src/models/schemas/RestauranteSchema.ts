import mongoose, { Collection, Schema } from "mongoose";
import { IRestaurant } from "../interfaces/interfaces";
import { User } from "./UserSchema";

const RestaurantSchema = new Schema<IRestaurant>({
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
});

export const Restaurant = User.discriminator<IRestaurant>(
	"Restaurant",
	RestaurantSchema
);
