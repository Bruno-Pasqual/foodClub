//#region Imports
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import {
	ICompany,
	IEmployee,
	IRestaurant,
} from "../models/interfaces/interfaces";
import { Restaurant } from "../models/Restaurant";
import { validateEmployeeData, validateUserData } from "../utils/validations";
import { UserType } from "../models/enums/enums";
import { Employee } from "../models/Employee";
import { initialUSerToken as setInitialUserToken } from "../middleware/verifyToken";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import { Company } from "../models/Company";
import { mapUserTypeToEnum } from "../utils/helpers";

//#endregion

export const logout = async (req: Request, res: Response): Promise<any> => {
	res.clearCookie("fctoken", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
	});
	return res.status(200).json({ success: true, message: "Logout efetuado." });
};

export const login = async (req: Request, res: Response): Promise<any> => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return res
				.status(404)
				.json({ success: false, message: "Email e senha são obrigatórios." });
		}

		const user = await User.findOne({ email }).populate("employees");

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

		generateTokenAndSetCookie(res, user._id.toString());
		user.lastLogin = new Date();

		await user.save();
		user.password = "";

		return res
			.status(200)
			.json({ success: true, message: "Login efetuado com sucesso.", user: user });
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

	userData.cpf = userData.cpf ? userData.cpf.replace(/\D/g, "") : "00000000000";

	try {
		const invalidField = await validateEmployeeData(userData);
		if (invalidField) {
			return res.status(invalidField.code || 400).json(invalidField);
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashedPassword;

		setInitialUserToken(userData);
		const user = new Employee(userData);

		const company = await Company.findOne({ _id: userData.company });

		if (!company) {
			return res.status(404).json({
				success: false,
				message: "Empresa informada nao encontrada.",
			});
		}

		company.employees.push(user._id);

		await company.save();
		await user.save();

		return res
			.status(201)
			.json({ success: true, message: "Funcionário Cadastrado." });
	} catch (error) {
		if (error instanceof Error)
			return res.status(500).json({
				success: false,
				message: "algo deu errado ao criar o funcionário." + error.message,
			});
	}
};

export const businessSignup = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userData: IRestaurant | ICompany = req.body;

	userData.userType = mapUserTypeToEnum(userData.userType);

	//TODO - Por que está dando esse problema aqui?
	userData.number = userData.number || "200";
	userData.cep = userData.cep.length > 8 ? userData.cep : "00000-000";

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
			const user = new Company(userData);
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

export const checkAuth = async (req: Request, res: Response) => {
	const token = req.cookies.fctoken;

	if (!token) {
		res.status(401).json({ message: "Unauthorized - no token provided" });
		return;
	}

	const decoded = jwt.verify(
		token as string,
		process.env.JWT_SECRET as string
	) as jwt.JwtPayload;

	const user = await User.findById(decoded.userId);

	if (!user) {
		res.clearCookie("fctoken");
		res
			.status(401)
			.json({ success: false, message: "Unauthorized - invalid token" });
		return;
	}

	user.password = "";

	res.status(200).json({ success: true, message: "Authorized", user: user });
	return;
};

export const getIsEmailAvailable = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email });

		if (user) {
			res.status(400).json({ available: false, message: "Email já cadastrado." });
			return;
		} else {
			res.status(200).json({ available: true, message: "Email disponível." });
			return;
		}
	} catch (error) {
		res
			.status(500)
			.json({ available: false, message: "Erro interno do servidor." });
		return;
	}
};

export const listUsers = async (req: Request, res: Response): Promise<any> => {
	try {
		const users = await User.find();

		return res.status(200).json({ success: true, data: users });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "algo deu errado ao listar os usuários." + error,
		});
	}
};
