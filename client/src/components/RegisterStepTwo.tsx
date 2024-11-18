import { Button } from "@mui/material"
import EmailInput from "./EmailInput"
import GenericInput from "./GenericInput"
import { FormEvent, useState } from "react";
import imagemFundo from '../assets/imagem-fundo.jpg'

interface IProps{
    screenSize:number;
}

interface FormData {
    email: string;
    password1: string;
    password2: string;
}

export const RegisterStepTwo = ({screenSize}:IProps) => {
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [, setError] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [, setData] = useState({});
    const [step, setStep] = useState<number>(1);

    
  
    function handlePasswordChange(
        setPassword: React.Dispatch<React.SetStateAction<string>>
    ) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value.replace(/\s/g, ""); // Remove espaços
            setPassword(value);
        };
    }
  
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
  
        const password1 = formData.get("password1") as string;
        const password2 = formData.get("password2") as string;
  
        if (password1 !== password2) {
            setError("As senhas não conferem.");
            return;
        }
  
        const newData: FormData = {
            email: formData.get("email") as string,
            password1: formData.get("password1") as string,
            password2: formData.get("password2") as string,
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
            
            <form onSubmit={handleSubmit}>
                <div className="basic-info-container">
                    <h1>Vamos criar sua conta</h1>
                    <EmailInput
                        name="email"
                        placeholder="Ex: sara@gmail.com"
                        labelText="Email"
                        required
                    />
                    <GenericInput
                        minLength={6}
                        type="password"
                        placeholder="Digite a sua senha"
                        labelText="Digite a sua senha"
                        name="password1"
                        value={password1}
                        onChange={handlePasswordChange(setPassword1)}
                    />
                    <GenericInput
                        minLength={6}
                        type="password"
                        placeholder="Digite a sua senha novamente"
                        labelText="Confirme a sua senha"
                        name="password2"
                        value={password2}
                        onChange={handlePasswordChange(setPassword2)}
                    />

                    <Button variant="contained" color="primary" type="submit">
                        Continuar
                    </Button>
                </div>
                <Button href="/login" id="btn-login" variant="contained" color="inherit">
                    Retornar para o login
                </Button>
            </form>

            { screenSize > 800 && (
				<div className="imagem-fundo">
					<img src={imagemFundo} alt="logo da empresa" />
				</div>
			) }
        </div>
    )
}