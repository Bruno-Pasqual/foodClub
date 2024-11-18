import { Button, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { FormEvent, useEffect, useState } from "react";
import imagemFundo from '../assets/imagem-fundo.jpg'

interface IProps{
  screenSize:number;
}

interface FormData {
  role: string;
}

export const RegisterStepOne = ({screenSize}:IProps) => {
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>("restaurante");
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
      <form onSubmit={handleSubmit} >
          <FormLabel id="demo-row-radio-buttons-group-label">
              Você quer se cadastrar como
          </FormLabel>
          <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleRoleChange}
          >
              <FormControlLabel
                  value="restaurante"
                  control={<Radio />}
                  label="Restaurante"
              />
              <FormControlLabel
                  value="empresa"
                  control={<Radio />}
                  label="Empresa"
              />
          </RadioGroup>

          <Button variant="contained" color="primary" type="submit">
            Continuar
          </Button>
      </form>
      {error && <p style={{ color: "#D20000" }}>{error}</p>}{" "}
      
      { screenSize > 800 && (
				<div className="imagem-fundo">
					<img src={imagemFundo} alt="logo da empresa" />
				</div>
			) }
  </div>
  )
}