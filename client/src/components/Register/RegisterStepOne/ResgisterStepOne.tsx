import { Button, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import "./RegisterStepOne.css";
import imgColaborador from "../../../assets/colaborador.png";
import imgEmpresa from "../../../assets/empresa.png";
import imgRestaurante from "../../../assets/restaurante.png";

interface FormData {
  role: string;
}

export const RegisterStepOne = () => {
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [, setData] = useState({});
  const [step, setStep] = useState<number>(1);
  const [, setIsAnimating] = useState<boolean>(false);

  function handleRoleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRole(event.target.value);
  };

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

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    setError(null); // Limpa a mensagem de erro ao submeter

    const formData = new FormData(event.currentTarget);
    const role = formData.get("row-radio-buttons-group") as string; // Certifique-se de que o 'name' no RadioGroup é 'row-radio-buttons-group'

    // Verifica se a role foi selecionada
    if (!role) {
      setError("Por favor, selecione um tipo de cadastro.");
      return;
    }

    const newData: FormData = {
      role, // Corrigido para usar o valor correto
    };

    console.log(`newData: ${newData.role}`);
    setData(newData);
    handleStep();
  }


  useEffect(() => {
    console.log(role)
  }, [role])

  return (
    <div className="step-1-container">
      <div id="registerFormStepOne">
        
        <form id="formChooseRole" onSubmit={handleSubmit} >
          <div className="form-group">
            <div className="form-header">
              <FormLabel id="demo-row-radio-buttons-group-label">
                <h1>Você quer se cadastrar como</h1>
                <span>Escolha o tipo desejado</span>
              </FormLabel>
            </div>

            <RadioGroup
              id="radio-group"
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleRoleChange}
              value={role}
            >
              {[
                { value: "colaborador", label: "Colaborador", img: imgColaborador },
                { value: "empresa", label: "Empresa", img: imgEmpresa },
                { value: "restaurante", label: "Restaurante", img: imgRestaurante },
              ].map(({ value, label, img }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={
                    <Radio
                      className="radio"
                      icon={<img src={img} alt={`Ícone para ${label} não selecionado`} />}
                      checkedIcon={
                        <img
                          src={img}
                          alt={`Ícone para ${label} selecionado`}
                          style={{
                            filter: "brightness(1)",
                            transform: "scale(1.3)",
                            backgroundColor: "#f5d0d0b3",
                            padding: "5px",
                            borderRadius: "8px",
                            transition: "0.3s ease"
                          }}
                        />
                      }
                    />
                  }
                  label={value === role ? ` ${label}` : label} // Alteração dinâmica da label
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "1.2rem",
                      fontWeight: value === role ? "bold" : "normal",
                      color: value === role ? "#7D0000" : "#000",
                      transition: "0.3s ease",
                    },

                  }}
                />
              ))}
            </RadioGroup>
          </div>

          <div className="buttonGroup">
            {error && <span style={{ color: "red" }}>{error}</span>}
            <Button variant="contained" color="primary" type="submit">
              Prosseguir
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
