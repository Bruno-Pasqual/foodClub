import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant";
import { IRestaurant } from "../models/interfaces/interfaces";
import mongoose from "mongoose";
import Dish from "../models/Dish";

export const getDishes = async (req: Request, res: Response): Promise<any> => {
	try {
		const { restaurantId } = req.params;

		if (!restaurantId) {
			return res
				.status(400)
				.json({ success: false, message: "É necessário informar o restaurante" });
		}

		const restaurant: IRestaurant | null = await Restaurant.findById(
			restaurantId
		).populate("dishes");

		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, error: "Restaurante não encontrado" });
		}

		return res.status(200).json({ success: true, data: restaurant.dishes });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Algo deu errado ao buscar os pratos" });
	}
};

export const updateDish = async (req: Request, res: Response): Promise<any> => {
	try {
		const { dishId } = req.params; // IDs do restaurante e do prato
		const { name, description, price, image } = req.body;

		// Verifica se o ID do prato foi fornecido
		if (!dishId) {
			return res.status(400).json({
				success: false,
				message: "É necessário informar o prato a ser atualizado",
			});
		}

		// Verifica se todos os campos são vazios
		if (!name && !description && !price && !image) {
			return res.status(400).json({
				success: false,
				message:
					"É necessário fornecer ao menos um campo (name, description ou price) para atualizar",
			});
		}

		// Busca o prato pelo ID
		const dish = await Dish.findById(dishId);
		if (!dish) {
			return res.status(404).json({
				success: false,
				message: "Prato não encontrado",
			});
		}

		// Converte dishId para ObjectId para comparar com os IDs de pratos no restaurante

		// Atualiza o prato com os novos dados
		if (name) dish.name = name;
		if (description) dish.description = description;
		if (price) dish.price = price;
		if (image) dish.image = image;

		// Salva as mudanças no prato
		await dish.save();

		return res.status(200).json({
			success: true,
			message: "Prato atualizado com sucesso",
			dish,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao atualizar o prato",
			error: error instanceof Error ? error.message : error,
		});
	}
};

export const deleteDish = async (req: Request, res: Response): Promise<any> => {
	try {
		const { dishId, restaurantId } = req.params;

		if (!dishId) {
			return res
				.status(400)
				.json({ success: false, message: "É necessário informar o prato" });
		}

		const restaurant = await Restaurant.findById(restaurantId);

		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, message: "Restaurante não encontrado" });
		}

		const dishExists = restaurant.dishes.some(
			(dish) => dish._id.toString() === dishId
		);

		if (!dishExists) {
			return res
				.status(404)
				.json({ success: false, message: "Prato não encontrado" });
		}

		// Remove o prato da lista
		restaurant.dishes = restaurant.dishes.filter(
			(dish) => dish._id.toString() !== dishId
		);

		await restaurant.save();

		return res
			.status(200)
			.json({ success: true, message: "Prato excluído com sucesso" });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Algo deu errado ao excluir o prato" });
	}
};

export const createDish = async (req: Request, res: Response): Promise<any> => {
	try {
		const { name, description, price, image, restaurantId } = req.body;

		// Verificar se o restaurante existe
		const restaurant = await Restaurant.findById(restaurantId);
		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, message: "Restaurante não encontrado" });
		}

		// Criação do novo prato
		const newDish = new Dish({
			name,
			description,
			price,
			image,
			ratings: [], // Caso queira um array vazio para ratings
		});

		// Salvar o prato na coleção 'Dish'
		await newDish.save();

		// Adicionar a referência ao prato no restaurante
		restaurant.dishes.push(newDish._id);
		await restaurant.save();

		// Retornar sucesso com os dados do prato
		return res.status(201).json({
			success: true,
			message: "Prato adicionado com sucesso",
			dish: newDish,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Erro ao adicionar o prato",
			error: error instanceof Error ? error.message : error,
		});
	}
};

export const getRestaurants = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const restaurants = await Restaurant.find({}).populate("dishes");
		return res.status(200).json({ success: true, data: restaurants });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os restaurantes",
			error: error,
		});
	}
};

export const getRestaurant = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { id } = req.params;

		const restaurant = await Restaurant.findById(id)
			.populate("dishes") // Popula os pratos do restaurante
			.populate({
				path: "companyOrders",
				populate: {
					path: "collaboratorsOrders", // Popula os pedidos de colaboradores
					populate: {
						path: "dishes.dishId", // Popula os detalhes de cada prato dentro dos colaboradores
					},
				},
			});

		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, message: "Restaurante não encontrado" });
		}

		return res.status(200).json({ success: true, data: restaurant });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar o restaurante",
			error: error,
		});
	}
};

export const ratingDish = async (req: Request, res: Response): Promise<any> => {
	try {
		const { dishId } = req.params;
		const { userId, rating } = req.body;

		if (!rating || !userId) {
			return res
				.status(400)
				.json({ success: false, message: "Informações faltando" });
		}

		const dish = await Dish.findById(dishId);
		if (!dish) {
			return res
				.status(404)
				.json({ success: false, message: "Prato nao encontrado" });
		}

		const alreadyRated = dish.ratings.some((r) => r.userId === userId);
		if (alreadyRated) {
			return res
				.status(400)
				.json({ success: false, message: "Prato já avaliado" });
		}

		dish.ratings.push(rating);
		await dish.save();
		return res
			.status(200)
			.json({ success: true, message: "Avaliação feita com sucesso" });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao avaliar o prato",
			error: error,
		});
	}
};
