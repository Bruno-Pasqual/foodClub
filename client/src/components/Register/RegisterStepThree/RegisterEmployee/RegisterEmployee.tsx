import { useEffect, useState } from "react";
import { IEmployee } from "../../RegisterForm";
import { IRegisterStepThreeProps } from "../RegisterStepThree"
import { Button, FormLabel } from "@mui/material";
import GenericInput from "../../../GenericInput";
import './RegisterEmployee.css'
import GenericSelect from "../../../GenericSelect";

export const RegisterEmployee = ({ formData, onStepChange, onDataChange }: IRegisterStepThreeProps) => {
  const [formState, setFormState] = useState<IEmployee>({
    ...formData,
    birthday: (formData as IEmployee).birthday || "",
    company: (formData as IEmployee).company || "",
  });

  const [companies, setCompanies] = useState<string[]>([]);  // Estado para armazenar as empresas
  const [loading, setLoading] = useState<boolean>(true);      // Estado para controle de loading
  const [error, setError] = useState<string | null>(null);     // Estado para controlar erros

  // Função para carregar as empresas via requisição
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/auth/"); // Supondo que a API retorne um array de empresas
        const data = await response.json();
        setCompanies(data);  // Armazena as empresas no estado
      } catch {
        setError("Erro ao carregar as empresas");  // Define erro caso a requisição falhe
      } finally {
        setLoading(false);  // Remove o loading após a requisição
      }
    };

    fetchCompanies();
  }, []);

  // Função para atualizar o estado quando o valor dos inputs mudar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Caso necessário, você pode também chamar onDataChange aqui
    onDataChange({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <form>
        <div className="basic-info-container">
          <div className="input-label-group">
            <FormLabel id="demo-row-radio-buttons-group-label">
              <h1>{formState.role.charAt(0).toUpperCase() + formState.role.slice(1)}</h1>
              <span>Informações pessoais</span>
            </FormLabel>

            <div className="input-group-employee">
              <GenericInput
                type="text"
                placeholder="Nome"
                labelText="Nome"
                name="name"
                value={formState.name}
                onChange={handleChange}  // Adicionando o onChange
              />

              <GenericInput
                type="date"
                placeholder="Data de nascimento"
                labelText="Data de nascimento"
                name="birthday"  // Ajustando o nome para ser 'birthday' ao invés de 'date'
                value={formState.birthday}
                onChange={handleChange}  // Adicionando o onChange
              />
            </div>

            <div>
              <FormLabel>
                <span>Qual empresa você trabalha?</span>
              </FormLabel>
              
              <GenericSelect
                name="company"
                labelText="Empresa"
                value={formState.company}
                onChange={handleChange}
                options={companies}
                error={!!error}
                helperText={error || (loading ? "Carregando empresas..." : "")}
                disabled={loading}
              />
            </div>


          </div>

          <Button variant="contained" color="primary" type="submit">
            Continuar
          </Button>
        </div>
      </form>
    </>
  );
};
