import mongoose, { Schema } from "mongoose";
import { User } from "./User";
import { IRestaurant } from "./interfaces/interfaces";
import { UserType } from "./enums/enums";

const DishRatingSchema = new Schema({
	userId: { type: String, required: true },
	rating: { type: Number, required: true, max: 5 },
});

const DishSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		image: { type: String, default: null },
		ratings: {
			type: [DishRatingSchema],
			default: [],
		},
	},
	{ _id: true }
);

// Schema do Restaurante
const RestaurantSchema = new Schema({
	name: { type: String, required: true },
	cnpj: { type: String, required: true },
	cep: { type: String, required: true },
	number: { type: String, required: true },
	dishes: {
		type: [DishSchema], // Array de subdocumentos embutidos
		default: [], // Inicia como um array vazio
	},
	companyOrders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "CompanyOrder",
			default: [],
		},
	],
	userType: {
		type: String,
		enum: Object.values(UserType),
		required: true,
		default: UserType.RESTAURANT,
	},
});

// Modelo de Restaurante como discriminador do User
export const Restaurant = User.discriminator<IRestaurant>(
	"Restaurant",
	RestaurantSchema
);
