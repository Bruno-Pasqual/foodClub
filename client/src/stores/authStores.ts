import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/auth/";

interface iAuthStore {}

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: false,
	isCheckingAuth: true,
}));
