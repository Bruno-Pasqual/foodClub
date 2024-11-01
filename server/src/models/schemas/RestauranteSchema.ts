import mongoose, { Collection, Schema } from "mongoose";
import { IRestaurant } from "../interfaces/interfaces";
import { UserType } from "../enums/enums";
import { Usuario } from "./UsuarioSchema";

const baseOptions = {
	discriminatorKey: "type",
	Collection: "usuarios",
};

const RestauranteSchema = new Schema<IRestaurant>({
	nomeRestaurante: { type: String, required: true },
	cnpj: { type: String, required: true },
	cep: { type: String, required: true },
	numero: { type: String, required: true },
	tipoUsuario: { type: String, enum: [UserType.RESTAURANTE], required: true },
	pratos: [
		{
			nomeDoPrato: { type: String, required: true },
			descricao: { type: String, required: true },
			preco: { type: Number, required: true },
		},
	],
});

/* 
   explicação discriminator - O discriminator permite herdar a estrutura de um model,
   de forma que seja apenas necessário declarar as partes específicas do model enquanto
   se compartilha uma base em comum 
*/
export const Restaurante = Usuario.discriminator<IRestaurant>(
	"Restaurante",
	RestauranteSchema
);
