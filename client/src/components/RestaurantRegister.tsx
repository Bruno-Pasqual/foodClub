import { FormEvent } from "react";
import GenericInput from "./GenericInput";
import { Button } from "@mui/material";

// Definindo a interface para as props do componente
interface RestaurantRegisterProps {
  data: object; // Use o tipo FormData para data
}

const RestaurantRegister = ({data}:RestaurantRegisterProps) =>{
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

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
          placeholder="CNPJ"
          labelText="Digite o CNPJ"
          name="cnpj"
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