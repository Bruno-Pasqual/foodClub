import React from "react";

import "./LoginForm.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import GenericInput from "./GenericInput";

const LoginForm = () => {
	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		console.log(data);
		//aqui deve ser feita a chamada do axios
	}

	return (
		<form onSubmit={handleSubmit} className="form-principal">
			<h1>Entrar</h1>
			<GenericInput
				name="email"
				placeholder="Digite o seu email"
				type="email"
				labelText="Nome"
			/>
			<GenericInput
				name="password"
				placeholder="Senha"
				type="password"
				labelText="Senha"
			/>
			<Button variant="contained" color="primary" type="submit">
				Entrar
			</Button>

			<span>
				Ainda não tem uma conta? <NavLink to={"/cadastro"}>Cadastro</NavLink>
			</span>
		</form>
	);
};

export default LoginForm;
