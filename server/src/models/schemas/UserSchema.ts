import mongoose from "mongoose";
import { UserType } from "../enums/enums";

// prof - Tirar dúvida a respeito das funcionalidades do base option
// Recomenda-se a utilização quando é feito herança entre modelos

const baseOptions = {
	discriminatorKey: "type",
	collection: "Users",
};

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		userType: { type: String, enum: Object.values(UserType), required: true },
		verificationToken: String,
		verificationTokenExpireAt: Date,
	},
	baseOptions
);

export const User = mongoose.model("User", UserSchema);
