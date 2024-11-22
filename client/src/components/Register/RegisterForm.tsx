import { useState } from "react";
import "./RegisterForm.css";
import { RegisterStepOne } from "./RegisterStepOne/ResgisterStepOne";
import { RegisterStepTwo } from "./RegisterStepTwo/RegisterStepTwo";
import imagemFundo from "../../assets/eating a variety of foods-bro.svg";
import { RegisterStepThree } from "./RegisterStepThree/RegisterStepThree";
import { RegisterStepFive} from "./RegisterStepFive/RegisterStepFive";

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
  const [step, setStep ] = useState<number>(1);
  const [ formData, setFormData] = useState<ICompanyRestaurant | IEmployee>({
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

  
  function handleStepChange(delta: number) {
    setStep((prevStep) => prevStep + delta);
  }

  const handleDataChange = (updatedData: ICompanyRestaurant | IEmployee) => {
    setFormData(updatedData);
  };
  

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <RegisterStepOne formData={formData} onStepChange={handleStepChange} onDataChange={handleDataChange} />
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
            <RegisterStepTwo formData={formData} onStepChange={handleStepChange} onDataChange={handleDataChange} />
            {screenSize > 800 && (
              <div className="imagem-fundo">
                <img src={imagemFundo} alt="Imagem ilustrativa" />
              </div>
            )}
          </>
        );

      case 3:
        return (
          <>
            <RegisterStepThree formData={formData} onStepChange={handleStepChange} onDataChange={handleDataChange} />
            {screenSize > 800 && (
              <div className="imagem-fundo">  
                <img src={imagemFundo} alt="Imagem ilustrativa" />  
              </div>
            )}
          </>
        )
      case 4:
        return (
          <>
            <RegisterStepFive />
            {screenSize > 800 && (
              <div className="imagem-fundo">
                <img src={imagemFundo} alt="Imagem ilustrativa" />
              </div>
            )}
          </>
        )
      default:
        return null;
    }
  };

  return <div className="container">{renderStepContent()}</div>;
};

export default RegisterForm;
