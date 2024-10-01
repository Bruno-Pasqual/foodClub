import React from "react";
import GenericInput from "./GenericInput";
import "./LoginForm.css";

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
			<button className="submit-btn" type="submit">
				Entrar
			</button>
			<span>Ainda não tem uma conta? Faça o cadastro</span>
		</form>
	);
};

export default LoginForm;
