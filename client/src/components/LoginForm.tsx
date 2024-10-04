import React from "react";
import GenericInput from "./GenericInput";
import "./LoginForm.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const LoginForm = () => {
	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		// Obtém os valores dos inputs pelo nome
		const form = event.currentTarget;

		const nameInput = form.elements.namedItem("name") as HTMLInputElement;
		const senhaInput = form.elements.namedItem("senha") as HTMLInputElement;

		const nameValue = nameInput.value;
		const senhaValue = senhaInput.value;

		console.log("Nome:", nameValue);
		console.log("Senha:", senhaValue);

		// Limpa os campos do formulário
		nameInput.value = "";
		senhaInput.value = "";
	}

	return (
		<form onSubmit={handleSubmit}>
			<GenericInput
				name="name"
				placeholder="Digite o seu email"
				type="email"
				labelText="Nome"
			/>
			<GenericInput
				name="senha"
				placeholder="Senha"
				type="password"
				labelText="Senha"
			/>
			<Button variant="outlined" color="error" type="submit">
				Entrar
			</Button>

			<span>
				Ainda não tem uma conta? <NavLink to={"/cadastro"}>Cadastro</NavLink>
			</span>
		</form>
	);
};

export default LoginForm;
