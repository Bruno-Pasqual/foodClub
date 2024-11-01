import mongoose from "mongoose";
import { UserType } from "../enums/enums";

export const Usuario = mongoose.model(
	"Usuario",
	new mongoose.Schema({
		email: { type: String, required: true },
		senha: { type: String, required: true },
		tipoUsuario: { type: UserType, required: true },
		verificationToken: String,
		verificationTokenExpireAt: Date,
	})
);
