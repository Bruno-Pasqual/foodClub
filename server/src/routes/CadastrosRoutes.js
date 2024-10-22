import express from "express";
import empresaController from "../controllers/empresaController.js";

const routes = express.Router();

routes.get("/Registro", empresaController.listarempresa);
routes.get("/Registro/:id", empresaController.listarempresaPorId);
routes.post("/Registro", empresaController.cadastrar);
routes.put("/Registro/:id", empresaController.atualizarempresa);
routes.delete("/Registro/:id", empresaController.excluirempresa);


export default routes