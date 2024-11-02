import { Types } from "mongoose";
import { UserType } from "../enums/enums";

export interface IOrder {
	userId: string;
}

export interface IUser extends Document {
	email: string;
	password: string;
	userType: UserType;
	verificationToken: string;
	verificationTokenExpireAt: Date;
	// authenticated: boolean;??
	//todo - Decidir se será mantido ou não
}

export interface IRestaurant extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	dishes: IDish[];
}

export interface IDish {
	name: string;
	description: string;
	price: number;
}

export interface IEmployee extends IUser {
	name: string;
	cpf: string;
	company: Types.ObjectId;
}

export interface ICompany extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	affiliateRestaurants: Types.ObjectId[];
	employeesId: Types.ObjectId[];
}
