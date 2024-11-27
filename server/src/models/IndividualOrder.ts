import mongoose, { Schema } from "mongoose";

const individualOrderSchema = new Schema({
	companyOrder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CompanyOrder",
		required: true,
	},
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		required: true,
	},
	order: {
		dishId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Dish",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
});

const IndividualOrder = mongoose.model(
	"IndividualOrder",
	individualOrderSchema
);

export default IndividualOrder;
