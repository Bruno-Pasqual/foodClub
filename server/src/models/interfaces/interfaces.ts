import { Types } from "mongoose";
import { Request } from "express";
import { OrderStatus, UserType } from "../enums/enums";
import Dish from "./../Dish";

export interface ICompanyOrder {
	company: Types.ObjectId;
	collaboratorsOrders: Types.ObjectId[];
	createdAt: Date;
	status: OrderStatus;
	restaurant: Types.ObjectId;
}
export interface IIndividualOrder extends Document {
	companyOrder: Types.ObjectId | ICompanyOrder; // Referência ao CompanyOrder
	employee: Types.ObjectId | IEmployee; // Referência ao Employee
	order: {
		dishId: Types.ObjectId | IDish; // Referência ao Dish
		quantity: number; // Quantidade do prato
	}[]; // Lista de pratos pedidos
}

export interface IUser extends Document {
	email: string;
	password: string;
	userType: UserType;
	verificationToken: string;
	verificationTokenExpireAt: Date;
	// authenticated: boolean;??
	//todo - keep or not ?
}

export interface IDish {
	id: Types.ObjectId;
	name: string;
	description: string;
	price: number;
	image: string;
	ratings: {
		userId: Types.ObjectId;
		rating: number;
	}[];
}

// Interface para o restaurante
export interface IRestaurant extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	dishes: Types.ObjectId[];
	companyOrders: Types.ObjectId[];
}

export interface IEmployee extends IUser {
	name: string;
	cpf: string;
	company: Types.ObjectId;
	birthDate: Date;
	weeklyOrders: {
		Monday: Types.ObjectId;
		Tuesday: Types.ObjectId;
		Wednesday: Types.ObjectId;
		Thursday: Types.ObjectId;
		Friday: Types.ObjectId;
		Saturday: Types.ObjectId;
		Sunday: Types.ObjectId;
	};
}

export interface ICompany extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	affiliateRestaurants: Types.ObjectId[];
	employees: Types.ObjectId[];
}

export interface IValidations {
	name?: string;
	email?: string;
	password?: string;
	cep?: string;
	number?: number;
	cpf?: string;
	price?: number;
	description?: string;
	userType?: UserType;
	cnpj?: string;
}

export interface iJSONResponse {
	success: boolean;
	message: string;
	data: any;
}

export interface RequestWithUserId extends Request {
	userId?: string;
}
