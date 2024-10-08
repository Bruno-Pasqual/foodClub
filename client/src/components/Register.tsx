import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import GenericInput from "./GenericInput";
import React, { FormEvent, useState } from "react";
import "./Register.css";
import RestaurantRegister from "./RestaurantRegister";
import CompanyRegister from "./CompanyRegister";
import ArrowBack from '@mui/icons-material/ArrowBack'; 
import logo from '../assets/Logo.svg'

interface FormData {
  email: string;
  password1: string;
  password2: string;
  role: string;
}


const Register = () => {

	const [ step, setStep ] = useState<number>(1);
	const [ role, setRole ] = useState<string>('restaurante');
	const [ data, setData ] = useState({});
	const [ isAnimating, setIsAnimating ] = useState<boolean>(false);


	function handleStep(){
		if(step  === 1){
				setIsAnimating(true);
			setTimeout(() => {
				setStep(prevStep => prevStep + 1);
				setIsAnimating(false);
			}, 500);
		}else{
			setIsAnimating(true);
			setTimeout(() => {
				setStep(prevStep => prevStep - 1);
				setIsAnimating(false);
			}, 500);
		}
	}

	function  handleRoleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setRole(event.target.value);
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

	return (
		<>
				{ step === 1 && (
				<div className={`step-1-container ${isAnimating ? 'hidden' : 'visible'}`}>
					<div className="logo">
						<img src={logo} alt="logo da empresa" />
					</div>
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
							<Button href="/login" id="btn-login" variant="contained" color="inherit" >
								Retornar para login
							</Button>
							
					</form>

				</div>
				) }

				{step >= 2 && (
					<>
					
					<div className="container" >
						<Button id="return" onClick={handleStep} startIcon={<ArrowBack />} >Voltar</Button>
						<div className={`step-2-container ${isAnimating ? 'hidden' : 'visible'}`} >
							
							{role === 'restaurante' ? (
								<>
									<div className="logo">
										<img src={logo} alt="logo da empresa" />
									</div>
									<RestaurantRegister data={data} />
								</>
							) : (
								<CompanyRegister data={data} />
							)}
						</div>
					</div>
					</>
    		)}
		</>
	);
};

export default Register;
