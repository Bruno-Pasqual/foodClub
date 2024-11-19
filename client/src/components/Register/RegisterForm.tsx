import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import "./RegisterForm.css";

import { RegisterStepOne } from "./RegisterStepOne/ResgisterStepOne";
import { RegisterStepTwo } from "./RegisterStepTwo/RegisterStepTwo";
import imagemFundo from "../../assets/eating a variety of foods-bro.svg";

interface IProps {
  screenSize: number;
}

/*
interface FormData {
  email: string;
  password1: string;
  password2: string;
  role: string;
}
*/

const RegisterForm = ({ screenSize }: IProps) => {
  const [step, setStep] = useState<number>(1);
  const [, setIsAnimating] = useState<boolean>(false);

  const isLargeScreen = screenSize > 800;

  const handleStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prevStep) => (prevStep === 1 ? prevStep + 1 : prevStep - 1));
      setIsAnimating(false);
    }, 500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <RegisterStepOne />
            {isLargeScreen && (
              <div className="imagem-fundo">
                <img src={imagemFundo} alt="Imagem ilustrativa" />
              </div>
            )}
          </>
        );
      case 2:
        return (
          <>
            <Button id="return" onClick={handleStep} startIcon={<ArrowBack />}>
              Voltar
            </Button>
            <RegisterStepTwo screenSize={screenSize} />
            {isLargeScreen && (
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
