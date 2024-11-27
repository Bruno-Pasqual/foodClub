import React from "react";
import FormDialog from "../../components/Dialog";
import FuncionarioForm from "../../components/FuncionarioForm/FuncionarioForm";

const Colaboradores = () => {
	return (
		<div className="colaboradores-container">
			<div className="colaboradores-header">
				<h1>Colaboradores</h1>
				<FormDialog titleText="Registrar colaborador">
					<FuncionarioForm />
				</FormDialog>
			</div>
		</div>
	);
};

export default Colaboradores;
