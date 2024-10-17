import styled from "styled-components"
import iconEye from "./../../assets/eye.svg"
import { useState } from "react"

const Container = styled.div`
    display:flex;
    flex-direction: column;
    row-gap: 4px;
`

const Label = styled.label`
    font-size: 14px;
    color: ${props=> props.theme.colors.neutral[700]};
    margin: 0;
    width: 250px;
`

const InputContainer = styled.div`
    border-bottom: 1px solid ${props=> props.theme.colors.neutral[700]};
    display: flex;
    padding: 8px;
    width: 250px;

    input{
        background: none;
        border: none;
        padding: 0;
        
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



const Input = ({label, touched, error, ...props}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

  return (
    <Container>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <InputContainer>
            <input {...props}/>
            {touched && error && <div>{error}</div>} 
            {props.type==="password" && <button onClick={togglePasswordVisibility}><img src={iconEye} alt=''/></button>}     
        </InputContainer>
        
    </Container>


    
  )
}

export default Input
