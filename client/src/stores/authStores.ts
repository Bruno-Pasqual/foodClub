import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/auth/";

interface iAuthStore {
	user: unknown;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string;
}

export const useAuthStore = create<iAuthStore>((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: "",

	login: async (email: string, password: string) => {
		set({ isLoading: true, error: "" });
		try {
			const response = await axios.post(API_URL + "login", {
				email,
				password,
			});

			if (!response) {
				set({ error: "Algo deu errado ao fazer login", isLoading: false });
			}

			if (response.data.success !== true) {
				set({ error: response.data.message, isLoading: false });
				return;
			}

			set({ user: response.data, isAuthenticated: true, isLoading: false });
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message, isLoading: false });
			}
		}
	},
}));
