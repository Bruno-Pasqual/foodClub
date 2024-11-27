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
	cnpj = cnpj.replace(/\D/g, "");

	return cnpj.length === 14;
};

const calculateSecondDigit = (cnpj: string) => {
	let sum = 0;
	let weight = 6;

	for (let i = 0; i < 13; i++) {
		sum += parseInt(cnpj.charAt(i), 10) * weight;
		weight = weight === 2 ? 9 : weight - 1;
	}

	const remainder = sum % 11;
	return remainder < 2 ? 0 : 11 - remainder;
};

// Verifica os dígitos verificadores

export const isValidCEP = (cep: string): boolean => {
	console.log(cep);
	// Remove caracteres não numéricos
	cep = cep.replace(/\D/g, "");

	return cep.length === 8;
};

// Definindo a função de mapeamento
export function mapUserTypeToEnum(userType: string): UserType {
	switch (userType.toLowerCase()) {
		case "empresa":
			return UserType.COMPANY; // Mapeia "empresa" para o enum UserType.COMPANY
		case "restaurante":
			return UserType.RESTAURANT; // Mapeia "restaurante" para o enum UserType.RESTAURANT
		case "funcionario":
			return UserType.EMPLOYEE; // Mapeia "funcionario" para o enum UserType.EMPLOYEE
		default:
			throw new Error(`Tipo de usuário desconhecido: ${userType}`);
	}
}
