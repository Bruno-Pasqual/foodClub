import express from "express";
import cadastro from "./CadastrosRoutes.js"

const routes =(app) =>{
    app.route("/").get((req,res) => res.status(200).send("online"))

    app.use(express.json(), cadastro);
}

export default routes