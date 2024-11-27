import { create } from "zustand";
import { ICompany } from "../interfaces/company";
import axios from "axios";
import { handleAxiosError } from "../utils/utils";

const API_URL = "http://localhost:5000/api/company/";

interface ICompanyStore {
	company: ICompany | null;
	setCompany: (company: ICompany) => void;
	isLoading: boolean;
	error: string;
	chooseRestaurant: (companyId: string, restaurantId: string) => Promise<void>;
	getCompany: (id: string) => Promise<void>;
}

export const useCompanyStore = create<ICompanyStore>((set) => ({
	company: null,
	isLoading: false,
	error: "",

	chooseRestaurant: async (companyId: string, restaurantId: string) => {
		try {
			// Enviar o restaurantId dentro de um objeto para o backend
			const response = await axios.patch(
				API_URL + "/" + companyId + "/restaurant/select",
				{ restaurantId }, // Envolvendo restaurantId em um objeto
				{ withCredentials: true }
			);

			if (!response.data.success) {
				set({ error: response.data.message });
				return;
			}

			set({ company: response.data.data });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},

	setCompany: (company: ICompany) => set({ company }),
	getCompany: async (id: string) => {
		try {
			const response = await axios.get(API_URL + id);
			if (!response.data.success) {
				set({ error: response.data.message });
				return;
			}
			set({ company: response.data.data });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},
}));
