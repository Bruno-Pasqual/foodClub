//#region Imports
import { Request, Response } from "express";
import {
	ICompany,
	IEmployee,
	IRestaurant,
} from "../models/interfaces/interfaces";
import { Restaurant } from "../models/Restaurant";
import { User } from "../models/User";
import { validateEmployeeData, validateUserData } from "../utils/validations";
import bcrypt from "bcrypt";
import { UserType } from "../models/enums/enums";
import { Company } from "../models/Company";
import { Employee } from "../models/Employee";

//#endregion

export const employeeSignup = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userData: IEmployee = req.body;

	const invalidField = await validateEmployeeData(userData);
	if (invalidField) {
		return res.status(invalidField.code || 400).json(invalidField);
	}

	const hashedPassword = await bcrypt.hash(userData.password, 10);
	userData.password = hashedPassword;

	try {
		const user = new Employee(userData);
		await user.save();
		return res
			.status(201)
			.json({ success: true, message: "Funcionário Cadastrado." });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "algo deu errado ao criar o funcionário." + error,
		});
	}
};

export const businessSignup = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userData: IRestaurant | ICompany = req.body;

	const invalidField = await validateUserData(userData);

	if (invalidField) {
		return res.status(invalidField.code || 400).json(invalidField);
	}

	const hashedPassword = await bcrypt.hash(userData.password, 10);
	userData.password = hashedPassword;

	try {
		if (userData.userType === UserType.RESTAURANT) {
			const user = new Restaurant(userData);
			await user.save();
			return res
				.status(201)
				.json({ success: true, message: "Restaurante Cadastrado." });
		} else if (userData.userType === UserType.COMPANY) {
			const user = new Company(userData);
			await user.save();
			return res
				.status(201)
				.json({ success: true, message: "Empresa Cadastrada." });
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: `algo deu errado ao criar ${
				UserType.COMPANY ? "a empresa." : "o restaurante."
			}`,
		});
	}
};
