import { TextField } from "@mui/material";

interface GenericInputProps {
	name: string;
	placeholder: string;
	type: string;
	labelText: string;
	minlength?: number;
}

const GenericInput = (props: GenericInputProps) => {
	return (
		<TextField
			name={props.name}
			id={props.name}
			label={props.labelText}
			required
			type={props.type}
			variant="outlined"
			sx={{
				"& .MuiInputBase-input": { color: "gray" }, // Cor do texto
				"& .MuiFormLabel-root": { color: "gray" }, // Cor do label normal
				"& .MuiFormLabel-root.Mui-focused": { color: "black" }, // Cor do label em foco
				"& .MuiOutlinedInput-root": {
					"& fieldset": {
						borderColor: "black", // Cor da borda no estado normal
					},
					"&:hover fieldset": {
						borderColor: "black", // Cor da borda no hover
					},
					"&.Mui-focused fieldset": {
						borderColor: "black", // Cor da borda no estado focado
					},
				},
			}}
		/>
	);
};

export default GenericInput;
