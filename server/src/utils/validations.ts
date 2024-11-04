import { Response } from "express";
import { IValidations } from "../models/interfaces/interfaces";
import { User } from "./../models/User";
import { ErrorMessages, UserType } from "../models/enums/enums";

//#region Common

export const validateEmail = async (
	email: string | undefined,
	res: Response
) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida um email com formato: algo@dominio.ext

	if (!email) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.EMPTY_EMAIL });
	}

	if (!regex.test(email)) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.EMAIL_NOT_VALID });
	}

	const UserExist = await User.findOne({ email: email });

	if (UserExist) {
		return res.status(409).json({
			success: false,
			message: ErrorMessages.EMAIL_ALREADY_USED,
		});
	}
};

export const validatePassword = (
	password: string | undefined,
	res: Response
) => {
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	if (!password) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.EMPTY_PASSWORD });
	}

	if (!regex.test(password)) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.INVALID_PASSWORD });
	}
};

export const validateName = (name: string | undefined, res: Response) => {
	console.log("entrei");

	if (!name) {
		return res.status(400).json({
			success: false,
			message: ErrorMessages.EMPTY_NAME,
		});
	}
	if (name.length < 3) {
		return res.status(400).json({
			success: false,
			message: ErrorMessages.TOO_SHORT_NAME,
		});
	}
};

//#endregion

//#region Restaurant / Company

//#endregion

export const validateCpf = (cpf: string | undefined, res: Response) => {
	if (!cpf) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.EMPTY_CPF });
	}

	if (cpf.length !== 11 || isNaN(Number(cpf))) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.INVALID_CPF });
	}
};

export const validateCep = (cep: string | undefined, res: Response) => {
	if (!cep) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.EMPTY_CEP });
	}

	if (cep.length !== 8 || isNaN(Number(cep))) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.INVALID_CEP });
	}
};

export const validatePrice = (price: number | undefined, res: Response) => {
	if (!price) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.EMPTY_PRICE });
	}

	if (price < 0) {
		return res.status(400).json({
			success: false,
			message: ErrorMessages.INVALID_PRICE,
		});
	}
};

export const validateNumber = (number: number | undefined, res: Response) => {
	if (!number) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.EMPTY_NUMBER });
	}

	if (number <= 0) {
		return res.status(400).json({
			success: false,
			message: "Número inválido. Deve ser maior que zero.",
		});
	}
};

export const validateDescription = (description: string, res: Response) => {
	if (!description) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.EMPTY_DESCRIPTION });
	}

	if (description.length < 30) {
		return res.status(400).json({
			success: false,
			message: ErrorMessages.EMPTY_DESCRIPTION,
		});
	}
};

export const validateCNPJ = (cnpj: string | undefined, res: Response) => {
	if (!cnpj) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.EMPTY_CNPJ });
	}

	if (cnpj.length !== 14 || isNaN(Number(cnpj))) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.INVALID_CNPJ });
	}

	// Regex para verificar se todos os números são iguais
	const repeatedNumberPattern = /^(\d)\1{13}$/;
	if (repeatedNumberPattern.test(cnpj)) {
		return res
			.status(400)
			.json({ success: false, message: ErrorMessages.INVALID_CNPJ });
	}

	// Código adicional para outras validações do CNPJ, se necessário
};

export const validSignupFields = async (
	fields: IValidations,
	res: Response
): Promise<boolean> => {
	//Validações comuns
	validateName(fields.name, res);
	validateEmail(fields.email, res);
	validatePassword(fields.password, res);

	// employee
	if (fields.userType === UserType.EMPLOYEE) {
		validateCpf(fields.cpf, res);
	}

	if (
		fields.userType === UserType.COMPANY ||
		fields.userType === UserType.RESTAURANT
	) {
		validateCep(fields.cep, res);
		validateNumber(fields.number, res);
		validateCNPJ(fields.cnpj, res);
	}
	return true;
};
