import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import GenericInput from "./GenericInput";
import { FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Register.css";
import RestaurantRegister from "./RestaurantRegister";

interface FormData {
  email: string;
  password1: string;
  password2: string;
  role: string;
}



const Register = () => {

	const [ step, setStep ] = useState<number>(1);
	const [ role, setRole ] = useState<string>('restaurante');
	const [ data, setData ] = useState({}); // novo estado para armazenar os dados do formulário


	function handleStep(){
		if(step === 1){
			setStep(step + 1);
		}
		else if(step <= 2){
			setStep(step - 1);
		}
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const newData: FormData = {
			email: formData.get("email") as string,
			password1: formData.get("password1") as string,
			password2: formData.get("password2") as string,
			role: formData.get("row-radio-buttons-group") as string,
		};
		
		setData(newData); // armazena os dados do formulário no estado
		handleStep();
	}

	function  handleRoleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setRole(event.target.value);
	}

	return (
		<>
			{ step === 1 && (
				<form onSubmit={handleSubmit}>
						<div className="basic-info-container">
							<h1>Vamos criar sua conta</h1>
							<GenericInput
								type="email"
								placeholder="Ex: sara@gmail.com"
								labelText="Email"
								name="email"
							/>
							<GenericInput
								type="password"
								placeholder="Digite a sua senha"
								labelText="Digite a sua senha"
								name="password1"
							/>
							<GenericInput
								type="password"
								placeholder="Digite a sua senha novamente"
								labelText="Confirme a sua senha"
								name="password2"
							/>
							<div>
								<div>
									<FormControl>
										<FormLabel id="demo-row-radio-buttons-group-label">
											Você quer se cadastrar como
										</FormLabel>
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
											onChange={handleRoleChange}
										>
											<FormControlLabel
												value="restaurante"
												control={<Radio />}
												label="Restaurante"
											/>
											<FormControlLabel value="empresa" control={<Radio />} label="Empresa" />
										</RadioGroup>
									</FormControl>
								</div>
							</div>
							<Button variant="contained" color="primary"type="submit" >
								Continuar
							</Button>
						</div>
						<span>
						Já tem uma conta? <NavLink to={"/login"}> Entrar</NavLink>
						</span>
				</form>
			) }

			{ step === 2 && role === 'restaurante' &&(
				<>
					<Button  onClick={handleStep} >
					Voltar
					</Button>

					< RestaurantRegister  data={data} />

					
					
				</>
			)}

			{ step === 2 && role === 'empresa' &&(
				<>
					<Button  onClick={handleStep} >
					Voltar
					</Button>
					
					<h1>Empresa</h1>
					<form onSubmit={handleSubmit} >
						<Button variant="contained" color="primary" type="submit">
							Registrar
						</Button>
        	</form>
				</>
			)}
		</>
	);
};

export default Register;
