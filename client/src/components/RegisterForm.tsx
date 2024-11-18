import {
    Button,
  } from "@mui/material";
  import  {  useState } from "react";
  import "./RegisterForm.css";
  import RestaurantRegister from "./RestaurantRegister";
  import CompanyRegister from "./CompanyRegister";
  import ArrowBack from "@mui/icons-material/ArrowBack";
  import logo from "../assets/Logo.svg";
import { RegisterStepOne } from "./ResgisterStepOne";
  
  interface IProps{
    screenSize:number;
  }
  
  interface FormData {
    email: string;
    password1: string;
    password2: string;
    role: string;
  }
  const RegisterForm = ({ screenSize }:IProps) =>{
    const [step, setStep] = useState<number>(1);
    const [role, setRole] = useState<string>("restaurante");
    
    const [data, setData] = useState({});
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    
  
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
                <RegisterStepOne screenSize={screenSize} />
            )}
  
            {step >= 2 && (
                <>
                    <div className="container">
                        <Button id="return" onClick={handleStep} startIcon={<ArrowBack />}>
                            Voltar
                        </Button>
                        <div className={`step-2-container ${isAnimating ? "hidden" : "visible"}`}>
                            {role === "restaurante" ? (
                                <>
                                    <div className="logo">
                                        <img src={logo} alt="logo da empresa" />
                                    </div>
                                    <RestaurantRegister data={data} />
                                </>
                            ) : (
                                <>
                                    <div className="logo">
                                        <img src={logo} alt="logo da empresa" />
                                    </div>
                                    <CompanyRegister data={data} />
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    )
  };
  
  export default RegisterForm;
  
  