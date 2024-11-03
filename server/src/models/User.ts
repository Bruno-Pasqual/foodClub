import mongoose from "mongoose";
import { UserType } from "./enums/enums";

// prof - base option ?

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
		verificationTokenExpireAt: {
			type: Date,
			default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		},
	},
	baseOptions
);

export const User = mongoose.model("User", UserSchema);
