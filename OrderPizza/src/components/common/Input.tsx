import styled from "styled-components"
import iconEye from "./../../assets/eye.svg"
import { useState } from "react"

interface ComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string,
    touched?: boolean,
    error?: string,

}

const Container = styled.div`
    display:flex;
    flex-direction: column;
    row-gap: 4px;
    width: 100%;
`

const Label = styled.label`
    font-size: 14px;
    color: ${props=> props.theme.colors.neutral[700]};
    margin: 0;
    width: 100%;
`

const InputContainer = styled.div`
    border-bottom: 1px solid ${props=> props.theme.colors.neutral[700]};
    display: flex;
    padding: 8px;
    width: 100%;

    input{
        background: none;
        border: none;
        padding: 0;
        width: 100%;

        &:focus {
        outline: none; 
    }

    }

    button{
        background: none;
        padding: 0;
    }

    &:hover{
        background-color: ${props=> props.theme.colors.neutral[50]};

    }

    &:focus{
        background-color: ${props=> props.theme.colors.neutral[50]};

    }
    
`

const Alert = styled.p`
    font-size: ${props=> props.theme.typography.fontSize["xs"]};
`



const Input = ({label, touched, error, ...props}: ComponentProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

  return (
    <Container>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <InputContainer>
            <input {...props}/>
            
            {props.type === "password" && <button onClick={togglePasswordVisibility}><img src={iconEye} alt=''/></button>}     
        </InputContainer>
        {touched && error && <Alert>{error}</Alert>} 
        
    </Container>


    
  )
}

export default Input
