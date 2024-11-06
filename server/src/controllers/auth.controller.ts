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
import { initialUSerToken as setInitialUserToken } from "../middleware/verifyToken";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";

//#endregion

export const login = async (req: Request, res: Response): Promise<any> => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res
				.status(404)
				.json({ success: false, message: "Email e senha são obrigatórios." });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "Email ou senha inválido." });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res
				.status(404)
				.json({ success: false, message: "Email ou senha inválido." });
		}

		return res
			.status(200)
			.json({ success: true, message: "Login efetuado com sucesso." });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "algo deu errado ao fazer login." + error,
		});
	}
};

export const employeeSignup = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userData: IEmployee = req.body;

	try {
		const invalidField = await validateEmployeeData(userData);
		if (invalidField) {
			return res.status(invalidField.code || 400).json(invalidField);
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashedPassword;

		setInitialUserToken(userData);
		const user = new Employee(userData);
		await user.save();
		generateTokenAndSetCookie(res, user._id.toString());

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

	try {
		const invalidField = await validateUserData(userData);
		if (invalidField)
			return res.status(invalidField.code || 400).json(invalidField);

		const hashedPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashedPassword;
		setInitialUserToken(userData);

		if (userData.userType === UserType.RESTAURANT) {
			const user = new Restaurant(userData);
			await user.save();
			generateTokenAndSetCookie(res, user._id.toString());

			return res
				.status(201)
				.json({ success: true, message: "Restaurante Cadastrado." });
		} else if (userData.userType === UserType.COMPANY) {
			const user = new Restaurant(userData);
			await user.save();
			generateTokenAndSetCookie(res, user._id.toString());

			return res
				.status(201)
				.json({ success: true, message: "Empresa Cadastrada." });
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: `algo deu errado ao criar ${
				UserType.COMPANY ? "a empresa." : "o restaurante."
			} + error`,
		});
	}
};
