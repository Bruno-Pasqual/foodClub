import { UserType } from "../models/enums/enums";
import {
	ICompany,
	IEmployee,
	IRestaurant,
} from "../models/interfaces/interfaces";
import { Restaurant } from "./../models/Restaurant";

export const isEmail = (email: string) => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(email);
};

export const isValidCNPJ = (cnpj: string): boolean => {
	// Remove caracteres não numéricos
	cnpj = cnpj.replace(/\D/g, "");

	if (cnpj.length !== 14) return false;

	// Verifica se todos os dígitos são iguais
	if (/^(\d)\1{13}$/.test(cnpj)) return false;

	return true;
};

export const isValidCEP = (cep: string): boolean => {
	// Remove caracteres não numéricos
	cep = cep.replace(/\D/g, "");

	return cep.length === 8;
};
