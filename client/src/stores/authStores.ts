import axios from "axios";
import { create } from "zustand";
import { IUser } from "../interfaces/user";

const API_URL = "https://food-club-api.onrender.com/api/auth/";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function handleAxiosError(error: unknown, set: Function) {
	//Função criada para cuidar dos erros que podem ser tanto em relação ao back-end, rede ou qualquer outro erro
	if (axios.isAxiosError(error) && error.response) {
		set({
			error: error.response.data.message || "Erro desconhecido.",
			isLoading: false,
		});
	} else {
		set({
			error: "Erro de conexão. Tente novamente mais tarde.",
			isLoading: false,
		});
	}
}

interface iAuthStore {
	user: IUser | null;
	isAuthenticated: boolean;
	role: string;
	isLoading: boolean;
	error: string;
	login: (email: string, password: string) => Promise<void>;
	checkAuth: () => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<iAuthStore>((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: "",
	role: "",

	checkAuth: async () => {
		//TODO - Verificando se existe um usuário no localStorage, se houver redireciona para página inicial (remover, deve usar o token)

		const user = localStorage.getItem("user");

		if (user) {
			set({ user: JSON.parse(user), isAuthenticated: true, isLoading: false });
			return;
		} else {
			set({ user: null, isAuthenticated: false, isLoading: false });
		}

		set({ isLoading: true, error: "" });
	},

	login: async (email: string, password: string) => {
		set({ isLoading: true, error: "" });
		try {
			const response = await axios.post(
				API_URL + "login",
				{
					email,
					password,
				},
				{
					withCredentials: true,
				}
			);

			if (!response.data.success) {
				set({ error: response.data.message, isLoading: false });
				return;
			}

			localStorage.setItem("user", JSON.stringify(response.data.user)); //TODO - adicionando o user no sessionStorage (remover depois)
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},

	logout: async () => {
		set({ isLoading: true, error: "" });
		try {
			const response = await axios.post(API_URL + "logout", {
				withCredentials: true,
			});

			if (response.data.success) {
				localStorage.removeItem("user");
				set({ user: null, isAuthenticated: false, isLoading: false });
				return;
			}

			set({ user: null, isAuthenticated: false, isLoading: false });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},
}));
