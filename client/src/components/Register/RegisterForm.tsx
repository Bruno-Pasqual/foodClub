import { useState } from "react";
import { Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import "./RegisterForm.css";
import { RegisterStepOne } from "./RegisterStepOne/ResgisterStepOne";
import { RegisterStepTwo } from "./RegisterStepTwo/RegisterStepTwo";
import imagemFundo from "../../assets/eating a variety of foods-bro.svg";

interface IProps {
  screenSize: number;
}

export interface IEmployee{
  role: string;
  email: string;
  password1: string;
  password2: string;
  name: string;
  birthday:string;
  company:string;
}
export interface ICompanyRestaurant {
  role: string;
  email: string;
  password1: string;
  password2: string;
  name: string;
  cnpj: string;
  cep: string;
  street: string;
  city: string;
  state: string;
  complement: string;
  number: string;
}

const RegisterForm = ({ screenSize }: IProps) => {
  const [step, ] = useState<number>(1);
  const [ formData, ] = useState<ICompanyRestaurant | IEmployee>({
    role: "",
    email: "",
    password1: "",
    password2: "",
    name: "",
    cnpj: "",
    cep: "",
    street: "",
    city: "",
    state: "",
    complement: "",
    number: "",
    birthday: "",
    company: "",
  }) 

  /* 
    function handleStepChangePlus(){
    setStep((prevStep) => (prevStep + 1 ));
    };

    function handleStepChangeMinus(){
      setStep((prevStep) => (prevStep - 1 ));
    };
  */

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <RegisterStepOne formData={formData} />
            {screenSize > 800 && (
              <div className="imagem-fundo">
                <img src={imagemFundo} alt="Imagem ilustrativa" />
              </div>
            )}
          </>
        );
      case 2:
        return (
          <>
            <Button id="return" startIcon={<ArrowBack />}>
              Voltar
            </Button>
            <RegisterStepTwo />
            {screenSize > 800 && (
              <div className="imagem-fundo">
                <img src={imagemFundo} alt="Imagem ilustrativa" />
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return <div className="container">{renderStepContent()}</div>;
};

export default RegisterForm;
