import { Request, Response } from "express";
import { Employee } from "../models/Employee";
import { CompanyOrder } from "../models/CompanyOrder";
import IndividualOrder from "../models/IndividualOrder";
import { Restaurant } from "../models/Restaurant";
import Dish from "./../models/Dish";
import { IDish } from "../models/interfaces/interfaces";

export const getEmployeesByCompany = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { companyId } = req.params;

		if (!companyId) {
			return res.status(400).json({
				success: false,
				message: "Empresa é um campo obrigatório",
			});
		}

		const employees = await Employee.find({ company: companyId });
		return res.status(200).json({ success: true, data: employees });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os funcionários",
			error: error,
		});
	}
};

export const createIndividualOrder = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		// Extraindo parâmetros da requisição
		const { order, employeeId, companyOrderId, restaurantId } = req.body;

		// Validação de parâmetros obrigatórios
		if (
			!employeeId ||
			!companyOrderId ||
			!order ||
			!order.dishId ||
			!order.quantity
		) {
			return res.status(400).json({
				success: false,
				message:
					"Funcionário, pedido da empresa, prato e quantidade são obrigatórios",
			});
		}

		// Verificando se o funcionário existe
		const employee = await Employee.findById(employeeId);
		if (!employee) {
			return res.status(400).json({
				success: false,
				message: "Funcionário não encontrado",
			});
		}

		// Verificando se o pedido da empresa existe
		const companyOrder = await CompanyOrder.findById(companyOrderId);
		if (!companyOrder) {
			return res.status(400).json({
				success: false,
				message: "Pedido da empresa não encontrado",
			});
		}

		// Verificando se o funcionário pertence à empresa do pedido
		if (employee.company.toString() !== companyOrder.company.toString()) {
			return res.status(400).json({
				success: false,
				message: "Funcionário não pertence à empresa do pedido",
			});
		}

		// Buscando o restaurante
		const restaurant = await Restaurant.findById(restaurantId);
		if (!restaurant) {
			return res.status(400).json({
				success: false,
				message: "Restaurante não encontrado",
			});
		}

		// Criando o pedido individual
		const individualOrder = new IndividualOrder({
			employee: employeeId,
			companyOrder: companyOrderId,
			order: {
				dishId: order.dishId,
				quantity: order.quantity,
			},
		});

		// Salvando o pedido individual no pedido da empresa
		companyOrder.collaboratorsOrders.push(individualOrder._id);

		// Salvando o pedido da empresa e o pedido individual
		await companyOrder.save();
		await individualOrder.save();

		return res.status(201).json({
			success: true,
			message: "Pedido individual criado com sucesso",
			data: individualOrder,
		});
	} catch (error) {
		// Tratando erros de forma mais genérica e informativa
		if (error instanceof Error) {
			return res.status(500).json({
				success: false,
				message: "Algo deu errado ao criar o pedido individual",
				error: error.message,
			});
		}
		// Caso o erro não seja do tipo Error
		return res.status(500).json({
			success: false,
			message: "Erro desconhecido ao criar o pedido individual",
		});
	}
};

export const getEmployees = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const employees = await Employee.find({});
		return res.status(200).json({ success: true, data: employees });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os funcionários",
			error: error,
		});
	}
};

export const getIndividualOrdersByCompanyOrder = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { companyOrderId } = req.params;

		// Busca os pedidos individuais e popula apenas os pratos (dishes.dishId)
		const individualOrders = await IndividualOrder.find({
			companyOrder: companyOrderId,
		}).populate("dishes.dishId"); // Popula apenas o campo dishId dentro de dishes

		return res.status(200).json({ success: true, data: individualOrders });
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({
				success: false,
				message: "Algo deu errado ao buscar os pedidos individuais",
				error: error.message,
			});
		}
	}
};
