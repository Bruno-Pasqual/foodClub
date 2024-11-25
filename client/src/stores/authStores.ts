import axios from "axios";
import { create } from "zustand";
import { IUser } from "../interfaces/user";

// const API_URL = "https://food-club-api.onrender.com/api/auth/"; //production
const API_URL = "http://localhost:5000/api/auth/"; //development

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
		// Setando o estado inicial de carregamento
		set({ isLoading: true, error: "" });

		try {
			// Faz a requisição para verificar a autenticação
			const response = await axios.get(API_URL + "check-auth", {
				withCredentials: true,
			});

			// Caso o backend retorne sucesso, atualiza o estado com o usuário
			set({
				user: response.data.user,
				isAuthenticated: response.data.success,
				isLoading: false,
			});
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Tratando erros de 401 ou outros
				if (error.response?.status === 401) {
					set({ error: "Unauthorized", isAuthenticated: false, user: null });
				} else {
					set({ error: "An error occurred", isAuthenticated: false, user: null });
				}

				set({ isLoading: false });
			}
		}
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
			const response = await axios.post(
				API_URL + "logout",
				{},
				{
					withCredentials: true,
				}
			);

			console.log(response);

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
