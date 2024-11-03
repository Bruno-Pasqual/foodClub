import express from "express";
import cadastro from "./routes/CadastrosRoutes.js";
import Pratos from "./routes/PratosRoutes.js";

const routes = (app) => {
	app.route("/").get((req, res) => res.status(200).send("online"));

	app.use(express.json(), cadastro, Pratos);
};

export default routes;
