//#region Imports

import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";

import { UserType } from "../models/enums/enums";
import { Company } from "../models/Company";
import { Employee } from "../models/Employee";
import { Restaurant } from "../models/Restaurant";
import {
	getErrorCreationMessage,
	getCreationMessage as getSuccessCreationMessage,
} from "../utils/helpers";
import { validSignupFields } from "../utils/validations";
import {
	ICompany,
	IEmployee,
	IRestaurant,
	IValidations as IFieldsValidationsDTO,
	IUser,
} from "../models/interfaces/interfaces";
import { User } from "../models/User";

//#endregion

export const signup = async (req: Request, res: Response): Promise<any> => {
	const userData: IRestaurant | IEmployee | ICompany = req.body;

	const userDataIsEmpty = (obj: object): boolean => {
		return Object.keys(obj).length === 0;
	};

	if (userDataIsEmpty(userData)) {
		return res
			.status(400)
			.json({ success: false, message: "User data is empty.", data: null });
	}

	const validFields = await validSignupFields(
		userData as IFieldsValidationsDTO,
		res
	);

	console.log(validFields);

	if (validFields) {
		try {
			userData.password = await bcrypt.hash(userData.password, 10);

			let newUser: IRestaurant | IEmployee | ICompany;

			switch (userData.userType) {
				case UserType.COMPANY:
					newUser = await Company.create(userData);
					break;
				case UserType.RESTAURANT:
					newUser = await Restaurant.create(userData);
					break;
				case UserType.EMPLOYEE:
					newUser = await Employee.create(userData);
					break;
				default:
					return res
						.status(400)
						.json({ success: false, message: "User type is invalid.", data: null });
			}

			return res.status(201).json({
				success: true,
				message: getSuccessCreationMessage(userData.userType),
				user: { ...newUser, password: undefined },
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: error,
			});
		}
	}
};
