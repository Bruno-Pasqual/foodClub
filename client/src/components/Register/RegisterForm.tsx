import {
    Button,
  } from "@mui/material";
  import  {  useState } from "react";
  import "./RegisterForm.css";
  //import RestaurantRegister from "./RestaurantRegister";
  //import CompanyRegister from "./CompanyRegister";
  import ArrowBack from "@mui/icons-material/ArrowBack";
  //import logo from "../../assets/Logo.svg";
import { RegisterStepOne } from "./RegisterStepOne/ResgisterStepOne";
import { RegisterStepTwo } from "./RegisterStepTwo/RegisterStepTwo";
  
  interface IProps{
    screenSize:number;
  }
  
  /*
    interface FormData {
    email: string;
    password1: string;
    password2: string;
    role: string;
  }
  */
  const RegisterForm = ({ screenSize }:IProps) =>{
    const [step, setStep] = useState<number>(1);
    //const [role, ] = useState<string>("restaurante");
    
    //const [data, ] = useState({});
    const [, setIsAnimating] = useState<boolean>(false);
    
  
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
        <>
            {step === 1 && (
                <div className="container">
                    <RegisterStepOne screenSize={screenSize} />
                </div>
            )}

            {step ===  2 && (
                <div className="container">
                    <Button id="return" onClick={handleStep} startIcon={<ArrowBack />}>
                        Voltar
                    </Button>
                    <RegisterStepTwo screenSize={screenSize} />
                </div>
            )}
            
        </>
    )
  };
  
  export default RegisterForm;
  
  