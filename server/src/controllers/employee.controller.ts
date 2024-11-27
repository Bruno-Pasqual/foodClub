import { Request, Response } from "express";
import { Employee } from "../models/Employee";
import { CompanyOrder } from "../models/CompanyOrder";
import IndividualOrder from "../models/IndividualOrder";
import { Restaurant } from "../models/Restaurant";

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
		const { dishes, employeeId, companyOrderId, restaurantId } = req.body;

		// Validação de pratos
		if (dishes.length === 0) {
			return res.status(400).json({
				success: false,
				message: "O pedido individual precisa de pelo menos um prato",
			});
		}

		// Validação de parâmetros obrigatórios
		if (!employeeId || !companyOrderId) {
			return res.status(400).json({
				success: false,
				message: "Funcionário e pedido obrigatórios",
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

		// Verificando se o pedido existe
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
				message: "Funcionário não pertence a empresa do pedido",
			});
		}

		// Criando o pedido individual
		const individualOrder = new IndividualOrder({
			employee: employeeId,
			companyOrder: companyOrderId,
		});

		// Buscando o restaurante
		const restaurant = await Restaurant.findById(restaurantId);
		if (!restaurant) {
			return res.status(400).json({
				success: false,
				message: "Restaurante não encontrado",
			});
		}

		// Adicionando os pratos ao pedido individual
		const validDishes = restaurant.dishes.filter((dish) =>
			dishes.includes(dish._id.toString())
		);

		validDishes.forEach((dish) => {
			individualOrder.dishes.push(dish);
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
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao criar o pedido individual",
			error,
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
