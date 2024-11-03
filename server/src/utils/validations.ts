import { Response } from "express";
import { IValidations } from "../models/interfaces/interfaces";
import { User } from "./../models/User";

//#region Common

export const validateEmail = (email: string, res: Response) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida um email com formato: algo@dominio.ext
	if (!regex.test(email)) {
		return res.status(404).json({ success: false, message: "Email inválido" });
	}
};

export const validatePassword = (password: string, res: Response) => {
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	// Valida uma senha com pelo menos 8 caracteres, pelo menos uma letra minúscula,
	// pelo menos uma letra maiúscula, pelo menos um número e pelo menos um caractere especial.
	if (!regex.test(password)) {
		return res.status(404).json({ success: false, message: "Senha inválida" });
	}
};

export const validateName = (name: string, res: Response) => {
	if (name.length < 3) {
		return res.status(404).json({
			success: false,
			message: "Nome inválido. Deve ter no mínimo 3 letras.",
		});
	}
};

//#endregion

//#region Restaurant / Company

//#endregion

export const validateCpf = (cpf: string, res: Response) => {
	if (cpf.length !== 11 || isNaN(Number(cpf))) {
		return res
			.status(404)
			.json({ success: false, message: "CPF inválido. Deve ter 11 dígitos." });
	}
};

export const validateCep = (cep: string, res: Response) => {
	if (cep.length !== 8 || isNaN(Number(cep))) {
		return res
			.status(404)
			.json({ success: false, message: "CEP inválido. Deve ter 8 dígitos." });
	}
};

export const validatePrice = (price: number, res: Response) => {
	if (price <= 0) {
		// Valida se o preço é maior que zero.
		return res.status(404).json({
			success: false,
			message: "Preço inválido. Deve ser maior que zero.",
		});
	}
};

export const validateNumber = (number: number, res: Response) => {
	if (number <= 0) {
		// Valida se o número é maior que zero.
		return res.status(404).json({
			success: false,
			message: "Número inválido. Deve ser maior que zero.",
		});
	}
};

export const validateDescription = (description: string, res: Response) => {
	if (description.length < 30) {
		return res.status(404).json({
			success: false,
			message: "Descrição inválido. Deve ter pelo menos 30 letras.",
		});
	}
};

const userExist = async (email: string, res: Response) => {
	const UserExist = await User.findOne({ email: email });

	if (UserExist) {
		return res.status(404).json({
			success: false,
			message: "O email já está em uso.",
		});
	}
};

export const validateFields = async (
	fields: IValidations,
	res: Response
): Promise<boolean> => {
	if (fields.name) validateName(fields.name, res);
	if (fields.email) validateEmail(fields.email, res);
	if (fields.email) await userExist(fields.email, res);
	if (fields.password) validatePassword(fields.password, res);
	if (fields.cep) validateCep(fields.cep, res);
	if (fields.number) validateNumber(fields.number, res);
	if (fields.cpf) validateCpf(fields.cpf, res);
	if (fields.price) validatePrice(fields.price, res);
	if (fields.description) validateDescription(fields.description, res);
	return true;
};
