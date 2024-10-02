import GenericInput from "./GenericInput";

type Props = { name: string };

const Cadastro = (props: Props) => {
	return (
		<form action="">
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
				<p>Você quer se cadastrar como ?</p>
				<div>
					<div>
						<input
							type="radio"
							name="empresa-chk"
							id="empresa-chk"
							value={"empresa"}
						/>
						<label htmlFor="empresa-chk">Empresa</label>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Cadastro;
