import { useState } from "react";
import { IRegisterStepThreeProps } from "../RegisterStepThree";
import { Button, FormLabel } from "@mui/material";
import GenericInput from "../../../GenericInput";
import { ICompanyRestaurant } from "../../RegisterForm";
import { fetchAddressByCep } from "../../../../utils/apiCEP";

export const RegisterRestaurantCompany = ({ formData, onStepChange, onDataChange }: IRegisterStepThreeProps) => {
  const [formState, setFormState] = useState<ICompanyRestaurant>({
    ...formData,
    cnpj: (formData as ICompanyRestaurant).cnpj || "",
    cep: (formData as ICompanyRestaurant).cep || "",
    street: (formData as ICompanyRestaurant).street || "",
    city: (formData as ICompanyRestaurant).city || "",
    state: (formData as ICompanyRestaurant).state || "",
    complement: (formData as ICompanyRestaurant).complement || "",
    number: (formData as ICompanyRestaurant).number || "",
    role: (formData as ICompanyRestaurant).role || "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>){
    const cep = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      cep,
    }));

    if (cep.length === 8) {
      try {
        const address = await fetchAddressByCep(cep);
        if (address) {
          setFormState((prevState) => ({
            ...prevState,
            street: address.logradouro,
            city: address.localidade,
            state: address.uf,
          }));
          onDataChange({
            ...formState,
            street: address.logradouro,
            city: address.localidade,
            state: address.uf,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  return (
    <form>
      <div className="basic-info-container">
        <div className="input-label-group">
          <FormLabel id="demo-row-radio-buttons-group-label">
            <h1>{formState.role.charAt(0).toUpperCase() + formState.role.slice(1)}</h1>
            <span>Informações da {formState.role}</span>
          </FormLabel>

          <GenericInput
            type="text"
            placeholder="Nome"
            labelText="Nome"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
          />

          <GenericInput
            type="text"
            placeholder="CNPJ"
            labelText="Digite o CNPJ"
            name="cnpj"
            value={formState.cnpj}
            onChange={handleInputChange}
          />

          <GenericInput
            type="text"
            placeholder="Digite o CEP"
            labelText="CEP"
            name="cep"
            value={formState.cep}
            onChange={handleCepChange}
          />

          <GenericInput
            type="text"
            placeholder="Rua"
            labelText="Rua"
            name="street"
            value={formState.street}
            onChange={handleInputChange}
          />

          <div className="input-group">
            <GenericInput
              type="text"
              placeholder="Cidade"
              labelText="Cidade"
              name="city"
              value={formState.city}
              onChange={handleInputChange}
            />

            <GenericInput
              type="text"
              placeholder="Estado"
              labelText="Estado"
              name="state"
              value={formState.state}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <GenericInput
              type="text"
              placeholder="Complemento"
              labelText="Complemento"
              name="complement"
              value={formState.complement}
              onChange={handleInputChange}
            />

            <GenericInput
              type="text"
              placeholder="Número"
              labelText="Número"
              name="number"
              value={formState.number}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Button variant="contained" color="primary" type="submit">
          Continuar
        </Button>
      </div>
    </form>
  );
};
