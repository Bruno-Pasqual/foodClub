import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import GenericInput from "./GenericInput";
import { FormEvent } from "react";

const Cadastro = () => {
	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit}>
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
			<Button variant="contained" color="error">
				Continuar
			</Button>
		</form>
	);
};

export default Cadastro;
