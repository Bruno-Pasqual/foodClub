import { Request, Response } from "express";
import { Employee } from "../models/Employee";
import { IndividualOrder } from "../models/IndividualOrder";
import { CompanyOrder } from "../models/CompanyOrder";

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
		const { employeeId, companyOrderId } = req.params;
		const { dishes } = req.body;

		if (dishes.length === 0) {
			return res.status(400).json({
				success: false,
				message: "O pedido individual precisa de pelo menos um prato",
			});
		}

		if (!employeeId || !companyOrderId) {
			return res.status(400).json({
				success: false,
				message: "Funcionário e pedido obrigatórios",
			});
		}

		const employee = await Employee.findById(employeeId);

		if (!employee) {
			return res.status(400).json({
				success: false,
				message: "Funcionário não encontrado",
			});
		}

		const companyOrder = await CompanyOrder.findById(companyOrderId);

		if (!companyOrder) {
			return res.status(400).json({
				success: false,
				message: "Pedido nao encontrado",
			});
		}

		if (employee.company.toString() !== companyOrder.company.toString()) {
			return res.status(400).json({
				success: false,
				message: "Funcionário nao pertence a empresa do pedido",
			});
		}

		const individualOrder = new IndividualOrder({
			employee: employeeId,
			companyOrder: companyOrderId,
			dishes,
		});

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
