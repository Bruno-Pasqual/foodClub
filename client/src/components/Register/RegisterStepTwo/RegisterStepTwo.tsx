import { Button } from "@mui/material"
import EmailInput from "../../EmailInput"
import GenericInput from "../../GenericInput"
import { useState } from "react";
//import { ICompanyRestaurant } from "../RegisterForm";
//import { IEmployee } from "../RegisterForm";

/*

    interface IRegisterStepOneProps {
    formData: ICompanyRestaurant | IEmployee;
    onStepChange: (step: number) => void; // Função recebida do componente pai
}
*/

export const RegisterStepTwo = () => {
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    //const [, setError] = useState<string | null>(null);
    const [isAnimating, ] = useState<boolean>(false);
    //const [data, setData] = useState<ICompanyRestaurant | IEmployee>(formData);
    //const [step, setStep] = useState<number>(1);

    
  
    function handlePasswordChange(
        setPassword: React.Dispatch<React.SetStateAction<string>>
    ) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value.replace(/\s/g, ""); // Remove espaços
            setPassword(value);
        };
    }
  
    return (
        <div className={`step-1-container ${isAnimating ? "hidden" : "visible"}`}>
            
            <form>
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

            
        </div>
    )
}