import styled, {css} from "styled-components"

interface ButtonTypes {
    type: "primaryLarge" | "primary" | "secondary" | "textWhite" | "textBlack" | "icon"
} 

interface ComponentProps {
    children?: React.ReactNode; 
    type?: ButtonTypes["type"];
    iconLeft?: string;
    iconRight?: string;
    onClick?: () => void;

}

const StyledButton = styled.button<ButtonTypes>`
    border-radius: 10px;
    padding: 8px 16px;
    display: flex;
    justify-content: baseline;
    column-gap: 8px;
    width: auto;


    ${props => props.type === 'primaryLarge' && css`
    padding: 16px 32px;
    color: ${props=> props.theme.colors.neutral[50]};
    background-color: ${props=> props.theme.colors.primary[500]};

    &:hover{
    background-color: ${props=> props.theme.colors.primary[300]};
    }

    &:active{
    background-color: ${props=> props.theme.colors.primary[700]};
    }
 
    `}


    ${props => props.type === 'primary' && css`
    color: ${props=> props.theme.colors.neutral[50]};
    background-color: ${props=> props.theme.colors.primary[500]};

    &:hover{
    background-color: ${props=> props.theme.colors.primary[300]};
    }

    &:active{
    background-color: ${props=> props.theme.colors.primary[700]};
    }
    `}


    ${props => props.type === 'secondary' && css`
    color: ${props=> props.theme.colors.neutral[50]};
    background-color: ${props=> props.theme.colors.neutral[900]};

    &:hover{
    background-color: ${props=> props.theme.colors.neutral[800]};
    }

    &:active{
    background-color: ${props=> props.theme.colors.neutral[700]};
    }
    `}


    ${props => props.type === 'textBlack' && css`
    color: ${props=> props.theme.colors.neutral[900]};

    &:hover{
    background-color: ${props=> props.theme.colors.neutral[50]};
    }

    &:active{
    background-color: ${props=> props.theme.colors.neutral[100]};
    }
    `}


    ${props => props.type === 'textWhite' && css`
    color: ${props=> props.theme.colors.neutral[50]};

    &:hover{
    background-color: ${props=> props.theme.colors.neutral[800]};
    }

    &:active{
    background-color: ${props=> props.theme.colors.neutral[700]};
    }
    `}


    ${props => props.type === 'icon' && css`
    border-radius: 150%;
    color: ${props=> props.theme.colors.neutral[50]};
    background-color: ${props=> props.theme.colors.neutral[900]};

    &:hover{
    background-color: ${props=> props.theme.colors.neutral[800]};
    }

    &:active{
    background-color: ${props=> props.theme.colors.neutral[700]};
    }
    `}


`


const Button = ({children, type, iconLeft, iconRight, onClick}: ComponentProps) => {

    
  return (
    <StyledButton type={type} onClick={onClick}>
        {iconLeft && <img src={iconLeft} alt=''/>}    
        {children}
        {iconRight && <img src={iconRight} alt=''/>}
    </StyledButton>
  )
}

export default Button