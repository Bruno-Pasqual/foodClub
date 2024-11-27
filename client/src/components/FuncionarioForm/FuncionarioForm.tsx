import { useAuthStore } from "../../stores/authStores";
import GenericInput from "../GenericInput";
import "./FuncionarioForm.css";
import { useState } from "react";

const formatCPF = (cpf: string) => {
	const onlyNumbers = cpf.replace(/\D/g, "");
	if (onlyNumbers.length <= 11) {
		return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	}
	return onlyNumbers;
};

const FuncionarioForm = () => {
	const { employeeDTO, setEmployeeDTO } = useAuthStore();

	const [error, setError] = useState<string | null>(null);
	const [password2, setPassword2] = useState<string>("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "cpf") {
			const formattedCPF = formatCPF(value);
			setEmployeeDTO({
				...employeeDTO,
				[name]: formattedCPF,
			});
		} else {
			if (name !== "password2") {
				setEmployeeDTO({
					...employeeDTO,
					[name]: value,
				});
			}

			if (name === "password2") {
				if (value !== employeeDTO.password) {
					setError("As senhas não coincidem!");
				} else {
					setError(null);
				}
			}
		}
	};

	return (
		<div className="funcionario-form-container">
			<div className="funcionario-form-header">
				<div
					className="funcionario-image"
					style={{
						backgroundImage: employeeDTO.image ? `url(${employeeDTO.image})` : "none",
					}}
				></div>
				<p>{employeeDTO.name ? employeeDTO.name : "Novo Funcionario"}</p>
			</div>
			<GenericInput
				type="text"
				placeholder="Nome"
				labelText="Nome"
				name="name"
				value={employeeDTO.name}
				onChange={handleInputChange}
			/>
			<GenericInput
				type="email"
				placeholder="renata@gmail.com"
				labelText="Email"
				name="email"
				value={employeeDTO.email}
				onChange={handleInputChange}
			/>
			<GenericInput
				type="text"
				placeholder="CPF"
				labelText="CPF"
				name="cpf"
				value={employeeDTO.cpf}
				onChange={handleInputChange}
				maxLength={14}
			/>
			<GenericInput
				type="text"
				placeholder="Imagem"
				labelText="Imagem"
				name="image"
				value={employeeDTO.image}
				onChange={handleInputChange}
			/>
			<GenericInput
				type="password"
				placeholder="Senha"
				labelText="Senha"
				name="password"
				value={employeeDTO.password}
				onChange={handleInputChange}
			/>
			<GenericInput
				type="password"
				placeholder="Confirmar senha"
				labelText="Confirmar senha"
				name="password2"
				value={password2}
				onChange={(e) => setPassword2(e.target.value)}
			/>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default FuncionarioForm;
