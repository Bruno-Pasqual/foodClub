import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
	ICompany,
	IEmployee,
	IRestaurant,
} from "../models/interfaces/interfaces";

export const verifyToken = async (
	req: Request,
	res: Response,
	next: Function
) => {
	try {
		const token = req.cookies.fctoken;

		if (!token) {
			return res.status(401).json({ message: "Unauthorized - no token provided" });
		}

		const decoded = jwt.verify(
			token as string,
			process.env.JWT_SECRET as string
		) as jwt.JwtPayload;

		if (!decoded || typeof decoded.userId !== "string") {
			return res.status(401).json({ message: "Unauthorized - invalid token" });
		}

		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error verifying token: ", error);
		return res.status(500).json({ message: "Error verifying token" });
	}
};

export const initialUSerToken = (
	user: IRestaurant | ICompany | IEmployee
): void => {
	const verificationToken = Math.floor(100000 + Math.random() * 9000).toString();

	user.verificationToken = verificationToken;
	user.verificationTokenExpireAt = new Date(
		Date.now() + 7 * 24 * 60 * 60 * 1000
	);
};
