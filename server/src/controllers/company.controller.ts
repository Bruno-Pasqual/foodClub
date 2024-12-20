import { Request, Response } from "express";
import { Company } from "../models/Company";
import { UserType } from "../models/enums/enums";
import { CompanyOrder } from "../models/CompanyOrder";
import mongoose from "mongoose";
import { Restaurant } from "../models/Restaurant";
import { Employee } from "../models/Employee";

export const getEmployeesByCompany = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { companyId } = req.params;
	try {
		console.log(companyId);
		const employees = await Employee.find({ company: companyId });
		return res.status(200).json({ success: true, data: employees });
	} catch (error) {
		if (error instanceof Error) {
			{
				return res.status(404).json({
					success: false,
					message: "Empresa nao encontrada",
				});
			}
		}
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os colaboradores",
			error: error,
		});
	}
};

export const getCompanies = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const companies = await Company.find({ userType: UserType.COMPANY });
		return res.status(200).json({ success: true, data: companies });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar as empresas",
			error: error,
		});
	}
};

export const chooseRestaurant = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { restaurantId } = req.body;
		const { companyId } = req.params;

		console.log(restaurantId, companyId);

		const company = await Company.findById(companyId);

		if (!company) {
			return res.status(404).json({
				success: false,
				message: "Empresa não encontrada",
			});
		}

		company.affiliateRestaurants.push(restaurantId);
		await company?.save();

		return res.status(200).json({ success: true, data: company });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os restaurantes",
			error: error,
		});
	}
};

export const getCompany = async (req: Request, res: Response): Promise<any> => {
	const { companyId } = req.params;

	try {
		const company = await Company.findById(companyId)
			.populate("employees")
			.populate({
				path: "affiliateRestaurants",
				populate: {
					path: "dishes",
				},
			});
		return res.status(200).json({ success: true, data: company });
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === "CastError") {
				return res.status(404).json({
					success: false,
					message: "Empresa não encontrada",
				});
			}
		}
	}
};

export const nextOrderCode = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const ordersCount = await CompanyOrder.countDocuments({});
		return `COD${ordersCount + 1}`;
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar o código do pedido",
			error: error,
		});
	}
};

export const createCompanyOrder = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { companyId, restaurantId } = req.body;
		const code = await nextOrderCode(req, res);

		if (!companyId || !code || !restaurantId) {
			return res.status(400).json({
				success: false,
				message: "Empresa, restaurante e código são obrigatórios",
			});
		}

		const todayOrderOpen = await checkIfOrderExists(companyId);

		if (todayOrderOpen) {
			return res.status(400).json({
				success: false,
				message: "Ja existe um pedido em aberto para hoje",
			});
		}

		const companyOrder = new CompanyOrder({
			company: companyId,
			code,
			restaurant: restaurantId,
		});

		const restaurant = await Restaurant.findById(restaurantId);
		if (!restaurant) {
			return res.status(404).json({
				success: false,
				message: "Restaurante nao encontrado",
			});
		}

		restaurant.companyOrders.push(companyOrder.id);

		await restaurant.save();
		await companyOrder.save();

		return res.status(200).json({ success: true, data: companyOrder });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao criar o pedido",
			error: error,
		});
	}
};

async function checkIfOrderExists(companyId: string) {
	try {
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date();
		endOfDay.setHours(23, 59, 59, 999);

		const existingOrder = await CompanyOrder.findOne({
			company: companyId,
			createdAt: { $gte: startOfDay, $lte: endOfDay },
		});

		if (existingOrder) {
			return true;
		} else {
			// Se não existir um pedido
			return false;
		}
	} catch (error) {
		console.error("Erro ao verificar pedido:", error);
		throw new Error("Erro ao verificar pedido");
	}
}

export const getCompanyOrders = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { companyId } = req.params;
		const orders = await CompanyOrder.find({ company: companyId }).populate(
			"collaboratorsOrders"
		);
		return res.status(200).json({ success: true, data: orders });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os pedidos",
			error: error,
		});
	}
};

export const getCompanyOrdersByRestaurant = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { restaurantId } = req.params;

		if (!restaurantId) {
			return res.status(400).json({
				success: false,
				message: "Restaurante obrigatório",
			});
		}

		// Converte o restaurantId para ObjectId, caso não seja
		const objectIdRestaurant = new mongoose.Types.ObjectId(restaurantId);

		const orders = await CompanyOrder.find({
			restaurant: objectIdRestaurant,
		}).populate("collaboratorsOrders");

		if (orders.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Nenhum pedido encontrado para este restaurante.",
			});
		}

		return res.status(200).json({ success: true, data: orders });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os pedidos",
			error,
		});
	}
};
