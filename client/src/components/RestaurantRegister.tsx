import { FormEvent, useState } from "react";
import GenericInput from "./GenericInput";
import { Button } from "@mui/material";
import { formatCNPJ } from "../utils/isValidCNPJ";

// Definindo a interface para as props do componente
interface RestaurantRegisterProps {
  data: object; // Use o tipo FormData para data
}

const RestaurantRegister = ({data}:RestaurantRegisterProps) =>{
  const [error, setError] = useState<string | null>(null);
  const [formattedCNPJ, setFormattedCNPJ] = useState<string>("");


  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
    setError(null)

		const formData = new FormData(event.currentTarget);
    //const cnpj = formData.get("cnpj") as string;

    // Valida o CNPJ
    {/* if (!isValidCNPJ(cnpj)) {
      setError("CNPJ inválido.");
      return;
    } */}

		const restaurantData = {
      ...data,
			name: formData.get("name"),
			cnpj: formData.get("cnpj"),
			cep: formData.get("cep"),
			number: formData.get("number"),
		};
		console.log('Restaurant -> Button Clicked')
		console.log(restaurantData);
	}

   // Função para lidar com a mudança no campo do CNPJ
  function handleCNPJChange(event: React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setFormattedCNPJ(formatCNPJ(value));
  };

  return (
    <div>
    
      <form onSubmit={handleSubmit} >
        <h1>Restaurante</h1>
        <GenericInput
          type="text"
          placeholder="Nome do seu restaurante"
          labelText="Nome do seu restaurante"
          name="name"
        />
        <GenericInput
          type="text"
          placeholder="Ex: 12.345.678/0001-95"
          labelText="Digite o CNPJ"
          name="cnpj"
          value={formattedCNPJ}
          onChange={handleCNPJChange}
          error={!!error} // Passa o estado de erro
          maxLength={18}
        />
        <GenericInput
          type="text"
          placeholder="Digite o CEP"
          labelText="CEP"
          name="cep"
        />
        <GenericInput
          type="number"
          placeholder="Número"
          labelText="Número"
          name="number"
        />

        <Button variant="contained" color="primary"type="submit" >
                  Cadastrar
        </Button>
      </form>
  </div>
  )
}

export default  RestaurantRegister;