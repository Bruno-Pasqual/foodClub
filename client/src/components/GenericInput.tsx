interface GenericInputProps {
	name: string;
	placeholder: string;
	type: string;
	labelText: string;
}

const GenericInput = (props: GenericInputProps) => {
	return (
		<div className="form-row">
			<label htmlFor={props.name}>{props.labelText}</label>
			<input
				type={props.type}
				placeholder={props.placeholder} // Ajuste no placeholder
				name={props.name} // O 'name' precisa ser passado corretamente
				id={props.name} // Para garantir a relação com o label
				minLength={10}
				required
			/>
		</div>
	);
};

export default GenericInput;
