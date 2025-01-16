import styled from "styled-components";
import iconEye from "./../../assets/eye.svg";
import { useState } from "react";
import iconEyeOff from "./../../assets/eye-off.svg";
import successIcon from "./../../assets/success.svg"
import errorIcon from "./../../assets/error.svg"

interface ComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  touched?: boolean;
  error?: string;
  password?: boolean;
  successMessage?: null | string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${(props) => props.theme.colors.neutral[700]};
  margin: 0;
  width: 100%;
`;

const InputContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral[700]};
  display: flex;
  padding: 8px;
  width: 100%;

  input {
    background: none;
    border: none;
    padding: 0;
    width: 100%;

    font-size: ${props=> props.theme.typography.fontSize["sm"]};
    font-family: ${props=> props.theme.typography.fontFamily["base"]};
    font-weight: ${props=> props.theme.typography.fontWeight["regular"]}; 

    &:focus {
      outline: none;
    }
  }

  button {
    background: none;
    padding: 0;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.neutral[50]};
  }
`;

const Error = styled.div`
display: flex;
column-gap: 8px;
align-items: center;
  p{
    font-size: ${(props) => props.theme.typography.fontSize["xs"]};
  color: ${(props) => props.theme.colors.error};
  }
  
`;

const Success = styled.div`
display: flex;
column-gap: 8px;
align-items: center;
  p{
    font-size: ${(props) => props.theme.typography.fontSize["xs"]};
  color: ${(props) => props.theme.colors.success};
  }
  
`;

const Input = ({ label, touched, error, id, password, successMessage, ...props }: ComponentProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputContainer>
        <input
          id={id}
          type={password && !showPassword ? "password" : "text"}
          {...props}
        />
        {password && (
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <img src={iconEyeOff} alt="Toggle visibility" /> : <img src={iconEye} alt="Toggle visibility" />}
          </button>
        )}
      </InputContainer>
      {touched && error && <Error><img src={errorIcon} alt=''/><p>{error}</p></Error>}
      {successMessage && <Success><img src={successIcon} alt=''/><p>{successMessage}</p></Success>}
    </Container>
  );
};

export default Input;
