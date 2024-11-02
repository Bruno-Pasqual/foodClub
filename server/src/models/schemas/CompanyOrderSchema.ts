import mongoose from "mongoose";
import { OrderStatus } from "../enums/enums";

const CompanyOrderSchema = new mongoose.Schema({
	companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
	orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "IndividualOrder" }],
	createdAt: { type: Date, default: Date.now },
	status: { type: OrderStatus, default: OrderStatus.PENDING },
});
