import mongoose from "mongoose";
import { IIndividualOrder } from "./interfaces/interfaces";

const IndividualOrderSchema = new mongoose.Schema<IIndividualOrder>({
	dishes: {
		type: [
			{
				dishId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Dish",
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
		required: true,
		default: [],
	},
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		required: true,
	},
	companyOrder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CompanyOrder",
		required: true,
	},
});

const IndividualOrder = mongoose.model<IIndividualOrder>(
	"IndividualOrder",
	IndividualOrderSchema
);

export { IndividualOrder };
