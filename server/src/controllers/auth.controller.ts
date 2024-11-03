import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

import { Request, Response } from "express";
import { isEmail, passwordEmailValidations } from "../utils/helpers";
import { UserType } from "../models/enums/enums";
import {
	ICompany,
	IEmployee,
	IRestaurant,
} from "../models/interfaces/interfaces";

// Signup
export const signup = async (req: Request, res: Response) => {
	const userData: IRestaurant | IEmployee | ICompany = req.body;

	// Validação condicional com base no tipo de usuário
	let validationError;
	switch (userData.userType) {
		case UserType.COMPANY:
			validationError = validateCompanyRegistration(userData as ICompany, res);
			break;
		case UserType.RESTAURANT:
			validationError = validateRestaurantRegistration(
				userData as IRestaurant,
				res
			);
			break;
		case UserType.EMPLOYEE:
			validationError = validateEmployeeRegistration(userData as IEmployee, res);
			break;
		default:
			return res.status(400).json({ message: "User type is invalid." });
	}
};

// Login
// CheckAuth
// Delete User (Admin)
