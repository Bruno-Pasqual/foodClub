import React, { useState } from "react";

import "./LoginForm.css";
import { Button } from "@mui/material";
import GenericInput from "./GenericInput";
import EmailInput from "./EmailInput";
import imagemFundo from "../assets/eating a variety of foods-bro.svg";
// import axios from "axios";

interface IProps{
	screenSize:number;
}

const LoginForm = ({screenSize}:IProps) => {
	const [password, setPassword] = useState<string>("");

	function handlePasswordChange(
		setPassword: React.Dispatch<React.SetStateAction<string>>
	) {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value.replace(/\s/g, ""); // Remove espaços
			setPassword(value);
		};
	}
	async function handleSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		// const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
		// 	withCredentials: true,
		// });

		console.log(data);
	}

	return (
		<div className="form-img">
			<div id="loginForm">
			
				<form onSubmit={handleSubmit} className="form-principal">
					<div className="tittle">
						<h1>Bem vindo de volta</h1>
						<p>Entrar na sua conta</p>
					</div>
					<div className="form-group">
						<EmailInput
							name="email"
							placeholder="Ex: sara@gmail.com"
							labelText="Email"
							required
						/>
						<span className="error-message" >Error message</span>
					</div>
					<div className="form-group">
						<GenericInput
							minLength={6}
							type="password"
							placeholder="Digite a sua senha"
							labelText="Digite a sua senha"
							name="password"
							value={password}
							onChange={handlePasswordChange(setPassword)}
						/>
						<span className="error-message" >Error message</span>
					</div>
					<Button variant="contained" color="primary" type="submit">
						Entrar
					</Button>

					<span className="link-cadastro" >Não tem conta? <a href="/cadastro">Cadastre-se agora</a></span>

				</form>

			
		</div>

			{ screenSize > 800 && (
				<div className="imagem-fundo">
					<img src={imagemFundo} alt="logo da empresa" />
				</div>
			) }

		</div>
	);
};

export default LoginForm;
