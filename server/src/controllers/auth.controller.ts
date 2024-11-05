//#region Imports
import { Request, RequestHandler, Response } from "express";

import {
	ICompany,
	IEmployee,
	IRestaurant,
	IValidations as IFieldsValidationsDTO,
	IUser,
} from "../models/interfaces/interfaces";

//#endregion

export const signup = async (req: Request, res: Response): Promise<any> => {
	const userData: IRestaurant | IEmployee | ICompany = req.body;

	const values = Object.entries(userData).map(([key, value]) => {
		return { [key]: value };
	});

	console.log(values);

	const emptyValue = values.some((value) => {
		return value.value === undefined;
	});

	console.log("emptyValue", emptyValue);

	if (emptyValue) {
		return res.status(400).json({
			message: "Todos os campos obrigatórios devem ser preenchidos",
			code: 400,
		});
	}

	switch (userData.userType) {
		case "company":
		case "employee":
		case "restaurant":

		default:
			return res.status(400).json({
				message: "Tipo de usuário inválido",
				code: 400,
			});
	}
};
