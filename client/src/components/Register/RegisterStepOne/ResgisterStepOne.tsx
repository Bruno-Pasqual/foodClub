import { Button, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { FormEvent, useEffect, useState } from "react";
import './RegisterStepOne.css'
import imgColaborador from '../../../assets/colaborador.png';
import imgEmpresa from '../../../assets/empresa.png';
import imgRestaurante from '../../../assets/restaurante.png';


interface FormData {
  role: string;
}

export const RegisterStepOne = () => {
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");
  const [, setData] = useState({});
  const [step, setStep] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  function handleRoleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRole(event.target.value);
  }

  useEffect(() => {
    console.log(role);
  }, [role]); // Executa toda vez que `role` muda

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    setError(null); // Limpa a mensagem de erro ao submeter

    const formData = new FormData(event.currentTarget);
    const role = formData.get("row-radio-buttons-group") as string;

    // Verifica se a role foi selecionada
    if (!role) {
        setError("Por favor, selecione um tipo de cadastro.");
        return;
    }

    const newData: FormData = {
        role: formData.get("row-radio-buttons-group") as string,
    };

    setData(newData);
    handleStep();
  }

  function handleStep() {
    if (step === 1) {
        setIsAnimating(true);
        setTimeout(() => {
            setStep((prevStep) => prevStep + 1);
            setIsAnimating(false);
        }, 500);
    } else {
        setIsAnimating(true);
        setTimeout(() => {
            setStep((prevStep) => prevStep - 1);
            setIsAnimating(false);
        }, 500);
    }
}
  return (
    <div className={`step-1-container ${isAnimating ? "hidden" : "visible"}`}>
      <div id="registerFormStepOne">
        <form  id="formChooseRole" onSubmit={handleSubmit} >
            <div className="radio-label">
              <FormLabel id="demo-row-radio-buttons-group-label">
                  <h1>Você quer se cadastrar como</h1>
                  <span>Escolha o tipo desejado</span>
              </FormLabel>
              <RadioGroup
                  id="radio-group"
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handleRoleChange}
              >
                <FormControlLabel
                      className="radio"
                      value="colaborador"
                      control={<Radio 
                        icon={<img src={imgColaborador} alt="Icone representando o colaborador não selecionado" />}
                        checkedIcon={<img src={imgColaborador} alt="Icone representando o colaborador selecionado" style={
                          {
                            filter: "brightness(0.5)",
                            transform: "scale(1.2)",
                          }
                        }/>}
                      />}
                      label="Colaborador"
                  />

                <FormControlLabel
                      className="radio"
                      value="empresa"
                      control={<Radio 
                        icon={<img src={imgEmpresa} alt="Icone representando o colaborador não selecionado" />}
                        checkedIcon={<img src={imgEmpresa} alt="Icone representando o colaborador selecionado" style={
                          {
                            filter: "brightness(0.5)",
                            transform: "scale(1.2)",
                          }
                        }/>}
                      />}
                      label="Empresa"
                  />
                  <FormControlLabel
                      className="radio"
                      value="restaurante"
                      control={<Radio 
                        icon={<img src={imgRestaurante} alt="Icone representando o colaborador não selecionado" />}
                        checkedIcon={<img src={imgRestaurante} alt="Icone representando o colaborador selecionado" style={
                          {
                            filter: "brightness(0.5)",
                            transform: "scale(1.2)",
                          }
                        }/>}
                      />}
                      label="Restaurante"
                  />
                  
              </RadioGroup>
            </div>

            <Button variant="contained" color="primary" type="submit">
              Continuar
            </Button>
        </form>
      </div>
      {error && <p style={{ color: "#D20000" }}>{error}</p>}{" "}
      
  </div>
  )
}