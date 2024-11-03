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

export const validateCpf = (cpf: string, res: Response) => {
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

export const validateCep = (cep: string, res: Response) => {
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

export const validatePrice = (price: number, res: Response) => {
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

export const validateNumber = (number: number, res: Response) => {
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

const restaurantValidations = async (fields: IValidations, res: Response) => {
	if (fields.name != undefined) {
		validateName(fields.name, res);
	} else {
		return res.status(400).json({
			success: false,
			message: ErrorMessages.EMPTY_NAME,
		});
	}
};

export const validateFields = async (
	fields: IValidations,
	res: Response
): Promise<boolean> => {
	//Validações comuns
	validateName(fields.name, res);
	validateEmail(fields.email, res);
	validatePassword(fields.password, res);

	// employee
	if (fields.userType === UserType.EMPLOYEE) {
		if (fields.cpf) validateCpf(fields.cpf, res);
	}

	// Empresa
	if (fields.cep) validateCep(fields.cep, res);
	if (fields.number) validateNumber(fields.number, res);
	if (fields.price) validatePrice(fields.price, res);
	if (fields.description) validateDescription(fields.description, res);
	return true;
};
