import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDb";

import authRoutes from "./routes/auth.routes";
import companyRoutes from "./routes/company.routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: (origin, callback) => {
			// Lista de origens permitidas
			const allowedOrigins = [
				"http://localhost:5173",
				"https://foodclub2.netlify.app",
			];

			// Permitir requisições sem 'origin' (como as feitas por ferramentas locais como Postman)
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Não permitido pela política de CORS"));
			}
		},
		credentials: true, // Permitir envio de cookies
	})
);
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//Rotas
app.use("/api/auth", authRoutes);
app.use("/api/auth", companyRoutes);

export const startServer = async () => {
	try {
		await connectDB();
		console.log("MongoDB conectado!");
		app.listen(PORT, () => {
			console.log(`Servidor rodando na porta ${PORT}`);
		});
	} catch (error) {
		console.error("Erro ao iniciar o servidor:", error);
		process.exit(1);
	}
};

startServer();
